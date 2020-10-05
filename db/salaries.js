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

  async getTotalEmployeeSalary(name) {
    try {
      const { rows } = await query(
        `
        SELECT sum(budgeted_salary)
        FROM salaries WHERE full_name = $1
        GROUP BY full_name
      `,
        [name]
      );

      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  async getEmployeeSalaries(name) {
    try {
      const { rows } = await query(
        `
        SELECT * FROM salaries WHERE full_name = $1
      `,
        [name]
      );

      return rows;
    } catch (error) {
      throw error;
    }
  },

  async getAllPositions() {
    try {
      const { rows } = await query(
        `
        SELECT * FROM positions
      `
      );

      return rows;
    } catch (error) {
      throw error;
    }
  },

  async getEmployees() {
    try {
      const { rows } = await query(
        `
        SELECT DISTINCT(full_name) FROM salaries ORDER BY full_name
      `
      );

      return rows;
    } catch (error) {
      throw error;
    }
  },

  async getAllPositionsFromCampus(campus, count = 20) {
    try {
      const { rows } = await query(
        `
        SELECT position_name, count(*)
        FROM salaries
        WHERE campus_name = $1
        GROUP BY position_name
        HAVING count(*) > $2
        ORDER BY position_name;
      `,
        [campus, count]
      );

      return rows;
    } catch (error) {
      throw error;
    }
  },

  async getDepartmentsInfo() {
    try {
      const { rows } = await query(
        `
        SELECT
        department_name,
        campus_name,
        count(DISTINCT(full_name)) as num_employees,
        sum(budgeted_salary) as total_salary,
        ROUND(sum(budgeted_salary)::Decimal / count(DISTINCT(full_name))) as avg_salary
        FROM salaries GROUP BY department_name, campus_name
        ORDER BY total_salary DESC;
      `
      );

      return rows;
    } catch (error) {
      throw error;
    }
  },

  async getEmployeeData(name) {
    try {
      const salaries = await this.getEmployeeSalaries(name);
      const total_salary = await this.getTotalEmployeeSalary(name);

      return {
        name,
        total_salary,
        salaries,
      };
    } catch (error) {
      throw error;
    }
  },

  async getDepartmentSalaries(department, campus) {
    try {
      const { rows } = await query(
        `
        SELECT *
        FROM salaries
        WHERE department_name = $1 AND campus_name = $2
        ORDER BY budgeted_salary DESC
      `,
        [department, campus]
      );

      return rows;
    } catch (error) {
      throw error;
    }
  },

  async getEmployeesTotalSalary(
    limit = 100,
    offset,
    campus,
    department,
    position
  ) {
    try {
      let havingClause = "";

      if (campus || department || position) {
        havingClause = "HAVING TRUE";
      }

      if (campus) {
        havingClause =
          havingClause +
          `
          AND $3 = ANY(array_agg(campus_name))
        `;
      }
      if (department) {
        havingClause = `
          AND $4 = ANY(array_agg(department_name))
        `;
      }
      if (position) {
        havingClause = `
          AND $5 = ANY(array_agg(position_name))
        `;
      }

      const { rows } = await query(
        `
      SELECT 
        full_name,
        array_agg(DISTINCT(campus_name)) as campuses,
        array_agg(DISTINCT(department_name)) as departments,
        array_agg(position_name) as positions,
        sum(budgeted_salary) as total_salary,
        sum(state_salary) as total_state_salary,
        sum(other_salary) as total_other_salary
      FROM salaries
      WHERE $3 = $3 AND $4 = $4 AND $5 = $5
      GROUP BY full_name
      ${havingClause}
      ORDER BY total_salary DESC
      LIMIT $1 OFFSET $2
      `,
        [limit, offset, campus, department, position]
      );

      return rows;
    } catch (error) {
      throw error;
    }
  },
};
