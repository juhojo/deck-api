import Objection from "objection";
const { Model } = Objection;

import Suit from "./Suit.mjs";
import Rank from "./Rank.mjs";

class SuitRank extends Model {
  static get tableName() {
    return "suits_ranks";
  }

  label = async () => {
    const suits = await Suit.query().select("label").where("id", this.suitId);
    const ranks = await Rank.query().select("label").where("id", this.rankId);

    if (suits[0].label === null) {
      return ranks[0].label;
    }

    return `${ranks[0].label} of ${suits[0].label}s`;
  };

  // static get relationMappings() {
  //   return {
  //     suitId: {
  //       relation: Model.BelongsToOneRelation,
  //       modelClass: Suit,
  //       join: {
  //         from: "suits_ranks.suitId",
  //         to: "suits.id",
  //       },
  //     },
  //     rankId: {
  //       relation: Model.BelongsToOneRelation,
  //       modelClass: Rank,
  //       join: {
  //         from: "suits_ranks.rankId",
  //         to: "ranks.id",
  //       },
  //     },
  //   };
  // }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["suitId", "rankId"],

      properties: {
        id: { type: "integer " },
        suitId: { type: ["integer", "null"] },
        rankId: { type: "integer" },
      },
    };
  }
}

export default SuitRank;
