import { verifyToken } from "../utils/token.js";
import { STATUS_CODES } from "../constants/status.js"
import { AUTH_MESSAGES } from "../constants/messageES.js";

const auth = (req, res, next) => {
  const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];
  if (!token) {
    return res.status(STATUS_CODES.UNAUTHORIZED).send({ success: false, message: AUTH_MESSAGES.NO_TOKEN });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded.payload;
    next();
  } catch (error) {
    return res.status(STATUS_CODES.UNAUTHORIZED).send({ success: false, message: AUTH_MESSAGES.UNAUTHORIZED });
  }
};

export default auth;
