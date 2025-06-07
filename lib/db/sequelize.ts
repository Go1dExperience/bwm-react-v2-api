import { Config, Sequelize } from "sequelize";
import { DeepWriteable } from "sequelize/types/utils";

const env = process.env.NODE_ENV || "development";
const config = require("../../config/config")[env];

const sequelize = config.url
  ? new Sequelize(config.url, {
      ...config,
      hooks: {
        beforeConnect: async (config: DeepWriteable<Config>) => {
          config.username = process.env.DB_USERNAME || config.username;
          config.password = process.env.DB_PASSWORD || config.password;
        },
      },
    })
  : new Sequelize(config.database, config.username, config.password, {
      ...config,
      hooks: {
        beforeConnect: async (config: DeepWriteable<Config>) => {
          config.username = process.env.DB_USERNAME || config.username;
        },
      },
    });

export { Sequelize, sequelize };
