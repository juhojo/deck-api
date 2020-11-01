import Objection from "objection";
const { Model } = Objection;

import Card from "./Card.mjs";

class Deck extends Model {
  static get tableName() {
    return "decks";
  }

  static relationMappings = {
    cards: {
      relation: Model.HasManyRelation,
      modelClass: Card,
      join: {
        from: "decks.id",
        to: "cards.deckId",
      },
    },
  };
}

export default Deck;
