const mysql = require('mysql')
const pool = require('../mysql/connection')
const { handleSQLError } = require('../mysql/error')


const getSponsors = (req, res) => {
    pool.query("SELECT * FROM sponsors", (err, rows) => {
      if (err) return handleSQLError(res, err)
      return res.json(rows);
    })
}


const getSponsorById = (req, res) => {
    let sql = "SELECT * FROM sponsors WHERE id = ?"
    sql = mysql.format(sql, [ req.params.id ])
  
    pool.query(sql, (err, rows) => {
      if (err) return handleSQLError(res, err)
      return res.json(rows);
    })
  }
  
  const createSponsor = (req, res) => {
    const { username, email, location, bio } = req.body
    let sql = "INSERT INTO sponsors (username, email, location, bio) VALUES (?, ?, ?, ?)"
    sql = mysql.format(sql, [ username, email, location, bio ])
  
    pool.query(sql, (err, results) => {
      if (err) return handleSQLError(res, err)
      return res.json({ newId: results.insertId });
    })
  }
  
  const updateSponsorById = (req, res) => {
    const { username } = req.body
    let sql = "UPDATE sponsors SET username = ? WHERE id = ?"
    sql = mysql.format(sql, [ username, req.params.id ])
  
    pool.query(sql, (err, results) => {
      if (err) return handleSQLError(res, err)
      return res.status(204).json();
    })
  }
  
  const deleteSponsorByUsername = (req, res) => {
    let sql = "DELETE FROM sponsors WHERE username = ?"
    sql = mysql.format(sql, [ req.params.username])
  
    pool.query(sql, (err, results) => {
      if (err) return handleSQLError(res, err)
      return res.json({ message: `Deleted ${results.affectedRows} sponsor(s)` });
    })
  }

module.exports = {
    getSponsors,
    getSponsorById,
    createSponsor,
    updateSponsorById,
    deleteSponsorByUsername
}