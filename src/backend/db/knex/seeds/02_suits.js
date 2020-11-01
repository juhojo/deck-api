exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex("suits")
    .del()
    .then(() => {
      const suits = [undefined, "Spade", "Diamond", "Club", "Heart"];

      // Inserts seed entries
      return knex("suits").insert(
        suits.map((suit) => ({
          label: suit,
        }))
      );
    });
};
