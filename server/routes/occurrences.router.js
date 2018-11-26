const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// This will retrieve the occurrences from the DB
router.get('/', (req, res) => {
    const analytics = req.query;
    console.log('occurrences GET request req.query:', analytics);
    const queryText = `SELECT "habit_occurrences".* FROM "habit_occurrences"
    WHERE (date BETWEEN $1 AND $2)
    AND habit_id = $3;`;
    const queryValues = [
        analytics.startDate,
        analytics.endDate,
        analytics.habit_id,
      ];
      console.log('On server about to do occurrence GET queryText:', queryText, 'queryValues:', queryValues);
      pool.query(queryText, queryValues)
      .then((result) => { res.send(result.rows);
      console.log('GET request for occurrences was successful! Your results:', result.rows);
      })
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