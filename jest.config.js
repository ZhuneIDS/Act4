module.exports = {
  testEnvironment: 'node', // Define el entorno de pruebas como Node.js
  testMatch: ['**/__tests__/**/*.test.js'], // Especifica la ubicación de los archivos de prueba dentro de __tests__
  verbose: true, // Activa la salida detallada de las pruebas en la consola
  collectCoverage: true, // Habilita la recopilación de métricas de cobertura de código
  coverageDirectory: 'coverage', // Especifica la carpeta donde se almacenará el informe de cobertura
};
