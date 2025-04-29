import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { AuthRoutes } from './app/modules/auth/auth.routes';
import { CartRoutes } from './app/modules/cart/cart.routes';
import { CategoryRoutes } from './app/modules/category/category.routes';
import { PaymentRoutes } from './app/modules/payment/payment.routes';
import { ProductRoutes } from './app/modules/product/product.routes';
import { ReviewRoutes } from './app/modules/review/review.routes';
import { UserRoutes } from './app/modules/user/user.routes';

const app: Application = express();

// parsers
app.use(cors({
    origin: ["http://localhost:3001", "http://localhost:3000", "https://ikrishak.vercel.app", "https://ikrishak-admin.vercel.app"],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

// routes
app.use("/api/auth", AuthRoutes);
app.use("/api/category", CategoryRoutes);
app.use("/api/product", ProductRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/review", ReviewRoutes);
app.use("/api", PaymentRoutes);


// Global Error Handler
app.use(globalErrorHandler);

export default app;
