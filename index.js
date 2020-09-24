const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const salariesRouter = require("./routes/salaries");
const employeesRouter = require("./routes/employees");

const port = process.env.PORT || 3000;

const app = express();

function skipLog(req, res) {
  let url = req.url;
  if (url.indexOf("?") > 0) url = url.substr(0, url.indexOf("?"));
  if (url.match(/(js|jpg|png|ico|css|woff|woff2|eot|svg|otf)$/gi)) {
    return true;
  }
  return false;
}

app.use(morgan("short", { skip: skipLog }));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "client/dist")));

app.use("/api/salaries", salariesRouter);
app.use("/api/employees", employeesRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/dist/index.html"));
});

const server = app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
