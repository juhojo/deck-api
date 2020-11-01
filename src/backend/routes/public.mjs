import Router from "koa-router";

const router = new Router();

router.get("/public/author", async (ctx, next) => {
  ctx.body = {
    firstName: "Juho",
    lastName: "Jokela",
    github: "@juhojo",
  };

  await next();
});

export default router;
