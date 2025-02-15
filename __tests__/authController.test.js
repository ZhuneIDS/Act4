const authController = require('../src/controllers/authController');
const User = require('../src/models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Simulación del modelo User para evitar consultas reales a la base de datos
jest.mock('../src/models/User');

describe('Auth Controller', () => {
  describe('login', () => {
    it('should return a token when login is successful', async () => {
      // Simulación de usuario encontrado en la base de datos
      User.findOne.mockResolvedValue({
        email: 'test@gmail.com',
        password: '12345',
      });

      // Simulación de comparación de contraseñas con bcrypt
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      // Simulación de generación de token con jwt
      jest.spyOn(jwt, 'sign').mockReturnValue('mocked-token');

      const req = {
        body: {
          email: 'test@gmail.com',
          password: '12345',
        },
      };

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await authController.login(req, res);

      expect(res.json).toHaveBeenCalledWith({ token: 'mocked-token' });
    });

    it('should return an error when user is not found', async () => {
      // Simulación de usuario no encontrado
      User.findOne.mockResolvedValue(null);

      const req = {
        body: {
          email: 'test@gmail.com',
          password: '12345',
        },
      };

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials.' });
    });
  });
});
