import Objection from "objection";
const { Model } = Objection;

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username"],

      properties: {
        id: { type: "integer" },
        username: { type: "string" },
        hash: { type: "string" },
      },
    };
  }

  publicInfo() {
    return {
      id: this.id,
      username: this.username,
    };
  }
}

export default User;
