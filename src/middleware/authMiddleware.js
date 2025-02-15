const jwt = require('jsonwebtoken');

// Middleware para verificar la autenticación mediante token JWT
const authMiddleware = (req, res, next) => {
    console.log("Middleware de autenticación ejecutado");
    
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Agrega la información del usuario a la solicitud
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token inválido.' });
    }
};

module.exports = authMiddleware;