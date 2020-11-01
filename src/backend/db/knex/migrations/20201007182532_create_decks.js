exports.up = function (knex) {
  return knex.schema.createTable("decks", (table) => {
    table.increments("id");
    table.integer("owner").unsigned().notNullable();
    table.foreign("owner").references("id").inTable("users");
    table.boolean("shuffled");
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("decks");
};
