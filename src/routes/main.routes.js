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

//* GETS ONE

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

//TODO -- SCHEMA ALQUILER

/**
 * @swagger
 *    components:
 *       schemas:
 *          alquileres:
 *             type: object
 *             properties:
 *                fechaInicio:
 *                   type: date
 *                   description: Fecha de inicio del alquiler
 *                fechaFinal:
 *                   type: date
 *                   description: Fecha del final del alquiler
 *                cantidadDias:
 *                   type: number
 *                   description: Cantidad de días que se realizó el alquiler
 *                cantidadHoras:
 *                   type: number
 *                   description: Cantidad de horas que se usó el auto
 *                precioTotal:
 *                   type: number
 *                   description: Precio final del alquiler
 *                cliente:
 *                   type: ObjectId
 *                   description: MongoId del cliente que alquiló el vehículo
 *                empleado:
 *                   type: ObjectId
 *                   description: MongoId del empleado que realizó el alquiler
 *                estado:
 *                   type: string
 *                   description: Estado del alquiler
 *                sucursal:
 *                   type: ObjectId
 *                   description: MongoId de la sucursal en la cual se realizó el alquiler
 *                auto:
 *                   type: ObjectId
 *                   description: MongoId del auto del cual se realizó el alquiler
 *             required:
 *                -fechaInicio
 *                -fechaFinal
 *                -cantidadDias
 *                -cantidadHoras
 *                -precioTotal
 *                -cliente
 *                -empleado
 *                -estado
 *                -sucursal
 *                -auto
 *             example:
 *                fechaInicio: 2023-07-05T   00:00:00.000Z
 *                fechaFinal: 2023-07-20T09:00:00Z
 *                cantidadDias: 4
 *                cantidadHoras: 48
 *                precioTotal: 500
 *                cliente: 65065814b8116e94df8a1c3d
 *                empleado: 6507b365b8116e94df8a1c50
 *                estado: Activo
 *                sucursal: 65065814b8116e94df8a1c3c
 *                auto: 65065814b8116e94df8a1c3c
 *          automoviles:
 *             type: object
 *             properties:
 *                modelo:
 *                   type: string
 *                   description: Modelo del auto
 *                marca:
 *                   type: string
 *                   description: Marca del auto
 *                año:
 *                   type: number
 *                   description: Año del carro
 *                activo:
 *                   type: boolean
 *                   description: Estado del carro
 *                precioDia:
 *                   type: number
 *                   description: Precio por dia de alquiler
 *                precioHora:
 *                   type: number
 *                   description: Precio por cada hora de uso del vehiculo
 *                capacidad:
 *                   type: number
 *                   description: Capacidad de pasajeros
 *             required:
 *                -modelo      
 *                -marca
 *                -año      
 *                -activo      
 *                -precioDia      
 *                -precioHora 
 *                -capacidad
 *             example:
 *                modelo: Carro
 *                marca: BMW
 *                año: 2005
 *                activo: true
 *                precioDia: 200
 *                precioHora: 20
 *                capacidad: 4
 *          clientes:
 *             type: object
 *             properties:
 *                nombre:
 *                   type: string
 *                   description: Nombre del cliente
 *                dni:
 *                   type: number
 *                   description: El dni del cliente
 *                tipoDocumento:
 *                   type: string
 *                   description: Tipo del documento
 *                activo:
 *                   type: string
 *                   description: estado del cliente
 *                celular:
 *                   type: string
 *                   description: Numero telefonico del cliente
 *                email:
 *                   type: string
 *                   description: email del cliente
 *                direccion:
 *                   type: string
 *                   description: direccion del cliente
 *             required:
 *                -nombre
 *                -dni
 *                -tipoDocumento
 *                -celular
 *                -email
 *                -direccion
 *             example:
 *                nombre: Pepito Perez
 *                dni: 3432545464
 *                tipoDocumento: Cedula de Ciudadania
 *                celular: 356555757
 *                acivo: true
 *                email: pepitoP@gmail.com
 *                direccion: Apartamento 203
 *          empleados:
 *             type: object
 *             properties:
 *                nombre:
 *                   type: string
 *                   description: Nombre del empleado
 *                dni:
 *                   type: string
 *                   description: DNI del empleado
 *                email:
 *                   type: string
 *                   description: Correo del empleado
 *                password:
 *                   type: string
 *                   description: Contraseña del empleado
 *                cargo:
 *                   type: string
 *                   description: Cargo que representa el empleado dentro de la empresa
 *                activo:
 *                   type: boolean
 *                   description: Estado del empleado
 *                sucursal:
 *                   type: ObjectId
 *                   description: Nombre del empleado
 *                fechaContratacion:
 *                   type: date
 *                   description: fecah de contratacion del empleado
 *             required:
 *                -nombre
 *                -dni
 *                -email
 *                -password
 *                -cargo
 *                -sucursal
 *                -fechaContratacion
 *             example:
 *                nombre: Pepito Jimenez
 *                email: pepitoJ@gmail.com
 *                password: 12345
 *                cargo: Gerente
 *                sucursal: 65065814b8116e94df8a1c3e
 *                fechaContratacion: 2022-04-10
 *          sucursal:
 *             type: object
 *             properties:
 *                ciudad:
 *                   type: string
 *                   description: La ciudad en la que se encuentra la sucursal.
 *                pais:
 *                   type: string
 *                   description: El pais en el que se encuentra la sucursal.
 *                direccion:
 *                   type: string
 *                   description: La direccion en la que se encuentra la sucursal.
 *                activo:
 *                   type: boolean
 *                   description: Estado de la sucursal.
 *                autosDisponibles:
 *                   type: array
 *                   description: Array de autos disponibles en la sucursal.
 *             required:
 *                -ciudad
 *                -pais
 *                -direccion
 *                -autosDisponibles
 *             example:
 *                ciudad: Medellin
 *                pais: colombia
 *                direccion: Cll 8 Crra 32
 *                activo: true
 *                autosDisponibles: [65065814b8116e94df8a1c47, 65065814b8116e94df8a1c46] 
 *           
*/         

