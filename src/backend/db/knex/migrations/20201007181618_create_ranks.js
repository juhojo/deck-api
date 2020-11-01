exports.up = function (knex) {
  return knex.schema.createTable("ranks", (table) => {
    table.increments("id");
    table.string("label", 31);
    table.integer("value");
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("ranks");
};
