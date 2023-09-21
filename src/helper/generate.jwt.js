import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateJWT = (uid = '') =>{
    return new Promise((resolve,reject)=>{
        let payload = {uid};
        Jwt.sign(payload,{foo: 'bar'} , process.env.JWT_PRIVATE_KEY , { algorithm: 'RS256' }, (err, token)=>{
            if (err) {
                reject("Problemas al generar el json web token (JWT)")
            }else{
                resolve (token)
                console.log(payload);
                console.log({uid});
            } 
        })
    })
}

export default generateJWT