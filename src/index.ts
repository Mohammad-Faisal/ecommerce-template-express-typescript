import App from "./App";

import config from "./config/index";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { join } from "path";

const databasePort = config.dbPort ? parseInt(config.dbPort) : 5432;
console.log(config);
createConnection({
  type: "postgres",
  host: config.dbURL,
  port: databasePort,
  username: config.dbUserName,
  password: config.dbPassword,
  database: config.dbName,
  entities: [join(__dirname, "/entities/*.js")],
  synchronize: true,
  logging: false,
})
  .then((connection) => {
    console.log("a new connection is created ");
    connection.synchronize();
    const app = new App();
    app.listen();
  })
  .catch((error) => console.log(error));
