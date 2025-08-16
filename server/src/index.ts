import express from 'express';
import cors from 'cors';
import { connectDB } from './lib/db';
import { env } from './config/env';
import { healthRouter } from './routes/healthRoutes';
import { authRouter } from './routes/authRoutes';
import { productRouter } from './routes/productRoutes';
import { orderRouter } from './routes/orderRoutes';
import { errorHandler } from './middleware/errorMiddleware';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.get('/', (_req, res) => res.send('Server is running'));
app.use(errorHandler);
connectDB().then(() => {
  app.listen(Number(env.PORT), () => {
    console.log(`🚀 Server listening on http://localhost:${env.PORT}`);
  });
});