exports.up = function (knex) {
  return knex.schema.createTable("cards", (table) => {
    table.increments("id");
    table.integer("deckId").unsigned().notNullable();
    table.foreign("deckId").references("id").inTable("decks");
    table.integer("value").unsigned().notNullable();
    table.foreign("value").references("id").inTable("suits_ranks");
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("cards");
};
