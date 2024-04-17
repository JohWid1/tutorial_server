const pgPool = require('./pg_connection');

const sql = {
  REGISTER_STUDENT: 'INSERT INTO student VALUES ($1,$2,$3,$4)',
  REGISTER_USER: 'INSERT INTO users("firstName", "lastName", "userName", password, email) VALUES ($1,$2,$3,$4,$5)',
  GET_PW: 'SELECT pw FROM student WHERE username=$1'
}

async function registerStudent(fname, lname, username, pwHash) {
  await pgPool.query(sql.REGISTER_STUDENT, [fname, lname, username, pwHash])
}

async function registerUser(firstName, lastName, userName, passwordHash, email) {
  await pgPool.query(sql.REGISTER_USER, [firstName, lastName, userName, passwordHash, email])
}

async function getPw(username) {
  const result = await pgPool.query(sql.GET_PW, [username]);

  return result.rowCount > 0 ? result.rows[0].pw : null;

}

module.exports = {registerStudent, registerUser, getPw}  