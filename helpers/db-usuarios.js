import Usuario from "../models/user.js"


const usuarioHelpers = {
    existeUsuarioById: async (id) => {
        const existe = await Usuario.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },


    existeEmail: async (email,req) => {
        if(email){

            if (!isEmailValid(email)) throw new Error(`No parece ser un email válido ${email}` );

            const existe = await Usuario.findOne({ email });

            if (req.method === "PUT") {
                if (existe && existe._id != req.params.id) {
                    throw new Error(`El email ya está registrado`)
                }
            } else {
                if (existe) {
                   throw new Error(`El email ya está registrado`)
                }
            }
        }
    },
    existeAlias:async (alias,req) => {
        if(alias) {
            const existe = await Usuario.findOne({ alias });
            if (req.method === "PUT") {
                if (existe && existe._id != req.params.id) {
                    throw new Error(`El email ya está registrado`)
                }
            } else {
                if (existe) {
                   throw new Error(`El email ya está registrado`)
                }
            }
        }
    }
}

function isEmailValid(email) {
    var emailRegex = /^[-!#$%&"*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&"*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!email)
        return false;

    if (email.length > 254)
        return false;

    var valid = emailRegex.test(email);
    if (!valid)
        return false;

    // Further checking of some things regex can"t handle
    var parts = email.split("@");
    if (parts[0].length > 64)
        return false;

    var domainParts = parts[1].split(".");
    if (domainParts.some(function (part) { return part.length > 63; }))
        return false;

    return true;
}


export {
    usuarioHelpers
}