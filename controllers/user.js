import Usuario from "../models/user.js"
import bcryptjs from "bcryptjs"
import { generarJWT } from "../middlewares/validar-jwt.js";


const usuarioController={
    usuarioGet : async (req, res)=>{
        const query=req.query.value;
        const usuario = await Usuario.find(
            //{nombre:new RegExp(query,"i")}
            {$or:[
                {nombre:new RegExp(query,"i")},
                {email:new RegExp(query,"i")}
            ]}
        );

        res.json({
            usuario
        })
    },
    usuarioGetById : async (req, res)=>{
    
        const {id}=req.params;

        const usuario = await Usuario.findOne({_id:id});

        res.json({
            usuario
        })
    },
    usuarioPost:async(req,res)=>{
        const {alias,email,password,rol}=req.body;

        const usuario = new Usuario({alias,email,password,rol});

        const salt=bcryptjs.genSaltSync();
        usuario.password=bcryptjs.hashSync(password,salt)

        await usuario.save()

        res.json({
            usuario
        })

    },
    usuarioPut: async (req, res)=>{
        const {id}=req.params;


        const {_id,email,estado,password,createdAt,...resto}=req.body;

        if(password){
            const salt=bcryptjs.genSaltSync();
            resto.password=bcryptjs.hashSync(password,salt)
        }

        const usuario=await Usuario.findByIdAndUpdate(id,resto);


        res.json({
            usuario
        })
    },
    usuarioPutActivate: async (req, res)=>{    
        const {id}=req.params;

        const usuario=await Usuario.findByIdAndUpdate(id,{estado:1});

        res.json({
            usuario
        })
    },
    usuarioPutDeactivate: async (req, res)=>{
        const {id}=req.params;

        const usuario=await Usuario.findByIdAndUpdate(id,{estado:0});

        res.json({
            usuario
        })
    },
    cambiopassword: async (req, res)=>{
        const {id}=req.params;

        const {password}=req.body;

        if(password){
            const salt=bcryptjs.genSaltSync();
            var newPassword=bcryptjs.hashSync(password,salt)
        }

        const usuario=await Usuario.findByIdAndUpdate(id,{password:newPassword});


        res.json({
            usuario
        })
    },
    usuarioDelete :async (req, res)=>{
    
        const {id}=req.params;

        const usuario = await Usuario.findByIdAndRemove(id);

        res.json({
            usuario
        })
    },
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            //verificar si el email existe
            const usuario = await Usuario.findOne({ email });
            if (!usuario) {
                return res.status(400).json({
                    msg: 'Usuario/ Password no son correctos'
                })
            }
            //si esta activo
            if (usuario.estado===0) {
                return res.status(400).json({
                    msg: 'Usuario/ Password no son correctos'
                })
            }

            //verficar contraseña
            const validPassword=bcryptjs.compareSync(password,usuario.password);
            if(!validPassword){
                return res.status(400).json({
                    msg: 'Usuario/ Password no son correctos'
                })
            }
    
            //generar jwt
            const token=await generarJWT(usuario.id);
    
    
            res.json({
                usuario,
                token
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: 'Hable con el administrador'
            })
        }

    },
}
export {
    usuarioController
}