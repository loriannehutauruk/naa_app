const mysql = require('mysql')
const pool = require('../mysql/connection')
const { handleSQLError } = require('../mysql/error')


const getGoals = (req, res) => {
    pool.query("SELECT * FROM goals", (err, rows) => {
      if (err) return handleSQLError(res, err)
      return res.json(rows);
    })
}


const getGoalById = (req, res) => {
    let sql = "SELECT * FROM goals WHERE id = ?"
    sql = mysql.format(sql, [ req.params.id ])
  
    pool.query(sql, (err, rows) => {
      if (err) return handleSQLError(res, err)
      return res.json(rows);
    })
  }
  
  const createGoal = (req, res) => {
    const { goal } = req.body
    let sql = "INSERT INTO goals (goal) VALUES (?)"
    sql = mysql.format(sql, [ goal ])
  
    pool.query(sql, (err, results) => {
      if (err) return handleSQLError(res, err)
      return res.json({ newId: results.insertId });
    })
  }
  
  const updateGoalById = (req, res) => {
    const { goal } = req.body
    let sql = "UPDATE goals SET goal = ? WHERE id = ?"
    sql = mysql.format(sql, [ goal, req.params.id ])
  
    pool.query(sql, (err, results) => {
      if (err) return handleSQLError(res, err)
      return res.status(204).json();
    })
  }
  
  const deleteGoalById = (req, res) => {
    let sql = "DELETE FROM goals WHERE goal = ?"
    sql = mysql.format(sql, [ req.params.goal])
  
    pool.query(sql, (err, results) => {
      if (err) return handleSQLError(res, err)
      return res.json({ message: `Deleted ${results.affectedRows} goal` });
    })
  }

module.exports = {
    getGoals,
    getGoalById,
    createGoal,
    updateGoalById,
    deleteGoalById
}