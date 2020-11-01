import jwt from "jsonwebtoken";

const getToken = (ctx) => {
  return ctx.get("Authorization").split(" ")[1];
};

const getDecodedToken = (ctx) => {
  return jwt.decode(getToken(ctx));
};

export { getToken, getDecodedToken };
