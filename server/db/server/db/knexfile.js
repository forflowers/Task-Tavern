module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./server/db/tasktavern.sqlite"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./server/db/migrations"
    }
  }
};
