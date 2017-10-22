export default class controllerHuman{
	static verifyLogin(req,database){
		console.log(req.body.login)
		let query = {
			name : 'verify-logn',
			text : 'select name from human where $1 = human.name',
			values : [req.body.login]
		}
		database.query(query)
			.then((res) => {
				console.log(res.rows[0])
				
			})
			.catch(err => console.log(err))
		req.session.login = req.body.login;
		console.log(req.session.login)
	}
}