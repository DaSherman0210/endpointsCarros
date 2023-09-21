import response from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import generateJWT from "../helper/generate.jwt.js";

dotenv.config()

const MongoURI = process.env.MONGO_URI8326;

//* Se setea el nombre de la base de datos a usar

const nombreDB = "carros";

//* Se realiza la coneccion con la base de datos    

const client = new MongoClient(MongoURI);
await client.connect();
const db = client.db(nombreDB);

const empleados = db.collection("empleados");

const login = async (req,res = response)=>{
   const {email, password} = req.body;
   try {
      const empleado = await empleados.findOne({email});
      if (!empleado) {
         return res.status(404).json({
            msg: "Usuario no es correcto"
         })
      }

      if (!empleado.activo) {
         return res.status(404).json({
            msg: "El usuario esta inactivo"
         })
      }

      if (empleado.password !== password) {
         return res.status(404).json({
            msg: "La contraseña es incorrecta"
         })
      }

      const token = await generateJWT(empleado.id);
      console.log(token);
      res.json({empleado,token});

   } catch (error) {
      console.log(error);
   }
}

export default login;