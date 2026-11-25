const cache = new Map<string, { value: number; expiresAt: number }>()

export function cachedPrice(key: string, compute: () => number, ttlMs = 60_000): number {
  const hit = cache.get(key)
  if (hit && hit.expiresAt > Date.now()) return hit.value
  const value = compute()
  cache.set(key, { value, expiresAt: Date.now() + ttlMs })
  return value
}

export function clearPriceCache(): void {
  cache.clear()
}
