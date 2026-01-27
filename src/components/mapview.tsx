import { useEffect, useMemo, useRef, useState } from "react";
import { initWindy } from "../services/windy";
import type { Point } from "../types/points";
import "./mapview.css";

const DEFAULT_CENTER: [number, number] = [44.8378, -0.5792];
const DEFAULT_ZOOM = 11;

export default function MapView() {
  //const [points, setPoints] = useState<Point[]>([]); (pas de connexion avec la db pour le moment)
  const [tempPoints, setTempPoints] = useState<Point[]>([]); // Vit uniquement dans la mémoire vive de l'UI
  const [loading, setLoading] = useState(true); // constant de gestion des flux. (tant que l'api n'est pas chargé alors rien ne s'affiche)
  const [error, setError] = useState<string | null>(null); // const qui prévient des erreurs de chargement (renvoie une string si c'est pas ok et null si c'est ok)
  //const [pointsError, setPointsError] = useState<string | null>(null); //inutile car on appelle pas encore de point dans la MVP. 
  const [windyReady, setWindyReady] = useState(false);//vérifie si l'API de windy est prète.
  const mapRef = useRef<{ // controle de la map. 
    setView: (center: [number, number], zoom?: number) => void; // déplace la caméra sur la map.
    on?: (event: string, handler: (event: unknown) => void) => void; // géstion du zoom sur la map.
    off?: (event: string, handler: (event: unknown) => void) => void;
  } | null>(null);
  const markerLayerRef = useRef<{ 
    clearLayers: () => void;
    addLayer?: (layer: unknown) => void;
  } | null>(null);

  /*useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

   fetchPoints() // Pas besoin dans la mvp (aucune connexion avec la db pour le moment)
      .then((data) => {
        if (!active) return;
        setPoints(data);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setPointsError(err instanceof Error ? err.message : "Unknown error");
        setPoints([]);
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []); 
  */

  const allPoints = useMemo(() => [...tempPoints], [tempPoints]); // centre la map sur les points éxistants. si point = 0 alors le centre = DEFAULT_CENTER

  const center = useMemo<[number, number]>(() => {
    if (allPoints.length === 0) return DEFAULT_CENTER;
    const avgLat =
      allPoints.reduce((sum, point) => sum + point.lat, 0) / allPoints.length; // sum = 0 (addition sum + point.lat = lat)
    const avgLng =
      allPoints.reduce((sum, point) => sum + point.lng, 0) / allPoints.length; // sum = 0 (addition sum + point.lng = lng)
    return [avgLat, avgLng];
  }, [allPoints]);

  useEffect(() => { // Ce bloque fait l'appel à l'API de windy qui se charge elle même de gérer la carte de leafelt. 
    let active = true;
    const apiKey =
      (import.meta as { env?: { VITE_WINDY_API_KEY?: string } }).env
        ?.VITE_WINDY_API_KEY ?? "";

    if (!apiKey) {
      setError("Clé API Windy manquante (VITE_WINDY_API_KEY).");
      setWindyReady(false);
      setLoading(false);
      return;
    }

    initWindy({
      key: apiKey,
      lat: DEFAULT_CENTER[0],
      lon: DEFAULT_CENTER[1],
      zoom: DEFAULT_ZOOM,
    })
      .then((api) => {
        if (!active) return;
        mapRef.current = api.map;
        const L = window.L;
        if (!L) {
          setError("Leaflet indisponible dans Windy.");
          setLoading(false);
          return;
        }
        markerLayerRef.current = L.layerGroup().addTo(api.map);
        setWindyReady(true);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Erreur Windy inconnue");
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!windyReady || !mapRef.current) return;
    mapRef.current.setView(center, DEFAULT_ZOOM);
  }, [center, windyReady]);

  useEffect(() => {
    if (!windyReady || !markerLayerRef.current) return;
    const L = window.L;
    if (!L) return;

    markerLayerRef.current?.clearLayers();
    allPoints.forEach((point) => {
      const marker = L.marker([point.lat, point.lng]);

      if (markerLayerRef.current) {
        const added = marker.addTo(markerLayerRef.current);

        if (point.name || point.description) {
          const content = `
            <div>
              <strong>${point.name ?? "Point"}</strong>
              ${point.description ? `<div>${point.description}</div>` : ""}
            </div>
          `;

          added.bindPopup?.(content);
        }
      }
    });
  }, [allPoints, windyReady]);

  useEffect(() => {
    if (!windyReady || !mapRef.current?.on) return; // Création d'un point temporaire. 
    const map = mapRef.current;
    const handler = (event: unknown) => {
      if (!event || typeof event !== "object") return; // si il ni a pas d'objet, fais rien. 
      const latlng = (event as { latlng?: { lat: number; lng: number } }).latlng;
      if (!latlng) return; // si il ni a pas de donnée latlng, alors rien. 
      const newPoint: Point = { // Sinon, on crée un point avec les données suivantes. 
        id: `temp-${Date.now()}`,
        lat: latlng.lat,
        lng: latlng.lng,
        name: "Point temporaire",
      };
      setTempPoints((prev) => [...prev, newPoint]);
    };

    map.on?.("click", handler); // Gestion du click sur la page. (clique = création d'un point)
    return () => { // un click =. une ouverture. 
      map.off?.("click", handler);
    };
  }, [windyReady]);

  return (
    <div className="map-wrapper">
      <div id="windy" className="map-view" />
      {(loading || !windyReady) && (
        <div className="map-status map-status--overlay">
          Chargement de la carte...
        </div>
      )}
      {error && (
        <div className="map-status map-status--error map-status--overlay">
          Impossible de charger la carte: {error}
        </div>
      )}
      <div className="map-hint">
        Clique sur la carte pour ajouter un point temporaire.
      </div>
    </div>
  );
}
