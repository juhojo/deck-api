import Objection from "objection";
const { Model } = Objection;

class Rank extends Model {
  static get tableName() {
    return "ranks";
  }
}

export default Rank;
