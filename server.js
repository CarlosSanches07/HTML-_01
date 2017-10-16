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

		var result = data.rows;

		res.render('index.pug', {'content':result.sort((a,b)=>{
			if(a.id < b.id)
				return -1;
			if(a.id > b.id)
				return 1;
			return 0;
		})});
	})
})

app.get('/admin',(req,res)=>{
	res.render('admin.pug');
})

app.post('/',(req,res)=>{
	var query = 'update content set title = $1, description = $2 where id = $3';
	var values = [req.body.title, req.body.description, req.body.id];
	client.query(query, values,(err,data)=>{
		if(err)
			console.log(err);
		else
			console.log('updated' + data.rows);
	})
	res.redirect('/');
})