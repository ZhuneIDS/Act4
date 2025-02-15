const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware para analizar solicitudes JSON
app.use(express.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, '../public')));

// Configuración de rutas de la API
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

// Ruta principal que sirve el archivo HTML de la interfaz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Tiempo de espera para seleccionar un servidor
    connectTimeoutMS: 30000, // Tiempo de espera para la conexión
    socketTimeoutMS: 45000, // Tiempo de espera del socket
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => {
        console.error('Error en la conexión a MongoDB:');
        console.error('- Mensaje:', err.message); // Registro del mensaje de error
        console.error('- Razón:', err.reason); // Registro de la razón del error
        console.error('- Código:', err.code); // Registro del código de error
        console.error('- Detalles completos:', err); // Registro del error completo
    });

// Iniciar el servidor en el puerto especificado
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
