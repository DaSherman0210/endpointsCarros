import dotenv from "dotenv";
import express from "express";
import router from "./src/routes/main.routes.js"
import routerAuth from "./src/routes/auth.routes.js";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./swaggerConfig.js";

const app = express();

dotenv.config();

app.use(express.json());

app.use("/", router);
app.use("/auth", routerAuth);
app.use("/documentation", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const port = process.env.PORT8327;

app.listen(port, ()=>{
    console.log(`El server esta corriendo en el puerto ${port}`);
})