const UserModel = require("../models/User");
const { registerUser, verifyUserExists } = require("../services/auth.service");

const register = async ( req, res ) => {
    // 1. Paso: Obtener los datos a registrar (usuario)
    const userData = req.body;

    // 2. Paso: Verificar si el usuario existe DB ---> email
    const userFound = await verifyUserExists( userData.username );

    if( userFound ) {
        res.json({
            ok: false,
            msg: 'El usuario ya existe'
        });
    }

    // 3. Paso: Si no existe el usuario registra el mismo 
    registerUser( userData );

    // -. Paso: Generar el TOKEN (Opcional)
    // 4. Paso: Responder al cliente, si el usuario a sido o no registrado (Opcional enviar el TOKEN)
    res.json({
        ok: true,
        msg: 'Usuario registrado exitosamente!'
    });

}

const login = ( req, res ) => {
    res.json({ msg: 'Autentica un usuario' });
}

const renewToken = ( req, res ) => {
    res.json({ msg: 'Renovar el token' });
}


module.exports = {
    register,
    login,
    renewToken
};