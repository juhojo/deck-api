import Knex from "knex";
import knexConfig from "./knex/knexfile.mjs";

export default Knex(knexConfig[process.env.NODE_ENV]);
