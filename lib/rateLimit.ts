const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;

const store = new Map<string, number[]>();

export function rateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const timestamps = (store.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  store.set(ip, timestamps);

  const allowed = timestamps.length <= MAX_REQUESTS;
  return { allowed, remaining: Math.max(0, MAX_REQUESTS - timestamps.length) };
}
