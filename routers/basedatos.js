const { Pool } = require('pg');
const Router = require('express-promise-router');

const pool = new Pool({
  user: 'nsyedmck',
  host: 'lallah.db.elephantsql.com',
  database: 'nsyedmck',
  password: 'jKZ_wFECUAm4YUQZO8cby8ac6h5a8iFn',
  port: 5432,
});

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.get('/consultatotalpacientes', async (req, res) => {
  //const { id } = req.params
  const { rows } = await pool.query('SELECT * FROM pacientes');
  res.send(rows);
});

router.post('/insertarpacientes', async (req, res) => {
  const { nombre, apellido, numid } = req.body;
  await pool.query(
    `INSERT INTO pacientes(nombre, apellido, numid) VALUES('${nombre}','${apellido}','${numid}')`
  );
  res.send('INSERTADO');
});

router.delete('/borrarpacientes', async (req, res) => {
  const numid = req.body;
  await pool.query('DELETE FROM pacientes where numid = $1',[numid.numid]);
  res.json(`User ${numid.numid} deleted Successfully`);
});

router.put('/editarpacientes', async (req, res) => {
  const { nombre, apellido, numid } = req.body;
  await pool.query('UPDATE pacientes SET nombre = $1, apellido = $2 WHERE numid = $3', [nombre, apellido, numid]);
  
  res.json(`User ${numid} update Successfully`);
});