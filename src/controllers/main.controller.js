import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MongoURI = process.env.MONGO_URI8326;
const nombreDB = "carros";

const client = new MongoClient(MongoURI);
await client.connect();
const db = client.db(nombreDB);


//* Seleccion de colleciones

const alquileres = db.collection("alquileres");
const automoviles = db.collection("automoviles");
const clientes = db.collection("clientes");
const empleados = db.collection("empleados");
const sucursal = db.collection("sucursal");


const endpoint1 = async (req, res) => {
    try {
        const data = await clientes.find().toArray();
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

const endpoint2 = async (req, res) => {
    try {
        const query = { activo: true }
        const data = await automoviles.find(query).toArray();
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

const endpoint3 = async (req, res) => {
    try {
        const data = await alquileres.aggregate([
            {
                $lookup: {
                    from: "clientes",
                    localField: "cliente",
                    foreignField: "_id",
                    as: "cliente"
                }
            },
            {
                $unwind: "$cliente"
            },
            {
                $project: {
                    "_id": 0,
                    "estado": 1,
                    "precioTotal": 1,
                    "cliente.nombre": 1,
                    "cliente.dni": 1,
                    "cliente.email": 1
                }
            },
            {
                $match: {
                    "estado": /Activo/i
                }
            }
        ]).toArray();
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

const endpoint4 = async (req, res) => {
    try {
        const data = await alquileres.aggregate([
            {
                $lookup: {
                    from: "clientes",
                    localField: "cliente",
                    foreignField: "_id",
                    as: "cliente"
                }
            },
            {
                $lookup: {
                    from: "automoviles",
                    localField: "auto",
                    foreignField: "_id",
                    as: "automovil"
                }
            },
            {
                $unwind: "$cliente"
            },
            {
                $unwind: "$automovil"
            },
            {
                $match: {
                    "estado": /Pendiente/i
                }
            },
            {
                $project: {
                    "_id": 0,
                    "precioTotal": 1,
                    "cliente.nombre": 1,
                    "cliente.celular": 1,
                    "cliente.email": 1,
                    "automovil.modelo": 1,
                    "automovil.marca": 1,
                    "automovil.año": 1
                }
            }
        ]).toArray();
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

const endpoint5 = async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) }
        const data = await alquileres.findOne(query);
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

const endpoint6 = async (req, res) => {
    try {
        const query = { cargo: /Vendedor/i }
        const data = await empleados.find(query).toArray();
        res.json(data);
    } catch (error) {
        console.log(error);
    }
}

const endpoint7 = async (req, res) => {
    try {
        const data = await sucursal.aggregate([
            {
                $lookup: {
                    from: "automoviles",
                    localField: "autosDisponibles",
                    foreignField: "_id",
                    as: "carros"
                }
            },
            {
                $project: {
                    "_id": 0,
                    "ciudad": 1,
                    "pais": 1,
                    "direccion": 1,
                    "totalCarro": { $size: "$carros" }
                }
            }
        ]).toArray();
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

const endpoint8 = async (req, res) => {
    try {
        const data = await alquileres.aggregate([
            {
                $match: {
                    "_id": new ObjectId(req.params.id)
                }
            },
            {
                $project: {
                    "fechaInicio": 1,
                    "fechaFinal": 1,
                    "precioTotal": 1
                }
            }
        ]).toArray();
        console.log(req.params.id);
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

const endpoint9 = async (req, res) => {
    try {
        const query = { dni: Number(req.params.dni) }
        const data = await clientes.find(query).toArray();
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

const endpoint10 = async (req, res) => {
    try {
        const query = { capacidad: { $gt: 5 } }
        const data = await automoviles.find(query).toArray();
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

const endpoint11 = async (req, res) => {
    try {
        const query = { fechaInicio: new Date("2023-07-05").toISOString() }
        console.log(query);
        const data = await alquileres.find(query).toArray();
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

const endpoint12 = async (req, res) => {
    try {
        const data = await alquileres.aggregate([
            {
                $lookup: {
                    from: "clientes",
                    localField: "cliente",
                    foreignField: "_id",
                    as: "cliente"
                }
            },
            {
                $unwind: "$cliente"
            },
            {
                $match: {
                    "estado": /pendiente/i,
                    "cliente._id": new ObjectId(req.params.id)
                }
            },
            {
                $group: {
                    "_id": new ObjectId,
                    "cantidadReservas": { $sum: 1 },
                    "reservas": {
                        $push: {
                            "fechaInicio": "$fechaInicio",
                            "fechaFinal": "$fechaFinal",
                            "precioTotal": "$precioTotal",
                            "estado": "$estado",
                            "nombreCliente": "$cliente.nombre",
                            "celularCliente": "$cliente.celular",
                            "emailCLiente": "$cliente.email",
                        }
                    }
                }
            },
        ]).toArray();
        res.json(data);
    } catch (error) {
        console.log(error);
    }
}

const endpoint13 = async (req, res) => {
    try {
        const query = { $or: [ {cargo: /gerente/i}, {cargo: /asistente/i} ] }
        const data = await empleados.find(query).toArray();
        res.json(data);
    } catch (error) {
        console.log(error);
    }
}

const endpoint14 = async (req,res) =>{
    try {
        const data = await alquileres.aggregate([
            {
                $lookup: {
                    from: "clientes",
                    localField: "cliente",
                    foreignField: "_id",
                    as: "cliente"
                }
            },
            {
                $unwind: "$cliente"
            },
            {
                $group: {
                    "_id": new ObjectId,
                    "cantidadReservas": { $sum: 1 },
                    "reservas": {
                        $push: {
                            "fechaInicio": "$fechaInicio",
                            "fechaFinal": "$fechaFinal",
                            "precioTotal": "$precioTotal",
                            "estado": "$estado",
                            "nombreCliente": "$cliente.nombre",
                            "celularCliente": "$cliente.celular",
                            "emailCLiente": "$cliente.email",
                        }
                    }
                }
            },
            {
                $match:{
                    "cantidadReservas": {$lt: 0} 
                }
            }
        ]).toArray();
        if (data.length === 0) {
            res.json(data);
        }else{
            res.send('No se encontraron gente que no haya reservado');
        }
    } catch (error) {
        console.log(error);
    }
}

const endpoint15 = async (req,res) =>{
    try {
        const data = await automoviles.find().sort({"marca":1 ,"modelo":1}).toArray();
        res.json(data);
    } catch (error) {
        console.log(error);
    }
}

const endpoint16 = async (req,res) =>{
    try {
        const data = await sucursal.aggregate([
            {
                $lookup: {
                    from: "automoviles",
                    localField: "autosDisponibles",
                    foreignField: "_id",
                    as: "carros"
                }
            },
            {
                $project: {
                    "_id": 0,
                    "direccion": 1,
                    "totalCarro": { $size: "$carros" }
                }
            }
        ]).toArray();
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

const endpoint17 = async (req,res) =>{
    try {
        const data = await alquileres.find().toArray();
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

const endpoint18 = async (req,res) =>{
    try {
        const data = await automoviles.aggregate([
            {
                $match:{
                    "capacidad": 5,
                    "activo": false
                }
            }
        ]).toArray();
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

const endpoint19 = async (req,res) =>{
    try {
        const data = await alquileres.aggregate([
            {
                $lookup: {
                  from: "clientes",
                  localField: "cliente",
                  foreignField: "_id",
                  as: "cliente"
                }
            },
            {
              $unwind: "$cliente"
            },
            {
              $project:{
                  "_id": 0,
                  "fechaInicio": 1,
                  "fechaFinal": 1,
                  "precioTotal": 1,
                  "cliente.nombre": 1,
                  "cliente.dni": 1,
                  "cliente.celular": 1,
                  "cliente.email": 1,
                  "cliente.direccion": 1
              }
          }
        ]).toArray();
        res.json(data);
    } catch (error) {
        console.log(error);
    }
}

const endpoint20 = async (req,res) => {
    try {
        const data = await alquileres.find({fechaInicio: {$gt: "2023-07-05" , $lt: "2023-07-10"}}).toArray();
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

export { endpoint1, endpoint2, endpoint3, endpoint4, endpoint5, endpoint6, endpoint7, endpoint8, endpoint9, endpoint10, endpoint11, endpoint12, endpoint13, endpoint14, endpoint15, endpoint16, endpoint17, endpoint18, endpoint19, endpoint20}