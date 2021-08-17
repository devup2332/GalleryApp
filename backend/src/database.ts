import { Sequelize } from "sequelize";
import { environments } from "./environments/environments";

const sequelize = new Sequelize(
  environments.DB.DB_NAME,
  environments.DB.DB_USERNAME,
  environments.DB.DB_PASSWORD,
  {
    dialect: "mysql",
    host: environments.DB.DB_HOST,
    logging: false,
  }
);

export default sequelize;
