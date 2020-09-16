const express = require("express");
const router = express.Router();
const salaries = require("../db/salaries");

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
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

module.exports = router;
