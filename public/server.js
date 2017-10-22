import database from './database/database.js'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const client = new database('postgresql://postgres:0707Link@localhost:5432/express');
client.connect()
	.then(app.listen(3000, ()=>{
  		console.log('listen on 3000');
	})).catch((err)=>{
		console.log(err);
	})

app.set('view engine', 'pug');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extend : true}));


app.get('/', (req, res)=>{
	client.query('select * from content order by id',(err, data)=>{
		if(err)throw err;

		res.render('index.pug', {'content':data.rows});
	})
})

app.get('/admin',(req,res)=>{
	res.render('admin.pug');
})

app.get('/login',(req,res)=>{
	res.render('login.pug');
})

app.post('/admin',(req,res)=>{
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