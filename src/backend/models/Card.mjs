import Objection from "objection";
const { Model } = Objection;

import SuitRank from "./SuitsRanks.mjs";

class Card extends Model {
  static get tableName() {
    return "cards";
  }

  label = async () => {
    const suitRank = await SuitRank.query().findById(this.value);
    return suitRank.label();
  };

  static get jsonSchema() {
    return {
      type: "object",
      required: ["deckId", "value"],

      properties: {
        id: { type: "integer" },
        deckId: { type: "integer" },
        value: { type: "integer" },
      },
    };
  }
}

export default Card;
