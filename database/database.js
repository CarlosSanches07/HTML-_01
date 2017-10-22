import pg from 'pg'

export default class database {
	constructor(connectionString){
		let client = new pg.Client(connectionString);
		return client;	
	}
}