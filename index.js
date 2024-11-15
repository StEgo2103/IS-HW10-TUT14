const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');

app.listen(process.env.PORT || 3000, () => {
	console.log('Server started (http://localhost:3000/) !');
});

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
	max: 2,
});

app.get('/', (req, res) => {
	const sql = 'SELECT * FROM PRODUCT ORDER BY PROD_ID';
	pool.query(sql, [], (err, result) => {
		let message = '';
		let model = {};
		if (err) {
			message = `Error - ${err.message}`;
		} else {
			message = 'success';
			model = result.rows;
		}
		res.render('index', {
			message: message,
			model: model,
		});
	});
});
