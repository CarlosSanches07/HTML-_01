
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
	if(!req.session.login){
		client.query('select * from content where content.humanId = 1 order by id',(err, data)=>{
			if(err) throw err;
		res.render('index.pug', {'content':data.rows, 'login' : false});
		})
	}else{
		let query = {
			name : 'select-content',
			text : 'select content.id, content.title, content.description from content join human on(humanId = human.id) where human.id = $1 order by content.id',
			values : [req.session.login]
		}
		client.query(query)
		.then((data)=>{
			res.render('index.pug',{'content': data.rows, 'login' : true});
		})
		.catch((err)=>console.log(err))
	}
})

app.post('/search', (req, res)=>{
	let query = {
		name : 'selectByTitle',
		text : 'select * from content where title = $1 and humanId = $2',
		values : [req.body.searchTitle, req.session.login]
	}
	client.query(query)
		.then((data)=>{
			console.log(data);
			if(data.rows[0] == null){
				query = {
					text : 'select * from content where humanId = $1',
					values : [req.session.login]
				}
				client.query(query)
					.then((data)=>{
						res.render('index.pug',{'content' : data.rows, 'login' : true, 'erro' : 'erro'})
					})
					.catch((err)=>{
						console.log(err);
					})
			}
			else
				res.render('index.pug',{'content' : data.rows, 'login' : true});
		})
		.catch((err)=>{
			console.log(err);
		})
})

app.get('/admin',(req,res)=>{
	res.render('admin.pug', {'user' :  req.session.login});
})

app.get('/login',(req,res)=>{
	res.render('login.pug');
})

app.post('/admin',(req, res)=>{
	controllerContent.updateById(req,res,client);
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