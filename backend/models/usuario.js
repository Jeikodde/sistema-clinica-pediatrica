const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
    nombreUsuario: {
        type: String,
        required: true,
        unique: true
    },
    contrasena: {
        type: String,
        required: true
    },
    role: {
        type: String, // Admin or User
        required: true
    }
});


// Hash password before saving
usuarioSchema.pre('save', async function(next) {
    if (!this.isModified('contrasena')) return next();

    const salt = await bcrypt.genSalt(10);
    this.contrasena = await bcrypt.hash(this.contrasena, salt);
    next();
});

module.exports = mongoose.model('Usuario', usuarioSchema);