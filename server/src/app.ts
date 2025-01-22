import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { AuthRoutes } from './app/modules/auth/auth.routes';

const app: Application = express();

// parsers
app.use(cookieParser());
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", AuthRoutes);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
