import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import json from "koa-json";

const app = new Koa();
const router = new Router();

// Ping
router.get("/ping", async (ctx, next) => {
    ctx.body = { msg: "pong" };

    await next();
});

router.post("/deck", async (ctx, next) => {
    // TODO: Create new deck

    ctx.body = { msg: "deck post" };

    await next();
});

router.get("/deck/:id", async (ctx, next) => {
    // TODO: Get info of a deck
    const { id: deckId } = ctx.params;

    ctx.body = { msg: deckId };
    
    await next();
});

router.delete("/deck/:id", async (ctx, next) => {
    // TODO: Delete a deck
    const { id: deckId } = ctx.params;

    await next();
});

router.put("/deck/:id/shuffle", async (ctx, next) => {
    // TODO: Shuffle the cards in deck
    const { id: deckId } = ctx.params;
    
    await next();
});

router.put("/deck/:id/deal/:n", async (ctx, next) => {
    // TODO: Deal n-cards from deck
    const { id: deckId, n } = ctx.params; 
    
    ctx.body = { msg: `id is ${deckId} and for ${n} cards.`}

    await next();
});

// Middlewares
app.use(json());
app.use(logger());

// Attach routes
app.use(router.routes())
    .use(router.allowedMethods());

app.listen((process.env.PORT || 3000), () => {
    console.log("Backend started.");
});
