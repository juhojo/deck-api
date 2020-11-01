exports.up = function (knex) {
  return knex.schema.createTable("suits", (table) => {
    table.increments("id");
    table.string("label", 31);
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("suits");
};
