import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import secrets from "../../util/secrets.mjs";
import User from "../../models/User.mjs";

const credentialsError = () => {
  const err = new Error("Invalid credentials.");
  err.status = 401;
  throw err;
};

const authenticate = async (ctx) => {
  try {
    const users = await User.query()
      .select("username", "hash")
      .where("username", "=", ctx.request.body.username);

    // If there are no users with the provided username
    if (!users[0]) {
      credentialsError();
    }

    const match = await bcrypt.compare(
      ctx.request.body.password,
      users[0].hash
    );

    // If the password doesn't match the one in the database
    if (!match) {
      credentialsError();
    }

    const token = jwt.sign(
      { role: "user", username: ctx.request.body.username },
      secrets.read("jwt"),
      {
        expiresIn: "30 days",
      }
    );

    ctx.status = 200;
    ctx.body = {
      payload: {
        token,
      },
    };
    console.log(`User "${ctx.request.body.username}" has logged in.`);
  } catch (err) {
    ctx.throw(err.status, err.message);
  }

  return ctx;
};

export default authenticate;
