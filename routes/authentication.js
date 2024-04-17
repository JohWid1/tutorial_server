require('dotenv').config();
const router = require('express').Router();
const bcrypt = require('bcrypt')
const { registerUser, getPw, registerStudent } = require('../database/auth_db')
const jwt = require('jsonwebtoken')


router.post('/student/register', async (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const username = req.body.username;
  const pw = req.body.pw;


  const hashPw = await bcrypt.hash(pw, 10);

  await registerStudent(fname, lname, username, hashPw);
  res.end();

});

router.post('/user/register', async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userName = req.body.userName;
  const password = req.body.password;
  const email = req.body.email;


  const hashPw = await bcrypt.hash(password, 10);

  await registerUser(firstName, lastName, userName, hashPw, email);
  res.end();

});

router.post('/login', async (req, res) => {
  const uname = req.body.username;
  const pw = req.body.pw;

  const db_pw = await getPw(uname);

  if (db_pw) {
    const isAuth = await bcrypt.compare(pw, db_pw); 
    if (isAuth) {
      //luodaan token
      const token = jwt.sign({username: uname}, process.env.JWT_SECRET);
      res.status(200).json({jwtToken: token},);

    } else {
      res.status(401).json({ error: 'Wrong password' });
    }
  } else {
    res.status(404).json({ error: 'User not found' });
  }

})


module.exports = router;