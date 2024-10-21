import User from "../models/User.js";
import { generateToken } from "../utils/token.js";
import { AUTH_MESSAGES } from "../constants/messageES.js";

class AuthService {
  async login(email, password) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error(AUTH_MESSAGES.INVALID_EMAIL);
      }
      const isValidPassword = await user.validatePassword(password);
      if (!isValidPassword) {
        throw new Error(AUTH_MESSAGES.INVALID_PASSWORD);
      }
      const payload = { id: user.id, name: user.firstName };
      const token = generateToken(payload);
      return { success: true, token, message: AUTH_MESSAGES.LOGIN_SUCCESS };
    } catch (error) {
      console.error('Error en el login:', error.message);
      return { success: false, error: error.message };
    }
  }
}

export default new AuthService();