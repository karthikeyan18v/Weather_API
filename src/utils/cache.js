const cache = new Map();

export function getCache(key) {
  const item = cache.get(key);
  if (!item) return null;
  if (item.expiry < Date.now()) {
    cache.delete(key);
    return null;
  }
  return item.data;
}

export function setCache(key, data, ttlSeconds) {
  cache.set(key, { data, expiry: Date.now() + ttlSeconds * 1000 });
}

export function cacheInfo() {
  return { size: cache.size };
}
