import express from "express";
import { UserController } from "./user.controller";
const router = express.Router();

router.get("/", UserController.getAllUser);
router.delete("/:id", UserController.deleteUser);
router.post("/addUser", UserController.userAdd);
router.patch("/editProfile", UserController.editUserProfile);


export const UserRoutes = router;