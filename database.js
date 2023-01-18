import { createPool } from "mysql";

const newLocal = createPool({
  host: "localhost",
  user: "root",
  password: "123Sheba#@!bikroy#@!",
  database: "sheba_bikroy",
});
var db = newLocal;

// var db = createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "sheba_bikroy",
// });

export default db;
