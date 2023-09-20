//? Importamos la dependencia

import { validationResult } from "express-validator";

//* Funcion que valida de que se cumplan los paremetros que se le van a dar

const validateDocuments = (req,res,next) =>{
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json(errors)
      }
      next();
   } catch (error) {
      console.log(error);
   }
}

//! Exportamos la funcion anteriormente creada

export {validateDocuments}