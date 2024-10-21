import UserService from "../services/UserService.js";
import AuthService from "../services/AuthService.js";
import { handleResponse } from "../utils/response.js";
import { STATUS_CODES } from "../constants/status.js";
import { AUTH_MESSAGES } from "../constants/messageES.js";

class UserController {
  createUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const { success, data, error } = await UserService.createUser({
      firstName,
      lastName,
      email,
      password,
    });

    handleResponse(res, success, data, error);
  };

  readUsers = async (req, res) => {
    const { success, data, error } = await UserService.findAllUsers();
    handleResponse(res, success, data, error);
  };

  updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    const { success, message, error } = await UserService.updateUser(id, {
      firstName,
      lastName,
      email
    });

    handleResponse(res, success, message, error);
  };

  deleteUser = async (req, res) => {
    const { id } = req.params;
    const { success, message, error } = await UserService.deleteUser(id);
    handleResponse(res, success, message, error);
  };

  login = async (req, res) => {
    const { email, password } = req.body;
    const { success, token, error } = await AuthService.login(email, password);
    if (success) {
      res.cookie("token", token);
      res.status(STATUS_CODES.OK).send({
        success: true,
        message: AUTH_MESSAGES.LOGIN_SUCCESS,
        token
      });
    } else {
      res.status(STATUS_CODES.BAD_REQUEST).send({ success: false, message: error.message });
    }
  };

  logout = (req, res) => {
    try {
      res.clearCookie("token");
      res.status(STATUS_CODES.OK).send({
        success: true,
        message: AUTH_MESSAGES.LOGOUT_SUCCES,
      });
    } catch (error) {
      res.status(STATUS_CODES.BAD_REQUEST).send({ success: false, message: error.message });
    }
  };
}

export default UserController;
