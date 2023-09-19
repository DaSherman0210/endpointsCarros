import express from "express";
import { obtenerJWT } from "../helper/JWT.js"
import { endpoint1, endpoint10, endpoint11, endpoint12, endpoint13, endpoint14, endpoint15, endpoint16, endpoint17, endpoint18, endpoint19, endpoint2, endpoint20, endpoint3, endpoint4, endpoint5, endpoint6, endpoint7, endpoint8, endpoint9 } from "../controllers/main.controller.js";

const router = express.Router();

router.get("/jwt/:id/:nombre", obtenerJWT);
router.get("/endpoint1" , endpoint1);
router.get("/endpoint2" , endpoint2);
router.get("/endpoint3" , endpoint3);
router.get("/endpoint4" , endpoint4);
router.get("/endpoint5/:id" , endpoint5);
router.get("/endpoint6" , endpoint6);
router.get("/endpoint7" , endpoint7);
router.get("/endpoint8/:id" , endpoint8);
router.get("/endpoint9/:dni" , endpoint9);
router.get("/endpoint10" , endpoint10);
router.get("/endpoint11" , endpoint11);
router.get("/endpoint12/:id" , endpoint12);
router.get("/endpoint13" , endpoint13);
router.get("/endpoint14" , endpoint14);
router.get("/endpoint15" , endpoint15);
router.get("/endpoint16" , endpoint16);
router.get("/endpoint17" , endpoint17);
router.get("/endpoint18" , endpoint18);
router.get("/endpoint19" , endpoint19);
router.get("/endpoint20" , endpoint20);


export default router;