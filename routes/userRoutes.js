import express from "express";
import { register } from "../controllers/userController";

const router = express.Router();

//Autenticacion, Registro y Confirmacion de usuario
router.post("/", register);//Registro de usuario
router.post("/login", login);




export default router;
