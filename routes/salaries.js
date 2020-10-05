const express = require("express");
const apicache = require("apicache");

const router = express.Router();
const salaries = require("../db/salaries");

let cache = apicache.middleware;

router.get("/", cache("1 day"), async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100000;
    const offset = parseInt(req.query.offset) || 0;
    const campus = parseInt(req.query.campus);
    const department = parseInt(req.query.department);
    const position = parseInt(req.query.position);
    const rows = await salaries.getEmployeesTotalSalary(
      limit,
      offset,
      campus,
      department,
      position
    );
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error" });
  }
});

router.get("/departments", cache("1 day"), async (req, res) => {
  try {
    const rows = await salaries.getDepartmentsInfo();
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error" });
  }
});

router.get("/departments/:name", cache("1 day"), async (req, res) => {
  try {
    const names = req.params.name.split("-");
    const department = names[0];
    const campus = names[1];

    if (!department || !campus) return res.status(200).json(null);

    const rows = await salaries.getDepartmentSalaries(department, campus);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error" });
  }
});

router.get("/employees/:name", cache("1 day"), async (req, res) => {
  try {
    const name = req.params.name;
    const rows = await salaries.getEmployeeSalaries(name);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error" });
  }
});

module.exports = router;
