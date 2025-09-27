export async function searchLocations(query) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5`;
  const res = await fetch(url);
  const json = await res.json();
  if (!json.results) return [];
  return json.results.map(r => ({
    name: r.name,
    country: r.country,
    latitude: r.latitude,
    longitude: r.longitude,
    admin1: r.admin1
  }));
}
