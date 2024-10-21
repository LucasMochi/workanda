import { Router } from "express";
import UserController from "../controllers/UserController.js";
import auth from "../middelwares/auth.js";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", auth, userController.createUser);
userRoutes.put("/:id", auth, userController.updateUser);
userRoutes.get("/", auth, userController.readUsers);
userRoutes.delete("/:id", auth, userController.deleteUser);
userRoutes.post("/login", userController.login);
userRoutes.post("/logout", auth, userController.logout);

export default userRoutes;
