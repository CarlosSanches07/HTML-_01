export default class content {
	constructor(id,title,description/*, userId*/){
		this._id = id;
		this._title = title;
		this._description = description;
		// this._userId = userId;
	}

	getId(){return this.id;}
	getTitle(){return this.title;}
	getDescription(){return this.description;}
	/*getUserId(){return this.userId;}*/

	setId(id){
		this.id = id;
	}

	setTitle(title){
		this.title = title
	}

	setDescription(description){
		this.description = description
	}

/*	setUserId(userId){
		this.userId = userId;
	}*/
}