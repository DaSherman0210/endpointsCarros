import dotenv from "dotenv";
import express from "express";
import router from "./src/routes/main.routes.js"

const app = express();

dotenv.config();

app.use("/", router);

const port = process.env.PORT8327;

app.use(express.json());

app.listen(port, ()=>{
    console.log(`El server esta corriendo en el puerto ${port}`);
})