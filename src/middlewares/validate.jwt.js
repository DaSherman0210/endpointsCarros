import dotenv from "dotenv";
import Jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";
import { response, request } from "express";

dotenv.config();

//* Obtencion del MONGO_URI

const MongoURI = process.env.MONGO_URI8326;

//* Se setea el nombre de la base de datos a usar

const nombreDB = "carros";

//* Se realiza la coneccion con la base de datos    

const client = new MongoClient(MongoURI);
await client.connect();
const db = client.db(nombreDB);

const empleados = db.collection("empleados");

const validateJWT = async (req, res, next) => {
   const token = req.header('api-token');

   if (!token) {
      return res.status(401).json({
         msg: "No se proporcionó un token JWT en la petición"
      });
   }
   console.log(token);

   try {
      const { uid } = Jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      console.log("Contenido del token JWT:", Jwt.decode(token));
      const empleado = await empleados.findOne({ _id: uid });

      if (!empleado) {
         return res.status(401).json({
            msg: "Token JWT no válido - Usuario no existe en la base de datos"
         });
      }

      if (!empleado.activo) {
         return res.status(401).json({
            msg: "Token JWT no válido - Usuario está inactivo"
         });
      }

      req.empleado = empleado;
      console.log("Req empleado en validate", req.empleado);
      next();

   } catch (error) {
      console.error(error);
      return res.status(500).json({
         msg: "Error al validar el token JWT"
      });
   }
};

export default validateJWT;