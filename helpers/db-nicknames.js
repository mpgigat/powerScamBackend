import Nickname from "../models/nickname.js"


const nicknamesHelpers = {
    existeNicknameById: async (id) => {
        const existe = await Nickname.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },
    existeName:async (name,req) => {
        if(name) {
            const existe = await Nickname.findOne({ name });
            if (req.method === "PUT") {
                if (existe && existe._id != req.params.id) {
                    throw new Error(`El alias ya está registrado`)
                }
            } else {
                if (existe) {
                    throw new Error(`El alias ya está registrado`)
                }
            }
        }
    },
}



export {
    nicknamesHelpers
}