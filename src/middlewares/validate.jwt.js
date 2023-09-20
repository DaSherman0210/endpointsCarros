import dotenv from "dotenv";
import Jwt from "jsonwebtoken";
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

const validateJWT = async (req = request, res = response) => {
   const token = req.header('api-token');

   if (!token) {
      return res.status(404).json({
         msg: "No esta el JWT en la peticion"
      })
   }

   try {

      const { uid } = Jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      const empleado = await empleados.findById(uid);

      if (!empleado) {
         return res.status(404).json({
            msg: "Json Web Token no valido - Usuario no existe en la base de datos"
         })
      }

      if (!empleado.activo) {
         return res.status(404).json({
            msg: "Token no valido - Usuario esta inactivo"
         })
      }

      req.empleado = empleado;
      console.log("Req empleado en validate" , req.empleado);
      next();

   } catch (error) {
      console.log(error);
   }
} 

export default validateJWT;