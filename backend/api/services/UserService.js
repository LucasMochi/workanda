import User from "../models/User.js";
import { USER_MESSAGES } from "../constants/messageES.js";

class UserService {
  async createUser(data) {
    try {
      const user = await User.create(data);
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async findAllUsers() {
    try {
      const users = await User.findAll();
      return { success: true, data: users };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updateUser(id, data) {
    try {
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return { success: false, error: USER_MESSAGES.USER_NOT_FOUND };
      }
      await User.update(data, { where: { id } });
      return { success: true, message: USER_MESSAGES.USER_UPDATE };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async deleteUser(id) {
    try {
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return { success: false, error: USER_MESSAGES.USER_NOT_FOUND };
      }
      await User.destroy({ where: { id } });
      return { success: true, message: USER_MESSAGES.USER_DELETE };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export default new UserService();
