import Scammer from "../models/scammer.js"

const scammerController={
    scammerGet : async (req, res)=>{
        const query=req.query.value;
        const scammer = await Scammer.find(            
            {$or:[
                {name:new RegExp(query,"i")},
                {platform:new RegExp(query,"i")}
            ]}
        ).populate("user", "alias");

        res.json({
            scammer
        })
    },
    scammerGetById : async (req, res)=>{
    
        const {id}=req.params;

        const scammer = await Scammer.findOne({_id:id});

        res.json({
            scammer
        })
    },
    scammerPost:async(req,res)=>{
        const {user,name,platform,complaint}=req.body;

        const scammer = new Scammer({user,name,platform,complaint});
        
        await scammer.save()

        res.json({
            scammer
        })

    },

}
export {
    scammerController
}