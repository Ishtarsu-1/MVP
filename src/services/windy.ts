type WindyInitOptions = { // Data nécéssaire pour se connecter à l'api de windy au bon endroit sur la map. 
  key: string;
  lat: number;
  lon: number;
  zoom: number;
  verbose?: boolean;
};

type WindyAPI = { // objet renvoyé par windy après la connexion (vu satélité au dessus de sa position)
  map: {
    setView: (center: [number, number], zoom?: number) => void;
    on?: (event: string, handler: (event: unknown) => void) => void;
    off?: (event: string, handler: (event: unknown) => void) => void;
  };
};

declare global {
  interface Window {
    windyInit?: (options: WindyInitOptions, cb: (api: WindyAPI) => void) => void;
    L?: {
      marker: (position: [number, number]) => {
        addTo: (layer: {
          addLayer?: (layer: unknown) => void;
        }) => {
          bindPopup?: (content: string) => void;
        };
      };
      layerGroup: () => {
        addTo: (map: WindyAPI["map"]) => {
          clearLayers: () => void;
          addLayer?: (layer: unknown) => void;
        };
        clearLayers: () => void;
        addLayer?: (layer: unknown) => void;
      };
    };
  }
}

const LEAFLET_URL = "https://unpkg.com/leaflet@1.4.0/dist/leaflet.js";
const WINDY_BOOT_URL = "https://api.windy.com/assets/map-forecast/libBoot.js";

let scriptPromise: Promise<void> | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Impossible de charger ${src}`));
    document.head.appendChild(script);
  });
}

export function loadWindyScript(): Promise<void> { // Protection contre le double chargement. 
  if (scriptPromise) return scriptPromise; // mémorise le premier chargement. 
  if (window.windyInit && window.L) {
    scriptPromise = Promise.resolve();// si le chargement est déjà effectue alors tu renvoie la même promesse. 
    return scriptPromise;
  }

  scriptPromise = loadScript(LEAFLET_URL)
    .then(() => loadScript(WINDY_BOOT_URL))
    .then(() => undefined);

  return scriptPromise;
}

export async function initWindy(options: WindyInitOptions): Promise<WindyAPI> {
  await loadWindyScript();

  return new Promise((resolve, reject) => {
    if (!window.windyInit) {
      reject(new Error("Windy init indisponible"));
      return;
    }

    window.windyInit(options, (api) => {
      resolve(api);
    });
  });
}
