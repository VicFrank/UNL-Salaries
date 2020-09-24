DROP TABLE IF EXISTS salaries CASCADE;
DROP TABLE IF EXISTS positions CASCADE;
DROP TABLE IF EXISTS campuses CASCADE;
DROP TABLE IF EXISTS departments CASCADE;

CREATE TABLE IF NOT EXISTS positions (
  position_name TEXT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS campuses (
  campus_name TEXT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS departments (
  department_name TEXT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS salaries (
  salary_id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  position_name TEXT NOT NULL REFERENCES positions (position_name),
  campus_name TEXT NOT NULL REFERENCES campuses (campus_name),
  department_name TEXT NOT NULL REFERENCES departments (department_name),
  budgeted_salary INTEGER NOT NULL,
  state_salary INTEGER NOT NULL,
  other_salary INTEGER NOT NULL
);
