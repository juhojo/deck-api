exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("username").unique();
    table.string("hash");
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
