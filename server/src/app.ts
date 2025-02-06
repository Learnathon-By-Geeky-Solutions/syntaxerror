import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { AuthRoutes } from './app/modules/auth/auth.routes';
import { CategoryRoutes } from './app/modules/category/category.routes';
import { ProductRoutes } from './app/modules/product/product.routes';

const app: Application = express();

// parsers
app.use(cookieParser());
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", AuthRoutes);
app.use("/api/category", CategoryRoutes);
app.use("/api/product", ProductRoutes);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
