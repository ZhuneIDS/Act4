const User = require('../models/User'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Registro de usuario
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cifrar la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear y guardar un nuevo usuario
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};

// Inicio de sesión
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Solicitud de inicio de sesión recibida:', { email, password });

    // Verificar si el usuario existe en la base de datos
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Usuario no encontrado:', email);
      return res.status(400).json({ message: 'Credenciales inválidas.' });
    }

    console.log('Usuario encontrado:', user);

    // Comparar la contraseña ingresada con la almacenada
    if (password !== user.password) {
      console.log('Contraseña incorrecta para el usuario:', email);
      return res.status(400).json({ message: 'Credenciales inválidas.' });
    }

    console.log('Contraseña correcta para el usuario:', email);

    // Generar un token de autenticación
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log('Token generado para el usuario:', email);

    res.json({ token });
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión.', error });
  }
};
