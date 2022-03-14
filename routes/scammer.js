import { Router } from "express";
import {check} from "express-validator";
import { scammerController } from "../controllers/scammer.js";
import { nicknamesHelpers } from "../helpers/db-nicknames.js";
import { scammersHelpers } from "../helpers/db-scammers.js";
import {usuarioHelpers} from "../helpers/db-usuarios.js";

import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router= Router();

router.get("/",scammerController.scammerGet)

router.get("/:id",[
    check("id","No es un ID válido").isMongoId(),
    check("id").custom(scammersHelpers.existeScammerById),
    validarCampos
],scammerController.scammerGetById)

router.post("/",[
    check('user','El usuario obligatorio').not().isEmpty(),
    check("user","No es un ID válido").isMongoId(),
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('platform','La plataforma es obligatoria').not().isEmpty(),
    check('complaint','La queja es obligatoria').not().isEmpty(),
    check("user").custom(usuarioHelpers.existeUsuarioById),
    check("name").custom(scammersHelpers.existeName),
    check("name").custom(nicknamesHelpers.existeName),
    validarCampos       
],scammerController.scammerPost)


export default router