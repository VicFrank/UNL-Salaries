const express = require("express");
const router = express.Router();
const salaries = require("../db/salaries");

router.get("/", async (req, res) => {
  try {
    const rows = await salaries.getEmployees();
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error" });
  }
});

module.exports = router;
