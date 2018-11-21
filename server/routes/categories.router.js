const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// This will retrieve the categories from the DB
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "categories";`;
    pool.query(queryText)
      .then((result) => { res.send(result.rows); })
      .catch((error) => {
        console.log('Error completing GET categories query:', error);
        res.sendStatus(500);
      });
  });

// This will POST a new category on our DB and respond to client
router.post('/', (req, res) => {
    const newCategory = req.body;
    const queryText = `INSERT INTO "categories" ("user_id", "category")
                      VALUES ($1, $2)`;
    const queryValues = [
      newCategory.user_id,
      newCategory.category,
    ];
    pool.query(queryText, queryValues)
      .then(() => { res.sendStatus(201); })
      .catch((error) => {
        console.log('Error completing POST request for your category query:', error);
        res.sendStatus(500);
      });
  });

module.exports = router;