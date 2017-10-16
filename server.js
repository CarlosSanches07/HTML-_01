const express = require('express');
const bodyParser = require('body-parser');
const {Client} = require('pg');
const connectionString = 'postgresql://postgres:0707Link@localhost:5432/express';
const client = new Client({
	connectionString : connectionString,
});
const app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extend : true}));
app.use(bodyParser.json());

client.connect();

client.query('select now()', (err, res) => {
  if(err)throw err;

  app.listen(3000, ()=>{
  	console.log('listen on 3000');
  });
});

app.get('/', (req, res)=>{
	client.query('select * from content',(err, data)=>{
		if(err)throw err;
		res.render('index.pug', {'content':data.rows});
	})
})