exports.seed = (knex) => {
  let suitRows = [];
  // Deletes ALL existing entries
  return knex("suits_ranks")
    .del()
    .then(() => knex.select("id", "label").from("suits"))
    .then((rows) => {
      suitRows = rows;
      return knex.select("id", "value").from("ranks");
    })
    .then((rankRows) => {
      // Inserts seed entries
      const insertRows = [];

      rankRows.forEach((rankRow, i) => {
        suitRows
          .filter((suitRow) => suitRow.label !== null) // Filter out the special suit (`null`) of jokers
          .forEach((suitRow, j) => {
            // Iterate over each the regular suits and
            // push all but jokers (joker's rank is `0`).
            if (rankRow.value !== 0) {
              insertRows.push({
                rankId: rankRow.id,
                suitId: suitRow.id,
              });
            }
          });
      });

      // Lastly add a joker.
      insertRows.push({
        rankId: rankRows.find((rank) => rank.value === 0).id,
        suitId: suitRows.find((suit) => suit.label === null).id,
      });

      return knex("suits_ranks").insert(insertRows);
    });
};
