import { MongoClient } from "mongodb";
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
                "cliente.celular":1,
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

const endpoint5 = async (req,res) =>{
    try {
        const query = {_id: req.params.id}
        const data = await alquileres.findById(query);

        console.log(query);

        if (!data) {
            res.status(404).json({ error: 'El alquiler no fue encontrado' });
            return;
        }

        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

export { endpoint1, endpoint2, endpoint3, endpoint4 , endpoint5}