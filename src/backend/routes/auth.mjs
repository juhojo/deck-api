import Router from "koa-router";
import bcrypt from "bcryptjs";

import User from "../models/User.mjs";
import authenticate from "./middlewares/authenticate.mjs";

const router = new Router();

router.post("/auth/signin", async (ctx, next) => {
  ctx = await authenticate(ctx);

  await next();
});

router.post("/auth/signup", async (ctx, next) => {
  console.log(ctx.request.body);
  const hash = bcrypt.hashSync(ctx.request.body.password, 10);
  const newUser = await User.query().insert({
    username: ctx.request.body.username,
    hash: hash,
  });

  ctx.status = 200;
  ctx.body = newUser.publicInfo();

  await next();
});

export default router;
