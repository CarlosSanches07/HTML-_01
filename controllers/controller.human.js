export default class controllerHuman{
	static verifyLogin(req,res,database){
		let query = {
			name : 'verify-logn',
			text : 'select id from human where $1 = human.email and md5($2) = human.password',
			values : [req.body.email, req.body.password]
		}
		database.query(query)
			.then((data) => {
				if(!data.rows[0]){
					res.render('login', {login : 'erro'})
				}else{
					req.session.login = data.rows[0].id;
					res.redirect('/');
				}
			})
			.catch(err => console.log(err))
	}

	static verifyEmail(req, res, database){
		if(req.body.name == "" || req.body.email == "" || req.body.adress == "" || req.body.password == "")
			res.render('admin',{'fielderr' : 'insertHuman', 'user' : req.session.login})
		else{
			let query = {
				name : 'verify-email',
				text : 'select id from human where $1 = human.email',
				values : [req.body.email]
			}
			database.query(query)
				.then((data)=>{
					if(!data.rows[0]){
						let query2 = {
							name : 'insert-human',
							text : 'insert into human(name, email, adress, password) values($1, $2, $3, md5($4))',
							values : [req.body.name,req.body.email, req.body.adress,req.body.password]
						}
						database.query(query2)
						.then(()=>{
							res.redirect('/admin');
						})
						.catch((err)=>console.log(err))
					}else{
						res.render('admin',{erro:'erro'});
					}
				})
				.catch(err => console.log(err))
		}
	}

}