//TODO -- GETS

/**
 * @swagger
 *    /getAutomoviles:
 *       get:
 *          summary: Obtener automoviles
 *          tags: [Automoviles]
 *          responses:
 *             200:
 *                description: Se obtuvieron los automoviles
 *                content:
 *                   application/json:
 *                      schema:
 *                         type: array
 *                         items:
 *                            $ref: '#/components/schemas/automoviles'
 *             400:
 *                description: No se pudieron obtener los automoviles            
 */

/**
 * @swagger
 *    /getAlquiler:
 *       get:
 *          summary: Obtener alquileres
 *          tags: [Alquileres]
 *          responses:
 *             200:
 *                description: Se obtuvieron los alquileres
 *                content:
 *                   application/json:
 *                      schema:
 *                         type: array
 *                         items:
 *                            $ref: '#/components/schemas/alquileres'
 *             400:
 *                description: No se pudieron obtener los alquileres            
 */

/**
 * @swagger
 *    /getClientes:
 *       get:
 *          summary: Obtener clientes
 *          tags: [Clientes]
 *          responses:
 *             200:
 *                description: Se obtuvieron los clientes
 *                content:
 *                   application/json:
 *                      schema:
 *                         type: array
 *                         items:
 *                            $ref: '#/components/schemas/clientes'
 *             400:
 *                description: No se pudieron obtener los clientes            
 */

/**
 * @swagger
 *    /getEmpleados:
 *       get:
 *          summary: Obtener empleados
 *          tags: [Empleados]
 *          responses:
 *             200:
 *                description: Se obtuvieron los empleados
 *                content:
 *                   application/json:
 *                      schema:
 *                         type: array
 *                         items:
 *                            $ref: '#/components/schemas/empleados'
 *             400:
 *                description: No se pudieron obtener los empleados            
 */

/**
 * @swagger
 *    /getAlquiler:
 *       get:
 *          summary: Obtener alquileres
 *          tags: [Alquileres]
 *          responses:
 *             200:
 *                description: Se obtuvieron los alquileres
 *                content:
 *                   application/json:
 *                      schema:
 *                         type: array
 *                         items:
 *                            $ref: '#/components/schemas/alquileres'
 *             400:
 *                description: No se pudieron obtener los alquileres            
 */

