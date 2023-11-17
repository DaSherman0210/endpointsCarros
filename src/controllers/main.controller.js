//? Importaciones 

import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

//* Configuracion de dotenv

dotenv.config();

//* Obtencion del MONGO_URI

const MongoURI = process.env.MONGO_URI8326;

//* Se setea el nombre de la base de datos a usar

const nombreDB = "carros";

//* Se realiza la coneccion con la base de datos    

const client = new MongoClient(MongoURI);
await client.connect();
const db = client.db(nombreDB);


//* Seleccion de colleciones

const alquileres = db.collection("alquileres");
const automoviles = db.collection("automoviles");
const clientes = db.collection("clientes");
const empleados = db.collection("empleados");
const sucursal = db.collection("sucursal");

//? CRUD COLECCION ALQUILERES

//todo -- Obtener alquileres

const getAlquileres = async (req, res) => {
    try {
        const data = await alquileres.find().toArray();
        res.json(data)
    } catch (error) {
        console.log({
            msg: "Buscar alquileres",
            error
        });
    }
}

//todo -- Obtener un alquiler

const getOneAlquileres = async (req, res) => {
    try {
        const data = await alquileres.findOne({ _id: new ObjectId(req.params.id) });
        res.json({
            msg: "Buscar un alquiler",
            data
        });
    } catch (error) {
        console.log(error);
    }
}

//todo -- Agregar alquileres

const postAlquileres = async (req, res) => {
    try {
        const { fechaInicio, fechaFinal, cantidadDias, cantidadHoras, precioTotal, cliente, empleado, estado, sucursal, auto } = req.body;
        const data = new alquileres({ fechaInicio, fechaFinal, cantidadDias, cantidadHoras, precioTotal, cliente, empleado, estado, sucursal, auto })

        const nuevaData = await data.save();
        res.json({
            msg: "Agregado un alquiler con exito",
            nuevaData
        })
    } catch (error) {
        console.log(error);
    }
}

//todo -- Eliminar alquileres

const deleteAlquileres = async (req, res) => {
    try {
        const data = await alquileres.deleteOne({ _id: new ObjectId(req.params.id) });
        res.json({
            msg: "se borró con exito un alquiler",
            data
        })
    } catch (error) {
        console.log(error);
    }
}

//todo -- Actualizar alquileres

const updateAlquileres = async (req, res) => {
    try {
        const data = await alquileres.findOne({ _id: new ObjectId(req.params.id) });
        if (req.body.fechaInicio) {
            data.fechaInicio = req.body.fechaInicio;
        }
        if (req.body.fechaFinal) {
            data.fechaFinal = req.body.fechaFinal;
        }
        if (req.body.cantidadDias) {
            data.cantidadDias = req.body.cantidadDias;
        }
        if (req.body.cantidadHoras) {
            data.cantidadHoras = req.body.cantidadHoras;
        }
        if (req.body.precioTotal) {
            data.precioTotal = req.body.precioTotal;
        }
        if (req.body.cliente) {
            data.cliente = req.body.cliente;
        }
        if (req.body.empleado) {
            data.empleado = req.body.empleado;
        }
        if (req.body.estado) {
            data.estado = req.body.estado;
        }
        if (req.body.sucursal) {
            data.sucursal = req.body.sucursal;
        }
        if (req.body.auto) {
            data.auto = req.body.auto;
        }
        await data.save();
        res.json({
            msg: "Se actualizo el alquiler con exito",
            data
        })
    } catch (error) {
        console.log(error);
    }
}

//? CRUD COLECCION AUTOMOVILES

//todo -- Obtener automoviles

const getAutomoviles = async (req, res) => {
    try {
        const data = await automoviles.find().toArray();
        res.json(data)
    } catch (error) {
        console.log({
            msg: "Buscar automoviles",
            error
        });
    }
}

//todo -- Obtener un autmovil

const getOneAutomoviles = async (req, res) => {
    try {
        const data = await automoviles.findOne({ _id: new ObjectId(req.params.id) });
        res.json({
            msg: "Buscar un automovil",
            data
        });
    } catch (error) {
        console.log(error);
    }
}

//todo -- Agregar automovil

const postAutomoviles = async (req, res) => {
    try {
        const { modelo, marca, año, activo, precioDia, precioHora, capacidad, createdAt, updatedAt } = req.body;
        const data = new automoviles({ modelo, marca, año, activo, precioDia, precioHora, capacidad, createdAt, updatedAt })

        const nuevaData = await data.save();
        res.json({
            msg: "Agregado un automovil con exito",
            nuevaData
        })
    } catch (error) {
        console.log(error);
    }
}

