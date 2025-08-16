import express from 'express';
import cors from 'cors';
import { connectDB } from './lib/db';
import { env } from './config/env';
import { healthRouter } from './routes/health';
import { authRouter } from './routes/auth';
import { productRouter } from './routes/product';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);

app.get('/', (_req, res) => res.send('Server is running'));

connectDB().then(() => {
  app.listen(Number(env.PORT), () => {
    console.log(`🚀 Server listening on http://localhost:${env.PORT}`);
  });
});