/**
 * @swagger
 *    /getSucursal:
 *       get:
 *          summary: Obtener sucursal
 *          tags: [Sucursal]
 *          responses:
 *             200:
 *                description: Se obtuvieron los sucursal
 *                content:
 *                   application/json:
 *                      schema:
 *                         type: array
 *                         items:
 *                            $ref: '#/components/schemas/sucursal'
 *             400:
 *                description: No se pudieron obtener los sucursal            
 */

//TODO -- GET ONE

/**
 * @swagger
 * /getOneAutomoviles/{id}:
 *  get:
 *    summary: Obtener un automovil
 *    tags: [Automoviles]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: automovil id
 *    responses:
 *      200:
 *        description: Se obtuvo con exito un automovil
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/automoviles'
 *      404:
 *        description: No se pudo obtener el automovil
 */

/**
  * @swagger
  * /getOneAlquiler/{id}:
  *  get:
  *    summary: Obtener un alquiler
  *    tags: [Alquileres]
  *    parameters:
  *      - in: path
  *        name: id
  *        schema:
  *          type: string
  *        required: true
  *        description: alquiler id
  *    responses:
  *      200:
  *        description: Se obtuvo con exito un alquiler
  *        content:
  *          application/json:
  *            schema:
  *              type: array
  *              items:
  *                $ref: '#/components/schemas/alquileres'
  *      404:
  *        description: No se pudo obtener el alquiler
 */

/**
* @swagger
* /getOneCliente/{id}:
*  get:
*    summary: Obtener un cliente
*    tags: [Clientes]
*    parameters:
*      - in: path
*        name: id
*        schema:
*          type: string
*        required: true
*        description: cliente id
*    responses:
*      200:
*        description: Se obtuvo con exito un cliente
*        content:
*          application/json:
*            schema:
*              type: array
*              items:
*                $ref: '#/components/schemas/clientes'
*      404:
*        description: No se pudo obtener el cliente
*/

/**
* @swagger
* /getOneEmpleados/{id}:
*  get:
*    summary: Obtener un empleado
*    tags: [Empleados]
*    parameters:
*      - in: path
*        name: id
*        schema:
*          type: string
*        required: true
*        description: empleado id
*    responses:
*      200:
*        description: Se obtuvo con exito un empleado
*        content:
*          application/json:
*            schema:
*              type: array
*              items:
*                $ref: '#/components/schemas/empleados'
*      404:
*        description: No se pudo obtener el empleado
*/

/**
* @swagger
* /getOneSucursal/{id}:
*  get:
*    summary: Obtener una sucursal
*    tags: [Sucursal]
*    parameters:
*      - in: path
*        name: id
*        schema:
*          type: string
*        required: true
*        description: sucursal id
*    responses:
*      200:
*        description: Se obtuvo con exito un sucursal
*        content:
*          application/json:
*            schema:
*              type: array
*              items:
*                $ref: '#/components/schemas/sucursal'
*      404:
*        description: No se pudo obtener el sucursal
*/

//TODO -- POSTS

/**
 * @swagger
 * /postAutomoviles:
 *  post:
 *    summary: Agregar automovil
 *    tags: [Automoviles]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/componets/schemas/automoviles'
 *    responses:
 *      200:
 *        description: Se agrego con exito el automovil
 *      404:
 *        description: No se pudo agregar el automovil
 */

/**
 * @swagger
 * /postAlquiler:
 *  post:
 *    summary: Agregar alquiler
 *    tags: [Alquileres]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/componets/schemas/alquileres'
 *    responses:
 *      200:
 *        description: Se agrego con exito el alquiler
 *      404:
 *        description: No se pudo agregar el alquiler
 */

/**
 * @swagger
 * /postCliente:
 *  post:
 *    summary: Agregar cliente
 *    tags: [Clientes]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/componets/schemas/clientes'
 *    responses:
 *      200:
 *        description: Se agrego con exito el cliente
 *      404:
 *        description: No se pudo agregar el cliente
 */

