import { Router } from 'express';
import { cacheInfo } from '../utils/cache.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    cache: cacheInfo(),
    timestamp: new Date().toISOString()
  });
});

export default router;
