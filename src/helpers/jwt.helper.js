const { sign } = require("jsonwebtoken");


const generateToken = ( payload ) => {
    return sign(
        payload,                    // Payload (Carga Util)
        process.env.JWT_SEED,       // PALABRA-CLAVE (Semilla)
        { expiresIn: '1h' }         // Configuracion (expiracion del token)
    );
}


module.exports = {
    generateToken
};