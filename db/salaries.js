const { create } = require("../../path-of-guardians/db/games");
const { query } = require("./index");

module.exports = {
  async create(
    employee,
    position,
    campus,
    department,
    budgeted_salary,
    state_salary,
    other_salary
  ) {
    try {
      await query(
        `
        INSERT INTO positions (position_name)
        VALUES($1) 
        ON CONFLICT DO NOTHING;
      `,
        [position]
      );
      await query(
        `
        INSERT INTO campuses (campus_name)
        VALUES($1) 
        ON CONFLICT DO NOTHING;
      `,
        [campus]
      );
      await query(
        `
        INSERT INTO departments (department_name)
        VALUES($1) 
        ON CONFLICT DO NOTHING;
      `,
        [department]
      );

      await query(
        `
          INSERT INTO salaries (full_name, position_name, campus_name,
            department_name, budgeted_salary, state_salary, other_salary)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,
        [
          employee,
          position,
          campus,
          department,
          budgeted_salary,
          state_salary,
          other_salary,
        ]
      );
    } catch (error) {
      throw error;
    }
  },
};
