import express from "express";
import { check } from "express-validator";
import { validateDocuments } from "../middlewares/validate.documents.js";
import login from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/login",[
   check("email", "El email es obligatorio").isEmail(),
   check("password", "El password es obligatorio").isString(),
   validateDocuments
],login)

export default router;