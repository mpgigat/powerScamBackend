import { Router } from "express";
import {check} from "express-validator";
import { commentController } from "../controllers/comment.js";
import { scammersHelpers } from "../helpers/db-scammers.js";
import {usuarioHelpers} from "../helpers/db-usuarios.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router= Router();

router.get("/",[
    validarJWT,    
    validarCampos
],commentController.commentGet)

router.get("/:id",[
    validarJWT,
    check("id","No es un ID válido").isMongoId(),
    check("id").custom(usuarioHelpers.existeUsuarioById),
    validarCampos
],commentController.commentGetById )

router.post("/",[
    check("user", "El usuario es obligatorio!").not().isEmpty(),
    check("scammer", "El estafador es obligatorio!").not().isEmpty(),
    check("comment", "El comentario es obligatorio!").not().isEmpty(),
    check("user","No es un ID válido").isMongoId(),
    check("scammer","No es un ID válido").isMongoId(),   
    check("user").custom(usuarioHelpers.existeUsuarioById),
    check("scammer").custom(scammersHelpers.existeScammerById),
    validarCampos       
],commentController.commentPost)


export default router