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

//TODO -- SCHEMAS
/**
 * @swagger
 *      components:
 *          schemas:
 *              Authentication:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                          description: Email del usuario
 *                      password:
 *                          type: string,
 *                          descripcion: Contraseña del usuario
 *                  required:
 *                      -email
 *                      -password
 *                  example:
 *                      email: ejemplo@ejemplo.com
 *                      password: contraseña
 */

//TODO -- Login
/**
 *  @swagger
 *  /auth/login:
 *  post:
 *      summary: Validar el usuario
 *      tags: [Authentication]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Authentication'
 *      responses:
 *          200:
 *              description: Usuario validado
 *          404:
 *              description: Usuario no encontrado
 */

export default router;