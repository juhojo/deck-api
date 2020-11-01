import Deck from "../../models/Deck.mjs";
import User from "../../models/User.mjs";
import { getDecodedToken } from "../../util/tokens.mjs";

const forbiddenError = () => {
  const err = new Error("Forbidden.");
  err.status = 403;
  throw err;
};

const authorizationMiddleware = async (ctx, next) => {
  const decodedToken = getDecodedToken(ctx);
  const owner = await User.query()
    .findOne({
      username: decodedToken.username,
    })
    .column("id");
  const deck = await Deck.query().findOne({
    id: ctx.params.id,
    owner: owner.id,
  });

  if (!deck) {
    forbiddenError();
  }

  await next();
};

export default authorizationMiddleware;
