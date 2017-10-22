export default class controllerContent {
	
	static updateById(req,database){
		let content =[req.body.title, req.body.description,req.body.id];
		let string = 'update content set title = $1, description = $2 where id = $3';
		database.query(string, content, (err,data)=>{
			if(err)
				console.log(err);
		} )	
	}
}