/**
 * @swagger
 * /postEmpleado:
 *  post:
 *    summary: Agregar empleado
 *    tags: [Empleados]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/componets/schemas/empleados'
 *    responses:
 *      200:
 *        description: Se agrego con exito el empleados
 *      404:
 *        description: No se pudo agregar el empleados
 */

/**
 * @swagger
 * /postSucursal:
 *  post:
 *    summary: Agregar sucursal
 *    tags: [Sucursal]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/componets/schemas/sucursal'
 *    responses:
 *      200:
 *        description: Se agrego con exito el sucursal
 *      404:
 *        description: No se pudo agregar el sucursal
 */

//TODO -- DELETE

/**
 * @swagger
 * /deleteAutomoviles/{id}:
 *  delete:
 *    summary: Eliminar un automovil
 *    tags: [Automoviles]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: El automovil id
 *    responses:
 *      200:
 *        description: Se elimino al alquiler automovil
 *      404:
 *        description: No se pudo eliminar el automovil
 */

/**
 * @swagger
 * /deleteAlquiler/{id}:
 *  delete:
 *    summary: Eliminar un alquiler
 *    tags: [Alquileres]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: El alquiler id
 *    responses:
 *      200:
 *        description: Se elimino al alquiler exitosamente
 *      404:
 *        description: No se pudo eliminar el alquiler
 */

/**
 * @swagger
 * /deleteCliente/{id}:
 *  delete:
 *    summary: Eliminar un cliente
 *    tags: [Clientes]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: El cliente id
 *    responses:
 *      200:
 *        description: Se elimino al cliente exitosamente
 *      404:
 *        description: No se pudo eliminar el cliente
 */

/**
 * @swagger
 * /deleteEmpleados/{id}:
 *  delete:
 *    summary: Eliminar un empleado
 *    tags: [Empleados]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: El empleado id
 *    responses:
 *      200:
 *        description: Se elimino al empleado exitosamente
 *      404:
 *        description: No se pudo eliminar el empleado
 */

/**
 * @swagger
 * /deleteSucursal/{id}:
 *  delete:
 *    summary: Eliminar un sucursal
 *    tags: [Sucursal]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: El sucursal id
 *    responses:
 *      200:
 *        description: Se elimino al sucursal exitosamente
 *      404:
 *        description: No se pudo eliminar el sucursal
 */

//TODO -- PUT

/**
 * @swagger
 *  /updateAutomoviles/{id}:
 *    put:
 *      summary: Actualizar un automovil
 *      tags: [Automoviles]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/automoviles'
 *      responses:
 *        200:
 *          description: Actualizado con exito
 *        404:
 *          description: No se pudo actualizar el automovil
 */

/**
 * @swagger
 *  /updateAlquiler/{id}:
 *    put:
 *      summary: Actualizar un alquiler
 *      tags: [Alquileres]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/alquileres'
 *      responses:
 *        200:
 *          description: Actualizado con exito
 *        404:
 *          description: No se pudo actualizar el alquiler
 */

/**
 * @swagger
 *  /updateClientes/{id}:
 *    put:
 *      summary: Actualizar un cliente
 *      tags: [Clientes]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/cientes'
 *      responses:
 *        200:
 *          description: Actualizado con exito
 *        404:
 *          description: No se pudo actualizar el cliente
 */

/**
 * @swagger
 *  /updateEmpleados/{id}:
 *    put:
 *      summary: Actualizar un empleado
 *      tags: [Empleados]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/empleados'
 *      responses:
 *        200:
 *          description: Actualizado con exito
 *        404:
 *          description: No se pudo actualizar el empleado
 */

/**
 * @swagger
 *  /updateSucursal/{id}:
 *    put:
 *      summary: Actualizar una sucursal
 *      tags: [Sucursal]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/sucursal'
 *      responses:
 *        200:
 *          description: Actualizado con exito
 *        404:
 *          description: No se pudo actualizar el sucursal
 */

//TODO -- ENDPOINTS

