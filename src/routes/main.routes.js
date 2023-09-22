//? Importaciones

import express from "express";
import { check } from "express-validator";
import { validateDocuments } from "../middlewares/validate.documents.js";

import {

   endpoint1,endpoint2,endpoint3,endpoint4,endpoint5,endpoint6,endpoint7,endpoint8,endpoint9,endpoint10,
   endpoint11,endpoint12,endpoint13,endpoint14,endpoint15,endpoint16,endpoint17,endpoint18,endpoint19,endpoint20,
   
   //* ALQUILERES

   getAlquileres, getOneAlquileres, postAlquileres, deleteAlquileres, updateAlquileres,

   //* AUTOMOVILES

   getAutomoviles, getOneAutomoviles, postAutomoviles, deleteAutomoviles, updateAutomoviles,

   //* CLIENTES

   getClientes, getOneClientes, postClientes, deleteClientes, updateClientes,

   //* EMPLEADOS

   getEmpleados, getOneEmpleados, postEmpleados, deleteEmpleados, updateEmpleados,

   //* SUCURSAL

   getSucursal, getOneSucursal, postSucursal, deleteSucursal, updateSucursal

} from "../controllers/main.controller.js";

const router = express.Router();

//* GET JWT



//* GETS ENDPOINTS

router.get("/endpoint1", endpoint1);
router.get("/endpoint2", endpoint2);
router.get("/endpoint3", endpoint3);
router.get("/endpoint4", endpoint4);
router.get("/endpoint5/:id", endpoint5);
router.get("/endpoint6", endpoint6);
router.get("/endpoint7", endpoint7);
router.get("/endpoint8/:id", endpoint8);
router.get("/endpoint9/:dni", endpoint9);
router.get("/endpoint10", endpoint10);
router.get("/endpoint11", endpoint11);
router.get("/endpoint12/:id", endpoint12);
router.get("/endpoint13", endpoint13);
router.get("/endpoint14", endpoint14);
router.get("/endpoint15", endpoint15);
router.get("/endpoint16", endpoint16);
router.get("/endpoint17", endpoint17);
router.get("/endpoint18", endpoint18);
router.get("/endpoint19", endpoint19);
router.get("/endpoint20", endpoint20);

//* GETS CRUDS

router.get("/getAlquiler",getAlquileres);
router.get("/getAutomoviles",getAutomoviles);
router.get("/getClientes",getClientes);
router.get("/getEmpleados",getEmpleados);
router.get("/getSucursal",getSucursal);
router.get("/getOneAlquiler/:id",getOneAlquileres);
router.get("/getOneAutomoviles/:id",getOneAutomoviles);
router.get("/getOneCliente/:id",getOneClientes);
router.get("/getOneEmpleados/:id",getOneEmpleados);
router.get("/getOneSucursal/:id",getOneSucursal);

//* POSTS

router.post("/postAlquiler", [
   check("fechaInicio","La fecha de Inicio no es valida").notEmpty().isDate(),
   check("fechaFinal", "La fecha final no es valida").notEmpty().isDate(),
   check("cantidadDias", "La cantidad de dias no es valida").notEmpty().isNumeric(),
   check("cantidadHoras", "La cantidad de horas no es valida").notEmpty().isNumeric(),
   check("precioTotal","El precio total no es valido").notEmpty().isNumeric(),
   check("cliente", "No es un cliente mongoId valido ").notEmpty().isMongoId(),
   check("empleado", "No es un empleado mongoId valido").notEmpty().isMongoId(),
   check("estado","No es un estado valido").notEmpty().isIn(["Pendiente", "Activo"]).isString(),
   check("sucursal", "No es una sucursal mongoId valida").notEmpty().isMongoId(),
   check("auto", "No es un auto mongoId").notEmpty().isMongoId(),
   validateDocuments
] ,postAlquileres);
router.post("/postAutomoviles",[
   check("modelo","No es un modelo valido").notEmpty().isString(),
   check("marca","No es una marca valida").notEmpty().isString(),
   check("año","No es un año valido").notEmpty().isNumeric(),
   check("activo","No es valido el valor del activo").notEmpty().isBoolean(),
   check("precioDia","El precio del dia no es valido").notEmpty().isNumeric(),
   check("precioHora","EL precio por hora no es valido").notEmpty().isNumeric(),
   check("capacidad","La capacidad ingresada no es valida").notEmpty().isNumeric(),
   check("createdAt","El createdAt valor no es valido").notEmpty().isDate(),
   check("updatedAt","El updatedAt valor no es valido").notEmpty().isDate(),
   validateDocuments
],postAutomoviles);
router.post("/postCliente",[
   check("nombre","El nombre ingresado no es valido").notEmpty().isString(),
   check("dni","El dni ingresado no es valido").notEmpty().isNumeric(),
   check("tipoDocumento","El tipo de documento no es valido").notEmpty().isString(),
   check("activo", "El valor de activo no es valido").notEmpty().isBoolean(),
   check("celular","El celular ingresado no es valido").notEmpty().isNumeric(),
   check("email","El email ingresado no es valido").notEmpty().isEmail(),
   check("direccion", "La direccion ingresada no es valida").isEmail().isString(),
   validateDocuments
],postClientes);
router.post("/postEmpleados",[
   check("nombre","El nombre ingresado no es valido").notEmpty().isString(),
   check("dni","El dni ingresado no es valido").notEmpty().isNumeric(),
   check("email","El email ingresado no es valido").notEmpty().isEmail(),
   check("password", "La contraseña ingresada no es valida (tiene que ser mayor a 6 digitos)").notEmpty().isLength({min: 6}),
   check("cargo","El cargo ingresado no es valido").notEmpty().isIn(["Vendedor", "Gerente" , "Recepcionista"]),
   check("activo","El valor dado en el activo es invalido").notEmpty().isBoolean(),
   check("sucursal","La sucursal mongoId no es valida").notEmpty().isMongoId(),
   check("fechaContratacion","La fecha de cotratacion no es valida").notEmpty(),
   validateDocuments
],postEmpleados);
router.post("/postSucursal",[
   check("ciudad","La ciudad ingresada no es valida").notEmpty().isString(),
   check("pais","El pais ingresado no esa valido").notEmpty().isString(),
   check("direccion","La direccion ingresada no es valida").notEmpty().isString(),
   check("activo", "El valor del activo ingresado no es valido").notEmpty().isBoolean(),
   check("autosDisponibles", "Los autos disponibles no son disponibles").notEmpty().isArray(),
   validateDocuments
],postSucursal);

//* DELETE

router.delete("/deleteAlquiler",deleteAlquileres);
router.delete("/deleteAutomoviles",deleteAutomoviles);
router.delete("/deleteCliente",deleteClientes);
router.delete("/deleteEmpleados",deleteEmpleados);
router.delete("/deleteSucursal",deleteSucursal);

//* PUT

router.put("/updateAlquiler",updateAlquileres);
router.put("/updateAutomoviles",updateAutomoviles);
router.put("/updateClientes",updateClientes);
router.put("/updateEmpleados",updateEmpleados);
router.put("/updateSucursal",updateSucursal);

//! Se exporta por default el router

export default router;