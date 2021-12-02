var mysql = require('promise-mysql');
let log = require("./modules/log").log
let err = require("./modules/log").err

var config = {
	host     : 'localhost',
	port     : 3310,
	user     : 'root',
	password : 'example',
	database : 'todo_list'
}

// Création d'un pool de connexion, puis enregistrement de ce pool dans l'objet db
var pool = mysql.createPool(
	config
).then( pool => {
	log("Connexion à la base de données établie.") ;
	return pool ;
}).catch( error => {
	err("Impossible de se connecter à la base de données : "+ error)
	throw "Impossible de se connecter à la base de données : "+error;
});


module.exports = pool;
