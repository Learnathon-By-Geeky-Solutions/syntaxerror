import express from "express";
import { AuthController } from "./auth.controller";
const router = express.Router();

router.post("/register", AuthController.register);
router.post("/verify", AuthController.verifyCode);
router.post("/login", AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/reset-password-request', AuthController.initiatePasswordReset);
router.post('/reset-password', AuthController.resetPassword);

export const AuthRoutes = router;