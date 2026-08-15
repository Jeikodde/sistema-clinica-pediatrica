const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { nombreUsuario, contrasena, role } = req.body;
    const usuario = await Usuario.findOne({ nombreUsuario });
    if (usuario) {
        return res.status(400).json({ message: 'Usuario ya existe' });
    }

    const newUsuario = new Usuario({ nombreUsuario, contrasena, role });
    await newUsuario.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
});

// Login user
router.post('/login', async (req, res) => {
    const { nombreUsuario, contrasena } = req.body;
    const usuario = await Usuario.findOne({ nombreUsuario });
    if (!usuario) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!isMatch) {
        return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: usuario._id, role: usuario.role }, 'secret', { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;