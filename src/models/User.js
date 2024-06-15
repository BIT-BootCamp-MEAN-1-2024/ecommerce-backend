const { Schema, model } = require( 'mongoose' );

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    /** Puede ser: correo, # identificacion, alias */
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // WP: Admin, Editor, Publisher, Collaborator, Register
    role: {
        type: String,
        required: true,
        default: 'registered'
    }
},{
    timestamps: true
});

const UserModel = model( 'Users', UserSchema );


module.exports = UserModel;