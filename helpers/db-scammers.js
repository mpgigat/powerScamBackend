import Scammer from "../models/scammer.js"


const scammersHelpers = {
    existeScammerById: async (id) => {
        const existe = await Scammer.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },
    existeName: async (name,req) => {
        if(name){
            const existe = await Scammer.findOne({ name });
            if (req.method === "PUT") {
                if (existe && existe._id != req.params.id) {
                    throw new Error( `El Nombre del estafador ya está registrado` );
                    //throw new Error(`El email ya está registrado`)
                }
            } else {
                if (existe) {
                    throw new Error( `El nombre del estafador ya está registrado` );
                    //throw new Error(`El email ya está registrado`)
                }
            }
           
         
        }
    }, 
}



export {
    scammersHelpers
}