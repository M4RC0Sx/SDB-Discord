import { Sequelize } from "sequelize";
import { SQLITE_DATABASE, SQLITE_PASSWORD, SQLITE_USER } from "../util/config";

const sequelize = new Sequelize(SQLITE_DATABASE, SQLITE_USER, SQLITE_PASSWORD, {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: `${__dirname}/../../database/db.sqlite`
});

/**
 * Models
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Class = require("../models/Class")(sequelize);

export { Class };
