import { Router } from "express";
import {check} from "express-validator";
import { nicknameController } from "../controllers/nickname.js";
import { nicknamesHelpers } from "../helpers/db-nicknames.js";
import { scammersHelpers } from "../helpers/db-scammers.js";
import {usuarioHelpers} from "../helpers/db-usuarios.js";

import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";


const router= Router();

router.get("/",[
    validarJWT,    
    validarCampos
],nicknameController.nicknameGet)

router.get("/:id",[
    validarJWT,
    check("id","No es un ID válido").isMongoId(),
    check("id").custom(nicknamesHelpers.existeScammerById),
    validarCampos
],nicknameController.nicknameGetById)

router.post("/",[
    check('scammer','El estafador es obligatorio').not().isEmpty(),
    check("scammer","No es un ID válido").isMongoId(),
    check('user','El usuario es obligatorio').not().isEmpty(),
    check("user","No es un ID válido").isMongoId(),
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('platform','La plataforma es obligatoria').not().isEmpty(),
    check("user").custom(usuarioHelpers.existeUsuarioById),
    check("scammer").custom(scammersHelpers.existeScammerById),
    check("name").custom(scammersHelpers.existeName),
    check("name").custom(nicknamesHelpers.existeName),
    validarCampos       
],nicknameController.nicknamePost) 
 

export default router