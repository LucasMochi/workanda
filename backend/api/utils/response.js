import { STATUS_CODES } from "../constants/status.js";

export const handleResponse = (res, success, data = null, error = null) => {
  if (success) {
    res.status(STATUS_CODES.OK).send({
      success: true,
      data,
    });
  } else {
    res.status(STATUS_CODES.BAD_REQUEST).send({
      success: false,
      message: error,
    });
  }
};
