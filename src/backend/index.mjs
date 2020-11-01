import Koa from "koa";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";
import jwt from "koa-jwt";
import cors from "@koa/cors";

import Debug from "debug";
import Objection from "objection";
const { Model } = Objection;

import secrets from "./util/secrets.mjs";
import publicRouter from "./routes/public.mjs";
import authRouter from "./routes/auth.mjs";
import deckRouter from "./routes/deck.mjs";

import errorMiddleware from "./routes/middlewares/errors.mjs";

import knex from "./db/knex.mjs";

// Define constant (global) value for standard deck size.
global.DECK_SIZE = 52;

Model.knex(knex);

const app = new Koa();
const debug = Debug("main");

/* Middlewares */
app
  .use(errorMiddleware)
  .use(bodyParser())
  .use(logger())
  .use(cors())
  .use(
    jwt({ secret: secrets.read("jwt") }).unless({
      path: [/^\/public/, /^\/auth/],
    })
  );

/* Attach routes */
app.use(publicRouter.routes());
app.use(publicRouter.allowedMethods());

app.use(authRouter.routes());
app.use(authRouter.allowedMethods());

app.use(deckRouter.routes());
app.use(deckRouter.allowedMethods());

// Log all errors
app.on("error", console.error);

/* Attach app to port */
app.listen(process.env.PORT || 3000, () => {
  debug("Backend started.");
});
