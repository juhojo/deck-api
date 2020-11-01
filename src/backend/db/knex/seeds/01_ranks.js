const labels = {
  0: "Joker",
  1: "Ace",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  10: "10",
  11: "Jack",
  12: "Queen",
  13: "King",
};

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex("ranks")
    .del()
    .then(() => {
      // There are 13 cards of each suit and joker cards
      const LENGTH = 14;

      // Inserts seed entries
      return knex("ranks").insert(
        Array.from({ length: LENGTH }, (_, i) => ({
          value: i,
          label: labels[i],
        }))
      );
    });
};
