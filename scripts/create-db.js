const fs = require("fs").promises;
const parse = require("csv-parse/lib/sync");

const salaries = require("../db/salaries");

function stringToNumber(inputString) {
  return parseInt(inputString.replace(/,/g, "") || 0);
}

(async function () {
  const content = await fs.readFile(__dirname + "/data/2020_2021_Salaries.csv");

  const records = parse(content);
  let i = 0;

  for (record of records) {
    i++;

    const employee = record[0];
    const position = record[1];
    const campus = record[2];
    const department = record[3];
    const budgeted_salary = stringToNumber(record[4]);
    const state_aided_salary = stringToNumber(record[5]);
    const other_funds_salary = stringToNumber(record[6]);

    await salaries.create(
      employee,
      position,
      campus,
      department,
      budgeted_salary,
      state_aided_salary,
      other_funds_salary
    );

    console.log(`Added record ${i}`);
  }
})();
