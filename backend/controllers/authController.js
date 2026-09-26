const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const login = async (req, res) => {
  const { name, password } = req.body;
    try {
      const usuario = await Usuario.findOne({ name });
      if (!usuario) {
          return res.status(400).json({ message: 'Usuario no encontrado' });
      }

      const isMatch = await bcrypt.compare(password, usuario.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Contraseña incorrecta' });
      }

      const token = jwt.sign({ id: usuario._id, role: usuario.role }, 'secret', { expiresIn: '1h' });
      res.json({ token });
    } catch(error) {
      console.log(error);
      res.status(500).json({
        message: 'Server error',
        error: error.message
      });
    }
}

const register = async (req, res) => {
  try {
    const { name, password, role } = req.body;
    const usuario = await Usuario.findOne({ name });
    if (usuario) {
        return res.status(400).json({ message: 'Usuario ya existe' });
    }

    const newUsuario = new Usuario({ name, password, role });
    await newUsuario.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch(error) {
    console.log(error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    })
  }
}

module.exports = { login, register };