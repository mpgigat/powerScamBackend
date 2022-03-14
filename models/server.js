import  express from "express"
import cors from "cors"
import {dbConnection} from "../database/config.js";


//rutas
import usuario  from "../routes/user.js" ;
import scammer from "../routes/scammer.js"
import nickName from "../routes/nickname.js"
import comment  from "../routes/comment.js"


class Server{
    constructor(){
        this.app=express();
        this.port=process.env.PORT;
        
        //conectar a bd
        this.conectarDB();

        //midlewares //agregan funcionalidad// se ejecutan al iniciar el servidor
        this.middlewares();

        //ruts de la app
        this.routes();
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        this.app.use(cors());
        
        //parseo y lectura del body
        this.app.use(express.json());

        this.app.use(express.static("public"));        

        this.app.use((err, req, res, next) => {
            if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
                //console.error(err);
                return res.status(400).send({ status: 404, message: err.message }); // Bad request
            }
            next();
        });
       
    } 


    routes(){        
        this.app.use("/api/usuario",    usuario);
        this.app.use("/api/scammer",    scammer);
        this.app.use("/api/nickname",    nickName);
        this.app.use("/api/comment",    comment);

      
    }

    listen(){
        this.app.listen(this.port ,()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}
 
//module.exports=Server;
export {Server}