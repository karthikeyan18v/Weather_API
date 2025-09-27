export const config = {
  port: process.env.PORT || 3000,
  cacheTTL: Number(process.env.CACHE_TTL_SECONDS || 300),
  rateLimitPerMin: Number(process.env.RATE_LIMIT_PER_MIN || 60)
};
