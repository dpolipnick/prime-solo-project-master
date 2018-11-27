const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// This will retrieve the habits from the DB
router.get('/', (req, res) => {
    const queryText = `SELECT "habits".*, "categories"."category" FROM "habits"
    JOIN "categories" ON "habits"."category_id" = "categories"."id"
    WHERE "habits"."user_id" =${req.user.id};`;
    pool.query(queryText)
      .then((result) => { res.send(result.rows); })
      .catch((error) => {
        console.log('Error completing GET habits query:', error);
        res.sendStatus(500);
      });
  });

// This will POST a new habit on our DB and respond to client
router.post('/', (req, res) => {
    const newHabit = req.body;
    const queryText = `INSERT INTO "habits" ("user_id", "habit", "category_id", "mute_status")
                      VALUES ($1, $2, $3, $4)`;
    const queryValues = [
      newHabit.user_id,
      newHabit.habit,
      newHabit.category_id,
      newHabit.mute_status,
    ];
    pool.query(queryText, queryValues)
      .then(() => { res.sendStatus(201); })
      .catch((error) => {
        console.log('Error completing POST request for your habit query:', error);
        res.sendStatus(500);
      });
  });

// This will delete a habit from our DB and send a response
router.delete('/:id', (req, res) => {
  console.log('Deleting this habit:', req.params);
  const queryText = 'DELETE FROM habits WHERE id=$1';
  pool.query(queryText, [req.params.id])
    .then(() => { res.sendStatus(200); })
    .catch((error) => {
      console.log('Error completing DELETE habit query:', error);
      res.sendStatus(500);
    });
});


module.exports = router;