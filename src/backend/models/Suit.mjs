import Objection from "objection";
const { Model } = Objection;

class Suit extends Model {
  static get tableName() {
    return "suits";
  }
}

export default Suit;
