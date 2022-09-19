import { Router } from "express";
import { middleware } from "../middlewares/schemasValidationMiddleware";
import * as authController from "../controllers/authController";
import * as authSchemas from "../schemas/authSchema";

const router = Router();

router.post("/signup", middleware(authSchemas.signUpSchema), authController.signUp);

export default router;

