const { PORT = 5000 } = process.env;

const app = require("./app");
const knex = require("./db/connection");

app.set('port', process.env.PORT || 5000);

const listener = () => console.log(`Listening on Port ${PORT}!`);

knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
  })
  .catch(console.error);
