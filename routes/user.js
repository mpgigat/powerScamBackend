import { Router } from "express";
import {check} from "express-validator";
import {usuarioController} from "../controllers/user.js";
import {usuarioHelpers} from "../helpers/db-usuarios.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router= Router();

router.get("/",[
    validarJWT,    
    validarCampos
],usuarioController.usuarioGet)

router.get("/:id",[
    validarJWT,
    check("id","No es un ID válido").isMongoId(),
    check("id").custom(usuarioHelpers.existeUsuarioById),
    validarCampos
],usuarioController.usuarioGetById )

router.post("/",[
    check("alias", "El Alias es obligatorio!").not().isEmpty(),
    check("password", "El password debe de ser más de 6 letras").isLength({ min: 6 }),
    check("email", "El correo no es válido").isEmail(),
    check("email").custom(usuarioHelpers.existeEmail),  
    check("alias").custom(usuarioHelpers.existeAlias),  
    validarCampos       
],usuarioController.usuarioPost)

router.put("/deactivate/:id",[
    validarJWT,
    check("id","No es un ID válido").isMongoId(),
    check("id").custom(usuarioHelpers.existeUsuarioById),
    validarCampos  
],usuarioController.usuarioPutDeactivate)

router.put("/activate/:id",[
    validarJWT,
    check("id","No es un ID válido").isMongoId(),
    check("id").custom(usuarioHelpers.existeUsuarioById),
    validarCampos 
],usuarioController.usuarioPutActivate)

router.put("/cambiopassword/:id",[
    validarJWT,
    check("id","No es un ID válido").isMongoId(),
    check("id").custom(usuarioHelpers.existeUsuarioById),
    check("password", "El password debe de ser más de 6 letras").isLength({ min: 6 }),
    validarCampos 
],usuarioController.cambiopassword)

router.delete("/:id",[
    validarJWT,
    check("id","No es un ID válido").isMongoId(),
    check("id").custom(usuarioHelpers.existeUsuarioById),
    validarCampos 
],usuarioController.usuarioDelete)

router.post('/login', [
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],   usuarioController.login);

export default router