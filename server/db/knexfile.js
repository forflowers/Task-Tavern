const path = require("path");

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "tasktavern.sqlite")
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, "migrations")
    }
  }
};
