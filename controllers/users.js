const mysql = require('mysql')
const pool = require('../mysql/connection')
const { handleSQLError } = require('../mysql/error')


const getUsers = (req, res) => {
    pool.query("SELECT * FROM users", (err, rows) => {
      if (err) return handleSQLError(res, err)
      return res.json(rows);
    })
}


const getUserById = (req, res) => {
    let sql = "SELECT * FROM users WHERE id = ?"
    sql = mysql.format(sql, [ req.params.id ])
  
    pool.query(sql, (err, rows) => {
      if (err) return handleSQLError(res, err)
      return res.json(rows);
    })
  }
  
  const createUser = (req, res) => {
    const { username, email, privacy } = req.body
    let sql = "INSERT INTO users (username, email, privacy) VALUES (?, ?, ?)"
    sql = mysql.format(sql, [ username, email, privacy ])
  
    pool.query(sql, (err, results) => {
      if (err) return handleSQLError(res, err)
      return res.json({ newId: results.insertId });
    })
  }
  
  const updateUserById = (req, res) => {
    const { username } = req.body
    let sql = "UPDATE users SET username = ? WHERE id = ?"
    sql = mysql.format(sql, [ username, req.params.id ])
  
    pool.query(sql, (err, results) => {
      if (err) return handleSQLError(res, err)
      return res.status(204).json();
    })
  }
  
  const deleteUserByUsername = (req, res) => {
    let sql = "DELETE FROM users WHERE username = ?"
    sql = mysql.format(sql, [ req.params.username])
  
    pool.query(sql, (err, results) => {
      if (err) return handleSQLError(res, err)
      return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
    })
  }

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserByUsername
}