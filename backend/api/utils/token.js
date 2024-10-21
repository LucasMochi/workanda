import jwt from "jsonwebtoken"

export const generateToken = (payload) => {
    const token = jwt.sign({ payload }, "crud", {expiresIn:"2d"});
    return token;
  };
  
export const verifyToken = (token) => {
    const tokenverify = jwt.verify(token, "crud");
    return tokenverify;
};