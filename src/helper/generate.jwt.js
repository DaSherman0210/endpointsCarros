import Jwt from "jsonwebtoken";

const generateJWT = (uid = '') =>{
    return new Promise((resolve,reject)=>{
        const payload = {uid};
        console.log(payload);
        Jwt.sign(payload,process.env.JWT_PRIVATE_KEY, {
            expiresIn: "4h"
        }, (err, token)=>{
            if (err) {
                reject("Problemas al generar el json web token (JWT)")
            }else{
                resolve (token)
            } 
        })
    })
}

export default generateJWT