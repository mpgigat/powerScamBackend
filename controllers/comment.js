import Comment from "../models/comment.js"


const commentController={
    commentGet : async (req, res)=>{
        const query=req.query.value;
        const comment = await Comment.find();

        res.json({
            comment
        })
    },
    commentGetById : async (req, res)=>{
    
        const {id}=req.params;

        const comment = await Comment.findOne({_id:id});

        res.json({
            comment
        })
    },
    commentPost:async(req,res)=>{
        const {user,scammer,comment}=req.body;

        const commentE = new Comment({user,scammer,comment});
        
        await commentE.save()

        res.json({
            comment:commentE
        })

    },
   
}
export {
    commentController
}