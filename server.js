import database from './database/database.js'
import controllerContent from './controllers/controller.content'
import controllerHuman from './controllers/controller.human'

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const client = new database('postgresql://postgres:0707Link@localhost:5432/express');

client.connect();
app.listen(3000, ()=>{
  		console.log('listen on 3000');
})

app.set('view engine', 'pug');
app.use(express.static('public'));

app.use(session({secret : 'thisisasecret', cookie : {maxAge : 60000}}));

app.use(bodyParser.urlencoded({extend : true}));


app.get('/', (req, res)=>{
	client.query('select * from content order by id',(err, data)=>{
		if(err)throw err;

		res.render('index.pug', {'content':data.rows});
		//console.log(req.session.login);
	})
})

app.get('/admin',(req,res)=>{
	res.render('admin.pug');
})

app.get('/login',(req,res)=>{
	res.render('login.pug');
})

app.post('/admin',(req, res)=>{
	controllerContent.updateById(req,client);
	/*var query = 'update content set title = $1, description = $2 where id = $3';
	var values = [req.body.title, req.body.description, req.body.id];
	client.query(query, values,(err,data)=>{
		if(err)
			console.log(err);
		else
			console.log('updated' + data.rows);
	})*/
	res.redirect('/');
})

app.post('/login',(req,res)=>{
	controllerHuman.verifyLogin(req,res,client);
})

app.post('/admin-user',(req,res)=>{
	controllerHuman.verifyEmail(req,res,client);
})