const app = require("./app");
const connection = require("./models/connection");

const port = 3000;

connection.check();

app.listen(port, () =>
  console.log(`App is listening at http://localhost:${port}`)
);
