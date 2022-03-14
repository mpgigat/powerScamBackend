import mongoose from "mongoose";

const NickNameSchema=mongoose.Schema({
    scammer:{type:mongoose.Schema.Types.ObjectId,ref:'Scammer',required:true,    },
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,    },
    name:{type:String, unique:true,maxlength:50,required:true},
    platform:{type:String,maxlength:50,required:true},    

    createdAt: { type: Date, default: Date.now }
})

NickNameSchema.methods.toJSON=function(){
    const {__v, ...nickName}=this.toObject(); //nos funciona flecha
    return nickName;
}

export default mongoose.model("NickName",NickNameSchema);