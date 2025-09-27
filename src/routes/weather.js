import { Router } from 'express';
import { getCache, setCache } from '../utils/cache.js';
import { config } from '../config.js';
import { searchLocations } from '../services/geocoding.js';
import { fetchCurrentWeather, fetchForecast } from '../services/openMeteo.js';

const router = Router();

// GET /locations/search?q={query}
router.get('/search', async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: 'Missing q parameter' });

  const cacheKey = `search:${q}`;
  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);

  const results = await searchLocations(q);
  setCache(cacheKey, results, config.cacheTTL);
  res.json(results);
});

// GET /weather/current?location={city}
router.get('/current', async (req, res) => {
  const location = req.query.location;
  if (!location) return res.status(400).json({ error: 'Missing location parameter' });

  const cacheKey = `current:${location}`;
  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);

  const geo = await searchLocations(location);
  if (!geo.length) return res.status(404).json({ error: 'Location not found' });

  const { latitude, longitude, name, country } = geo[0];
  const data = await fetchCurrentWeather(latitude, longitude);

  const payload = {
    location: `${name}, ${country}`,
    latitude,
    longitude,
    current: data.current
  };

  setCache(cacheKey, payload, config.cacheTTL);
  res.json(payload);
});

// GET /weather/forecast?location={city}&days={n}
router.get('/forecast', async (req, res) => {
  const location = req.query.location;
  const days = req.query.days || 5;
  if (!location) return res.status(400).json({ error: 'Missing location parameter' });

  const cacheKey = `forecast:${location}:${days}`;
  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);

  const geo = await searchLocations(location);
  if (!geo.length) return res.status(404).json({ error: 'Location not found' });

  const { latitude, longitude, name, country } = geo[0];
  const data = await fetchForecast(latitude, longitude, days);

  const payload = {
    location: `${name}, ${country}`,
    latitude,
    longitude,
    daily: data.daily
  };

  setCache(cacheKey, payload, config.cacheTTL);
  res.json(payload);
});

export default router;
