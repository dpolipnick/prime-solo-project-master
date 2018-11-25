const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// This will retrieve the occurrences from the DB
router.get('/', (req, res) => {
    const queryText = `SELECT "habit_occurrences".*, "categories"."category" FROM "habit_occurrences"
    JOIN "categories" ON "habit_occurrences"."category_id" = "categories"."id";`;
    pool.query(queryText)
      .then((result) => { res.send(result.rows); })
      .catch((error) => {
        console.log('Error completing GET occurrences query:', error);
        res.sendStatus(500);
      });
  });

// This will POST a new occurrence on our DB and respond to client
router.post('/', (req, res) => {
    const newOccurrence = req.body;
    const queryText = `INSERT INTO "habit_occurrences" ("habit_id", "date", "time")
                      VALUES ($1, $2, $3)`;
    const queryValues = [
      newOccurrence.habit_id,
      newOccurrence.date,
      newOccurrence.time,
    ];
    pool.query(queryText, queryValues)
      .then(() => { res.sendStatus(201); })
      .catch((error) => {
        console.log('Error completing POST request for your occurrence query:', error);
        res.sendStatus(500);
      });
  });

// This will delete an occurrence from our DB and send a response
router.delete('/:id', (req, res) => {
  console.log('Deleting this occurrence:', req.params);
  const queryText = 'DELETE FROM habit_occurrences WHERE id=$1';
  pool.query(queryText, [req.params.id])
    .then(() => { res.sendStatus(200); })
    .catch((error) => {
      console.log('Error completing DELETE occurrence query:', error);
      res.sendStatus(500);
    });
});


module.exports = router;