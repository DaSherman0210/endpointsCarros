import dotenv from "dotenv";
import { SignJWT, jwtVerify } from "jose";

dotenv.config();
 
async function obtenerJWT(req, res){
    try {
        let json = {
            id: req.params.id,
            nombre: req.params.nombre
        }

        const encoder = new TextEncoder();
        const jwtConstructor = new SignJWT({json});
        const jwt = await jwtConstructor
        .setProtectedHeader({alg: "HS256", typ: "JWT"})
        .setIssuedAt()
        .setExpirationTime("4h")
        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        res.send({jwt})
    } catch (error) {
        console.log(error);
    }
};

async function authorizationJWT(req,res){
    try {
        const {authorization} = req.headers;
        if (!authorization) { return res.status(401).send({token: ':('})}
        try {
            const encoder = new TextEncoder();
            const jwtData = await jwtVerify(
                authorization,
                encoder.encode(process.env.JWT_PRIVATE_KEY)
            );
            res.send(jwtData)
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
}

export {obtenerJWT,authorizationJWT};