import Nickname from "../models/nickname.js"

const nicknameController={
    nicknameGet : async (req, res)=>{
        const query=req.query.value;
        const nickname = await Nickname.find(            
            {$or:[
                {name:new RegExp(query,"i")},
                {platform:new RegExp(query,"i")}
            ]}
        ).populate("user", "alias")
        .populate("scammer", "name")
        ;

        res.json({
            nickname
        })
    },
    nicknameGetById : async (req, res)=>{
    
        const {id}=req.params;

        const nickname = await Nickname.findOne({_id:id});

        res.json({
            nickname
        })
    },
    nicknamePost:async(req,res)=>{
        const {id}=req.params;
        const {scammer,user,name,platform}=req.body;

        const nickname = new Nickname({scammer,user,name,platform});
        
        await nickname.save()

        res.json({
            nickname
        })

    },
   
}
export {
    nicknameController
}