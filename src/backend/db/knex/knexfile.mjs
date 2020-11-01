import secrets from "../../util/secrets.mjs";

export default {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: process.env.SQLITE_FILENAME || "./dev.sqlite3",
    },
  },

  production: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      database: secrets.read("mysql-db"),
      user: secrets.read("mysql-user"),
      password: secrets.read("mysql-user-pw"),
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      loadExtensions: [".js", ".mjs"],
    },
  },
};
