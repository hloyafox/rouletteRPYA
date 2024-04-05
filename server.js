const express = require('express');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');

const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3001;
const rfsStream = rfs.createStream('log.txt', {
  size: '10M', // rotate every 10 MegaBytes written
  interval: '1d', // rotate daily
  compress: 'gzip', // compress rotated files
});
const cors = require('cors');

app.use(cors());
app.use(express.json());

morgan.token('id', req => {
  if (req.method === 'POST') {
    //creating id token
    return [req.body.id];
  } else {
    return '';
  }
});
morgan.token('data', req => {
  //creating id token
  if (req.method === 'POST') {
    return [req.body.name];
  } else {
    return '';
  }
});

app.use(morgan(':method :url :response-time ID: :id, НАЗВАНИЕ: :data', { stream: rfsStream }));

const db = new sqlite3.Database('./rpya.sqlite');

app.get('/cards/:type', (req, res) => {
  const type = req.params.type;
  db.all('SELECT * FROM Cards WHERE is_exsist = 1 AND type=?', type, (err, rows) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json(rows);
    }
  });
});

app.get('/admin', (req, res) => {
  db.all(
    'SELECT name, id, type, COUNT(name) as count FROM Cards WHERE is_exsist=1 GROUP BY name',
    (err, rows) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(rows);
      }
    }
  );
});

app.get('/admin/end', (req, res) => {
  db.all(
    'SELECT name, id, type, COUNT(name) as count, sum(is_exsist) FROM Cards GROUP BY name HAVING sum(is_exsist) = 0',
    (err, rows) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(rows);
      }
    }
  );
});

app.post('/cards/change/:id', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE Cards SET is_exsist=(?) WHERE id=${id}`;
  console.log(req.body);
  db.all(sql, [req.body.exsist], (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });
});

app.post('/admin/add', async (req, res) => {
  try {
    const sql = 'INSERT INTO Cards (name, type, is_exsist) VALUES (?, ?, ?)';
    for (let i = 1; i <= req.body.scope; i++) {
      db.run(sql, [req.body.name, req.body.type, req.body.exsist]);
    }
    res.sendStatus(204);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
