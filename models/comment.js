import mongoose from "mongoose";

const CommentsSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Comments', required: true, },
    scammer:{type:mongoose.Schema.Types.ObjectId,ref:'Scammer',required:true,    },
    comment: { type: String, required: true },
    images: [{
        name: { type: String },
    }],
    createdAt: { type: Date, default: Date.now }
})

CommentsSchema.methods.toJSON = function () {
    const { __v, ...comment } = this.toObject(); //nos funciona flecha
    return comment;
}

export default mongoose.model("Comment", CommentsSchema);