//? ENDPOINT 1
/**
 * @swagger
 *  /endpoint1:
 *    get:
 *      summary: Mostrar todos los clientes registrados
 *      tags: [Endpoints]
 *      responses:
 *        200:
 *          description: Se obtuvieron los clientes
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/compononets/schemas/clientes'
 *        400:
 *          description: No se pudieron obtener los clientes  
 */

//? ENDPOINT 2
/**
 * @swagger
 *  /endpoint2:
 *    get:
 *      summary: Obtener los autos disponibles para alquiler
 *      tags: [Endpoints]
 *      responses:
 *        200:
 *          description: Se obtuvieron los automoviles
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/compononets/schemas/automoviles'
 *        400:
 *          description: No se pudieron obtener los automoviles  
 */

//? ENDPOINT 3
/**
 * @swagger
 *  /endpoint3:
 *    get:
 *      summary: Listar los alquileres activos junto con la base de datos de los clientes reservados
 *      tags: [Endpoints]
 *      responses:
 *        200:
 *          description: Se obtuvieron los alquileres
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/compononets/schemas/alquileres'
 *        400:
 *          description: No se pudieron obtener los alquileres  
 */

//? ENDPOINT 4
/**
 * @swagger
 *  /endpoint4:
 *    get:
 *      summary: Mostrar las reservas pendientes con los datos del cliente y el automovil reservado
 *      tags: [Endpoints]
 *      responses:
 *        200:
 *          description: Se obtuvieron los alquileres
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/compononets/schemas/alquileres'
 *        400:
 *          description: No se pudieron obtener los alquileres  
 */

//? ENDPOINT 5
/**
 * @swagger
 *  /endpoint5/{id}:
 *    get:
 *      summary: Obtener los detalles del alquiler con el id_alquiler en especifico
 *      tags: [Endpoints]
 *      responses:
 *        200:
 *          description: Se obtuvieron los alquileres
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/compononets/schemas/alquileres'
 *        400:
 *          description: No se pudieron obtener los alquileres  
 */

//? ENDPOINT 6
/**
 * @swagger
 *  /endpoint6:
 *    get:
 *      summary: Listar empleados con el cargo de 'vendedor'
 *      tags: [Endpoints]
 *      responses:
 *        200:
 *          description: Se obtuvieron los empleados
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/compononets/schemas/empleados'
 *        400:
 *          description: No se pudieron obtener los empleados  
 */

//? ENDPOINT 7
/**
 * @swagger
 *  /endpoint7:
 *    get:
 *      summary: Mostrar la cantidad total de automoviles disponibles en cada sucursal
 *      tags: [Endpoints]
 *      responses:
 *        200:
 *          description: Se obtuvieron los sucursal
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/compononets/schemas/sucursal'
 *        400:
 *          description: No se pudieron obtener los sucursal  
 */

//? ENDPOINT 8
/**
 * @swagger
 *  /endpoint8/{id}:
 *    get:
 *      summary: Obtener el costo total de un alquiler especifico.
 *      tags: [Endpoints]
 *      responses:
 *        200:
 *          description: Se obtuvieron los alquileres
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/compononets/schemas/alquileres'
 *        400:
 *          description: No se pudieron obtener los alquileres  
 */

//? ENDPOINT 9
/**
 * @swagger
 *  /endpoint9/{dni}:
 *    get:
 *      summary: Listar clientes por DNI especifico
 *      tags: [Endpoints]
 *      responses:
 *        200:
 *          description: Se obtuvieron los clientes
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/compononets/schemas/clientes'
 *        400:
 *          description: No se pudieron obtener los clientes  
 */

//? ENDPOINT 10
/**
 * @swagger
 *  /endpoint10:
 *    get:
 *      summary: Mostrar automoviles con capacidad mayor a 5 personas
 *      tags: [Endpoints]
 *      responses:
 *        200:
 *          description: Se obtuvieron los automoviles
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/compononets/schemas/automoviles'
 *        400:
 *          description: No se pudieron obtener los automoviles  
 */

