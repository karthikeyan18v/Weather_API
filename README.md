# Weather API Service

A small, production-style REST API that returns **live weather data** using Open-Meteo, with:
- Endpoints for **current weather**, **forecast**, **location search**, and **health**
- **TTL caching** to reduce external calls
- **Rate limiting** to prevent abuse
- **Basic logging** and consistent **error handling**

> ✅ Works out of the box with **no API keys** (Open-Meteo).  
> 🕒 Timezone: The project was built and tested in IST (Asia/Kolkata).

---

## ✨ Endpoints

- `GET /weather/current?location={city|lat,lon}`
- `GET /weather/forecast?location={city|lat,lon}&days={1..10}`
- `GET /locations/search?q={query}`
- `GET /health`

### Examples (curl)

```bash
# Health
curl http://localhost:3000/health

# Search locations
curl "http://localhost:3000/locations/search?q=Chennai"

# Current weather (city)
curl "http://localhost:3000/weather/current?location=Chennai"

# Current weather (coordinates)
curl "http://localhost:3000/weather/current?location=13.0827,80.2707"

# 5-day forecast
curl "http://localhost:3000/weather/forecast?location=Chennai&days=5"







