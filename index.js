const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("", require("./src/Routes/catsEP")); //CATS-EP
app.use("", require("./src/Routes/viewsEp")); //SERVER HTML
app.use(express.static(path.join(__dirname, "public"))); //SERVER Stactic Files

app.listen(5000, () => {
  console.log("Port Is running of 5000");
});
