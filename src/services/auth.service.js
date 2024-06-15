const { genSaltSync, hashSync } = require('bcrypt');
const UserModel = require("../models/User");

/** TODO: TryCatch para las consultas de DB */
/** TODO: /home/jcarlosj/Learning/bit/bit-ecommerce/ecommerce-backend/src/controllers/auth.controller.js:52
        userFound.password      // Password encriptado que viene de la DB 
*/

function registerUser( newUser ) {
    // 1. Paso: Preguntar si el usuario existe o no
    const dbUser = new UserModel( newUser );        // Contra la DB

    // 2. Paso: Encriptar la contraseña
    const salt = genSaltSync();
    dbUser.password = hashSync( newUser.password, salt );

    // 3. Paso: Guardar en la base de datos
    dbUser.save();
}

async function verifyUserExists( username ) {
    return await UserModel.findOne({ username });     // Contra la DB
}


module.exports = {
    registerUser,
    verifyUserExists
};
