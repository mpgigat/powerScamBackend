import mongoose from "mongoose";

const UsuariosSchema=mongoose.Schema({
    alias:{type:String, unique:true,maxlength:50,required:true},
    email:{type:String,unique:true,maxlength:50,required:true},
    rol:{type:String,maxlength:50,default:"USER_ROLE"},
    password:{type:String,required:false},
    estado:{type:Number,default:1},
    createdAt: { type: Date, default: Date.now }
})

UsuariosSchema.methods.toJSON=function(){
    const {__v, ...usuario}=this.toObject(); //nos funciona flecha
    return usuario;
}

export default mongoose.model("User",UsuariosSchema);