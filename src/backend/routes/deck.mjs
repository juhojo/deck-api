import Router from "koa-router";
import _ from "lodash";

import Card from "../models/Card.mjs";
import Deck from "../models/Deck.mjs";
import User from "../models/User.mjs";
import SuitRank from "../models/SuitsRanks.mjs";
import { getDecodedToken } from "../util/tokens.mjs";
import authorizationMiddleware from "./middlewares/authorization.mjs";

const router = new Router();

const cardsWithLabels = async (cards) =>
  await Promise.all(
    cards.map(async (card) => {
      const label = await card.label();
      return {
        ...card,
        label: await card.label(),
      };
    })
  );

/**
 * query parameters:
 *  jokers - A number indicating the number of jokers in the new deck (or 0).
 */
router.post("/api/deck", async (ctx, next) => {
  const decodedToken = getDecodedToken(ctx);

  const owner = await User.query()
    .findOne({
      username: decodedToken.username,
    })
    .column("id");

  const newDeck = await Deck.query().insert({
    shuffled: false,
    owner: owner.id,
  });

  let suitRanks = await SuitRank.query();

  if (!ctx.query.jokers) {
    suitRanks = suitRanks.filter((suitRank) => suitRank.suitId !== 1);
  } else if (ctx.query.jokers > 1) {
    // Typically there are two jokers in a deck but because
    // each joker has the same description (rank / suit)
    // n-copies of a joker are added to the deck.
    const jokers = await SuitRank.query().where("suitId", 1);

    for (let i = 1; i < ctx.query.jokers; i++) {
      suitRanks.push(jokers[0]);
    }
  }

  suitRanks.forEach(async (suitRank) => {
    await Card.query().insert({
      deckId: newDeck.id,
      value: suitRank.id,
    });
  });

  ctx.status = 201;
  ctx.body = newDeck;

  await next();
});

router.get("/api/deck/:id", async (ctx, next) => {
  const existingDeck = await Deck.query().findById(ctx.params.id);

  if (!existingDeck) {
    ctx.status = 404;
  } else {
    ctx.status = 200;
    ctx.body = existingDeck;
  }

  await next();
});

/**
 * query parameters:
 *  withLabels - A boolean indicating if the labels of the cards should
 *               be included in the response.
 */
router.get("/api/deck/:id/cards", async (ctx, next) => {
  const existingDeck = await Deck.query().findById(ctx.params.id);

  if (!existingDeck) {
    ctx.status = 404;
  } else {
    ctx.status = 200;
    let cards = await existingDeck.$relatedQuery("cards").orderBy("value");

    if (ctx.query.withLabels) {
      cards = await cardsWithLabels(cards);
    }

    existingDeck.cards = cards;
    ctx.body = existingDeck;
  }

  await next();
});

router.delete("/api/deck/:id", authorizationMiddleware, async (ctx, next) => {
  await Deck.query().deleteById(ctx.params.id);
  ctx.status = 204;

  await next();
});

router.put(
  "/api/deck/:id/shuffle",
  authorizationMiddleware,
  async (ctx, next) => {
    await Deck.query().findById(ctx.params.id).patch({
      shuffled: true,
    });
    ctx.status = 204;

    await next();
  }
);

/**
 * query parameters:
 *  withLabels - A boolean indicating if the labels of the cards should
 *               be included in the response.
 */
router.put(
  "/api/deck/:id/deal/:n",
  authorizationMiddleware,
  async (ctx, next) => {
    const { n, id } = ctx.params;

    const existingDeck = await Deck.query().findById(id);
    let cardsInDeck = await Card.query().where("deckId", id);

    if (parseInt(n) > cardsInDeck.length || parseInt(n) < 0) {
      ctx.status = 406;
    } else {
      if (ctx.query.withLabels) {
        cardsInDeck = await cardsWithLabels(cardsInDeck);
      }

      let removables = _.slice(cardsInDeck, 0, n);

      if (existingDeck.shuffled) {
        removables = _.sampleSize(cardsInDeck, n);
      }

      removables.forEach(async (card) => {
        await Card.query().deleteById(card.id);
      });

      ctx.status = 200;
      ctx.body = removables;
    }

    await next();
  }
);

export default router;
