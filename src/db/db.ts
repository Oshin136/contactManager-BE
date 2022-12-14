import Knex from "knex";
import knexConfig from "./knexfile";

const knex = Knex(
  knexConfig[process.env.NODE_ENV as string] || ["development"]
);
export default knex;