//todo -- Eliminar Automoviles

const deleteAutomoviles = async (req, res) => {
    try {
        const data = await automoviles.deleteOne({ _id: new ObjectId(req.params.id) });
        res.json({
            msg: "se borró con exito un automovil",
            data
        })
    } catch (error) {
        console.log(error);
    }
}

//todo -- Actualizar automoviles

const updateAutomoviles = async (req, res) => {
    try {
        const data = await automoviles.findOne({ _id: new ObjectId(req.params.id) });
        if (req.body.modelo) {
            data.modelo = req.body.modelo;
        }
        if (req.body.marca) {
            data.marca = req.body.marca;
        }
        if (req.body.año) {
            data.año = req.body.año;
        }
        if (req.body.activo) {
            data.activo = req.body.activo;
        }
        if (req.body.precioDia) {
            data.precioDia = req.body.precioDia;
        }
        if (req.body.precioHora) {
            data.precioHora = req.body.precioHora;
        }
        if (req.body.capacidad) {
            data.capacidad = req.body.capacidad;
        }
        if (req.body.createdAt) {
            data.createdAt = req.body.createdAt;
        }
        if (req.body.updatedAt) {
            data.updatedAt = req.body.updatedAt;
        }
        await data.save();
        res.json({
            msg: "Se actualizo el automovil con exito",
            data
        })
    } catch (error) {
        console.log(error);
    }
}

//? CRUD COLECCION CLIENTES

//todo -- Obtener clientes

const getClientes = async (req, res) => {
    try {
        const data = await clientes.find().toArray();
        res.json(data)
    } catch (error) {
        console.log({
            msg: "Buscar clientes",
            error
        });
    }
}

//todo -- Obtener un cliente

const getOneClientes = async (req, res) => {
    try {
        const data = await clientes.findOne({ _id: new ObjectId(req.params.id) });
        res.json({
            msg: "Buscar un cliente",
            data
        });
    } catch (error) {
        console.log(error);
    }
}

//todo -- Agregar clientes

const postClientes = async (req, res) => {
    try {
        const { nombre, dni, tipoDocumento, activo, celular, email, direccion } = req.body;
        const data = new clientes({ nombre, dni, tipoDocumento, activo, celular, email, direccion })

        const nuevaData = await data.save();
        res.json({
            msg: "Agregado un cliente con exito",
            nuevaData
        })
    } catch (error) {
        console.log(error);
    }
}

//todo -- Borrar clientes

const deleteClientes = async (req, res) => {
    try {
        const data = await clientes.deleteOne({ _id: new ObjectId(req.params.id) });
        res.json({
            msg: "se borró con exito un cliente",
            data
        })
    } catch (error) {
        console.log(error);
    }
}

//todo -- Actualizar clientes

const updateClientes = async (req, res) => {
    try {
        const data = await clientes.findOne({ _id: new ObjectId(req.params.id) });
        if (req.body.nombre) {
            data.nombre = req.body.nombre;
        }
        if (req.body.dni) {
            data.dni = req.body.dni;
        }
        if (req.body.tipoDocumento) {
            data.tipoDocumento = req.body.tipoDocumento;
        }
        if (req.body.activo) {
            data.activo = req.body.activo;
        }
        if (req.body.celular) {
            data.celular = req.body.celular;
        }
        if (req.body.email) {
            data.email = req.body.email;
        }
        if (req.body.direccion) {
            data.direccion = req.body.direccion;
        }
        await data.save();
        res.json({
            msg: "Se actualizo el cliente con exito",
            data
        })
    } catch (error) {
        console.log(error);
    }
}

//? CRUD COLECCION EMPLEADOS

//todo -- Obtener empleados

const getEmpleados = async (req, res) => {
    try {
        const data = await empleados.find().toArray();
        res.json(data)
    } catch (error) {
        console.log({
            msg: "Buscar empleados",
            error
        });
    }
}

//todo -- Obtener un empleado

const getOneEmpleados = async (req, res) => {
    try {
        const data = await empleados.findOne({ _id: new ObjectId(req.params.id) });
        res.json({
            msg: "Buscar un empleado",
            data
        });
    } catch (error) {
        console.log(error);
    }
}

