import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

import { config } from './config.js';
import weatherRouter from './routes/weather.js';
import healthRouter from './routes/health.js';
import { rateLimiter } from './middleware/rateLimit.js';
import { notFound, errorHandler } from './middleware/error.js';

const app = express();
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimiter);

app.use('/weather', weatherRouter);
app.use('/locations', weatherRouter);
app.use('/health', healthRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`🌦 Weather API running at http://localhost:${config.port}`);
});
