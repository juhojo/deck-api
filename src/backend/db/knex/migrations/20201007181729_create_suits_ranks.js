exports.up = function (knex) {
  return knex.schema.createTable("suits_ranks", (table) => {
    table.increments("id");
    table.integer("suitId").unsigned().notNullable();
    table.foreign("suitId").references("id").inTable("suits");
    table.integer("rankId").unsigned().notNullable();
    table.foreign("rankId").references("id").inTable("ranks");
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("suits_ranks");
};