//? ENDPOINT 11
/**
 * @swagger
 *  /endpoint11:
 *    get:
 *      summary: Obtener los detalles de un alquiler que tiene fecha de inicio en '2023-07-05'
 *      tags: [Endpoints]
 *      responses:
 *        200:
 *          description: Se obtuvieron los alquileres
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/compononets/schemas/alquileres'
 *        400:
 *          description: No se pudieron obtener los alquileres  
 */

//? ENDPOINT 12
/**
 * @swagger
 *  /endpoint12/{id}:
 *    get:
 *      summary: Listar las reservas pendiente de un cliente en especifico
 *      tags: [Endpoints]
 *      responses:
 *        200:
 *          description: Se obtuvieron los alquileres
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/compononets/schemas/alquileres'
 *        400:
 *          description: No se pudieron obtener los alquileres  
 */

//? ENDPOINT 13
/**
 * @swagger
 *  /endpoint13:
 *    get:
 *      summary: Mostrar los empleados con cargo 'Gerente' o 'Asistente'
 *      tags: [Endpoints]
 *      responses:
 *        200:
 *          description: Se obtuvieron los empleados
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/compononets/schemas/empleados'
 *        400:
 *          description: No se pudieron obtener los empleados  
 */

//? ENDPOINT 14
/**
 * @swagger
 *  /endpoint14:
 *    get:
 *      summary: Obtener los datos del cliente que realizo al menos un alquiler
 *      tags: [Endpoints]
 *      responses:
 *        200:
 *          description: Se obtuvieron los alquileres
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/compononets/schemas/alquileres'
 *        400:
 *          description: No se pudieron obtener los alquileres  
 */

//? ENDPOINT 15
/**
 * @swagger
 *  /endpoint15:
 *    get:
 *      summary: Listar todos los automoviles ordenados por marca y modelo
 *      tags: [Endpoints]
 *      responses:
 *        200:
 *          description: Se obtuvieron los automoviles
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/compononets/schemas/automoviles'
 *        400:
 *          description: No se pudieron obtener los automoviles  
 */

//? ENDPOINT 16
/**
 * @swagger
 *  /endpoint16:
 *    get:
 *      summary: Mostrar la cantidad de automoviles en cada sucursal junto a la dirección
 *      tags: [Endpoints]
 *      responses:
 *        200:
 *          description: Se obtuvieron los sucursal
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/compononets/schemas/sucursal'
 *        400:
 *          description: No se pudieron obtener los sucursal  
 */

//? ENDPOINT 17
/**
 * @swagger
 *  /endpoint17:
 *    get:
 *      summary: Obtener los alquileres registrados en la base de datos
 *      tags: [Endpoints]
 *      responses:
 *        200:
 *          description: Se obtuvieron los alquileres
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/compononets/schemas/alquileres'
 *        400:
 *          description: No se pudieron obtener los alquileres  
 */

//? ENDPOINT 18
/**
 * @swagger
 *  /endpoint18:
 *    get:
 *      summary: Mostrar los automóviles con capacidad igual a 5 personas y que estén disponibles.
 *      tags: [Endpoints]
 *      responses:
 *        200:
 *          description: Se obtuvieron los automoviles
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/compononets/schemas/automoviles'
 *        400:
 *          description: No se pudieron obtener los automoviles  
 */

//? ENDPOINT 19
/**
 * @swagger
 *  /endpoint19:
 *    get:
 *      summary: Obtener los datos del cliente que realizó la reserva
 *      tags: [Endpoints]
 *      responses:
 *        200:
 *          description: Se obtuvieron los alquileres
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/compononets/schemas/alquileres'
 *        400:
 *          description: No se pudieron obtener los alquileres  
 */

//? ENDPOINT 20
/**
 * @swagger
 *  /endpoint20:
 *    get:
 *      summary: Mostrar alquileres con fecha de inicio entre '2023-07-05' y '2023-07-10'
 *      tags: [Endpoints]
 *      responses:
 *        200:
 *          description: Se obtuvieron los alquileres
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/compononets/schemas/alquileres'
 *        400:
 *          description: No se pudieron obtener los alquileres  
 */



//! Se exporta por default el router


export default router;