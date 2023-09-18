import express from "express";
import { obtenerJWT } from "../helper/JWT.js"
import { endpoint1, endpoint2, endpoint3, endpoint4, endpoint5 } from "../controllers/main.controller.js";

const router = express.Router();

router.get("/jwt/:id/:nombre", obtenerJWT);
router.get("/endpoint1" , endpoint1);
router.get("/endpoint2" , endpoint2);
router.get("/endpoint3" , endpoint3);
router.get("/endpoint4" , endpoint4);
router.get("/endpoint5/:id" , endpoint5);

export default router;