import express from "express";
import { auth } from "../../middlewares/auth";
import { UserController } from "./user.controller";
const router = express.Router();

router.get("/", UserController.getAllUser);
router.delete("/:id", UserController.deleteUser);
router.post("/addUser", UserController.userAdd);
router.patch("/editProfile", auth("Consumer"),UserController.editUserProfile);


export const UserRoutes = router;