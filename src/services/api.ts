import type { Point } from "../types/point";

const API_BASE =
  (import.meta as { env?: { VITE_API_BASE_URL?: string } }).env
    ?.VITE_API_BASE_URL ?? "http://localhost:3000";

export async function fetchPoints(): Promise<Point[]> {
  const response = await fetch(`${API_BASE}/points`);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return (await response.json()) as Point[];
}
