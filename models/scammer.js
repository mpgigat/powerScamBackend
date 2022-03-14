import mongoose from "mongoose";

const ScamsSchema=mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,    },
    name:{type:String, unique:true,maxlength:50,required:true},
    platform:{type:String,maxlength:50,required:true},    
    complaint:{type:String,required:true},
    associatedImages:[{
        name:{type:String        },
        comment:{type:String      },   
    }],
    rated:{type:Number,default:0},
    state:{type:Number,default:1}, //1: EVALUACION    2:CONFIRMADO

    createdAt: { type: Date, default: Date.now }
})

ScamsSchema.methods.toJSON=function(){
    const {__v, ...scammer}=this.toObject(); //nos funciona flecha
    return scammer;
}

export default mongoose.model("Scammer",ScamsSchema);