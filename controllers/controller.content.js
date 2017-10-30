export default class controllerContent {
	
	static updateById(req, res, database){
		if(req.body.title == "" || req.body.description == "")
			res.render('admin',{'user' : req.session.login, 'contentErr' : 'err'})	
		else{	
			let content =[req.body.title, req.body.description,req.session.login];
			let string = 'insert into content(title, description, humanId) values($1,$2,$3)';
			database.query(string, content, (err,data)=>{
				if(err)
					console.log(err);
			})	
		}
	}
}