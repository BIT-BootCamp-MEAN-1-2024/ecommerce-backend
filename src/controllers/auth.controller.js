const { compareSync } = require("bcrypt");
var jwt = require('jsonwebtoken');

const { registerUser, verifyUserExists } = require("../services/auth.service");

const UserModel = require("../models/User");
const { generateToken } = require("../helpers/jwt.helper");

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

const login = async ( req, res ) => {
    // 1. Paso: Obtener los datos del usuario { username, password }
    const userData = req.body;

    // 2. Paso: Verificar si el usuario existe DB ---> email
    const userFound = await verifyUserExists( userData.username );

    if( ! userFound ) {
        res.json({
            ok: false,
            msg: 'El usuario no existe! Por favor registrese'
        });
    }

    // 3. Paso: Confirmar si la contraseña es correcta
    const isValidPassword = compareSync( 
        userData.password,      // Password sin encriptar que viene del formulario
        userFound.password      // Password encriptado que viene de la DB
    );

    if( ! isValidPassword ) {
        res.json({
            ok: false,
            msg: 'Contraseña invalida'
        });
    }

    const payload = {
        name: userData.name,
        username: userData.username,
        role: userData.role
    };

    // 4. Paso: Generar una autenticacion pasiva (TOKEN)
    const token = generateToken( payload );

    // 5. Paso: Responder al cliente enviandole el TOKEN 
    res.json({
        ok: true,
        token
    });
}

const renewToken = ( req, res ) => {
    res.json({ msg: 'Renovar el token' });
}


module.exports = {
    register,
    login,
    renewToken
};