//todo -- Agregar empleado

const postEmpleados = async (req, res) => {
    try {
        

        const emailExiste = await empleados.findOne({email: req.body.email})

        if (emailExiste) {
            res.status(404).json({
                msg: "No se admiten correos duplicados"
            })
        }else{
            const data = await empleados.insertOne(req.body);

        res.json({
            msg: "Agregado un empleado con exito",
            data
        })
        }

        
    } catch (error) {
        console.log(error);
    }
}

//todo -- Borrar empleado

const deleteEmpleados = async (req, res) => {
    try {
        const data = await empleados.deleteOne({ _id: new ObjectId(req.params.id) });
        res.json({
            msg: "se borró con empleado un alquiler",
            data
        })
    } catch (error) {
        console.log(error);
    }
}

//todo -- Actualizar empleado

const updateEmpleados = async (req, res) => {
    try {
        const data = await empleados.findOne({ _id: new ObjectId(req.params.id) });
        if (req.body.nombre) {
            data.nombre = req.body.nombre;
        }
        if (req.body.dni) {
            data.dni = req.body.dni;
        }
        if (req.body.email) {
            data.email = req.body.email;
        }
        if (req.body.password) {
            data.password = req.body.password;
        }
        if (req.body.cargo) {
            data.cargo = req.body.cargo;
        }
        if (req.body.activo) {
            data.activo = req.body.activo;
        }
        if (req.body.sucursal) {
            data.sucursal = req.body.sucursal;
        }
        if (req.body.fechaContratacion) {
            data.fechaContratacion = req.body.fechaContratacion;
        }
        await data.save();
        res.json({
            msg: "Se actualizo el empleado con exito",
            data
        })
    } catch (error) {
        console.log(error);
    }
}

//? CRUD COLECCION SUCURSAL

//todo -- Obtener las sucursales

const getSucursal = async (req, res) => {
    try {
        const data = await sucursal.find().toArray();
        res.json(data)
    } catch (error) {
        console.log({
            msg: "Buscar sucursal",
            error
        });
    }
}

//todo -- Obtener una sucursal

const getOneSucursal = async (req, res) => {
    try {
        const data = await sucursal.findOne({ _id: new ObjectId(req.params.id) });
        res.json({
            msg: "Buscar un sucursal",
            data
        });
    } catch (error) {
        console.log(error);
    }
}

//todo -- Agregar Sucursal

const postSucursal = async (req, res) => {
    try {
        const { ciudad, pais, direccion, activo, autosDisponibles } = req.body;
        const data = new sucursal({ ciudad, pais, direccion, activo, autosDisponibles })

        const nuevaData = await data.save();
        res.json({
            msg: "Agregado una sucursal con exito",
            nuevaData
        })
    } catch (error) {
        console.log(error);
    }
}

//todo -- Borrar sucursal

const deleteSucursal = async (req, res) => {
    try {
        const data = await sucursal.deleteOne({ _id: new ObjectId(req.params.id) });
        res.json({
            msg: "se borró con exito una sucursal",
            data
        })
    } catch (error) {
        console.log(error);
    }
}

//todo -- Actualizar sucursal

const updateSucursal = async (req, res) => {
    try {
        const data = await sucursal.findOne({ _id: new ObjectId(req.params.id) });
        if (req.body.ciudad) {
            data.ciudad = req.body.ciudad;
        }
        if (req.body.pais) {
            data.pais = req.body.pais;
        }
        if (req.body.direccion) {
            data.direccion = req.body.direccion;
        }
        if (req.body.activo) {
            data.activo = req.body.activo;
        }
        if (req.body.autosDisponibles) {
            data.autosDisponibles = req.body.autosDisponibles;
        }
        await data.save();
        res.json({
            msg: "Se actualizo la sucursal con exito",
            data
        })
    } catch (error) {
        console.log(error);
    }
}

//? ENDPOINTS

//todo -- Mostrar todos los clientes registrados

const endpoint1 = async (req, res) => {
    try {
        const data = await clientes.find().toArray();
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

//todo -- Obtener los autos disponibles para alquiler

const endpoint2 = async (req, res) => {
    try {
        const query = { activo: true }
        const data = await automoviles.find(query).toArray();
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

//todo -- Listar los alquileres activos junto con la base de datos de los clientes reservados

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

//todo -- Mostrar las reservas pendientes con los datos del cliente y el automovil reservado

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

//todo -- Obtener los detalles del alquiler con el id_alquiler en especifico

const endpoint5 = async (req, res) => {
    try {
        const query = { _id: new ObjectId(new ObjectId(req.params.id)) }
        const data = await alquileres.findOne(query);
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

//todo -- Listar empleados con el cargo de 'vendedor'

const endpoint6 = async (req, res) => {
    try {
        const query = { cargo: /Vendedor/i }
        const data = await empleados.find(query).toArray();
        res.json(data);
    } catch (error) {
        console.log(error);
    }
}

//todo -- Mostrar la cantidad total de automoviles disponibles en cada sucursal

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

//todo -- Obtener el costo total de un alquiler especifico.

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

//todo -- Listar clientes por DNI especifico

const endpoint9 = async (req, res) => {
    try {
        const query = { dni: Number(req.params.dni) }
        const data = await clientes.find(query).toArray();
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

//todo -- Mostrar automoviles con capacidad mayor a 5 personas

const endpoint10 = async (req, res) => {
    try {
        const query = { capacidad: { $gt: 5 } }
        const data = await automoviles.find(query).toArray();
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

//todo -- Obtener los detalles de un alquiler que tiene fecha de inicio en '2023-07-05'

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

//todo -- Listar las reservas pendiente de un cliente en especifico

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

//todo -- Mostrar los empleados con cargo 'Gerente' o 'Asistente'

const endpoint13 = async (req, res) => {
    try {
        const query = { $or: [{ cargo: /gerente/i }, { cargo: /asistente/i }] }
        const data = await empleados.find(query).toArray();
        res.json(data);
    } catch (error) {
        console.log(error);
    }
}

//todo -- Obtener los datos del cliente que realizo al menos un alquiler

const endpoint14 = async (req, res) => {
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
                $match: {
                    "cantidadReservas": { $lt: 0 }
                }
            }
        ]).toArray();
        if (data.length === 0) {
            res.json(data);
        } else {
            res.send('No se encontraron gente que no haya reservado');
        }
    } catch (error) {
        console.log(error);
    }
}

//todo -- Listar todos los automoviles ordenados por marca y modelo

const endpoint15 = async (req, res) => {
    try {
        const data = await automoviles.find().sort({ "marca": 1, "modelo": 1 }).toArray();
        res.json(data);
    } catch (error) {
        console.log(error);
    }
}

//todo -- Mostrar la cantidad de automoviles en cada sucursal junto a la dirección

const endpoint16 = async (req, res) => {
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

//todo -- Obtener los alquileres registrados en la base de datos

const endpoint17 = async (req, res) => {
    try {
        const data = await alquileres.find().toArray();
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

//todo -- Mostrar los automóviles con capacidad igual a 5 personas y que estén disponibles.

const endpoint18 = async (req, res) => {
    try {
        const data = await automoviles.aggregate([
            {
                $match: {
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

//todo -- Obtener los datos del cliente que realizó la reserva

const endpoint19 = async (req, res) => {
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

//todo -- Mostrar alquileres con fecha de inicio entre '2023-07-05' y '2023-07-10'

const endpoint20 = async (req, res) => {
    try {
        const data = await alquileres.find({ fechaInicio: { $gt: "2023-07-05", $lt: "2023-07-10" } }).toArray();
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

//! -- Exportacion de todos los endpoints y CRUDS

export {

    endpoint1, endpoint2, endpoint3, endpoint4, endpoint5, endpoint6, endpoint7, endpoint8, endpoint9, endpoint10, endpoint11, endpoint12, endpoint13, endpoint14, endpoint15, endpoint16, endpoint17, endpoint18, endpoint19, endpoint20,

    //* CRUD COLECCION ALQUILERES

    getAlquileres, getOneAlquileres, postAlquileres, deleteAlquileres, updateAlquileres,

    //* CRUD COLECCION AUTOMOVILES

    getAutomoviles, getOneAutomoviles, postAutomoviles, deleteAutomoviles, updateAutomoviles,

    //* CRUD COLECCION CLIENTES

    getClientes, getOneClientes, postClientes, deleteClientes, updateClientes,

    //* CRUD COLECCION EMPLEADOS

    getEmpleados, getOneEmpleados, postEmpleados, deleteEmpleados, updateEmpleados,

    //* CRUD COLECCION SUCURSAL 

    getSucursal, getOneSucursal, postSucursal, deleteSucursal, updateSucursal,

}