var mysql = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'toor',
	database : 'test_with_nodejs'
});
connection.connect(function(err) {});

function insertValue() {
	var data  = {id:3, point: 20};
	var query = connection.query('INSERT INTO table1 SET ?', data, function(err, result) {
		console.log(err);
		console.log(result);
	});
}

function getValueFormID(id) {
	var query = connection.query('select * from table1 where id='+id, function(err, result) {
		console.log(err);
		console.log(result);
	});
}

function updateValueAtID(id) {
	var query = connection.query('update table1 set point=744  where id'+id, function(err, result) {
		console.log(err);
		console.log(result);
	});
}

//console.log(query.sql);
//insertValue()
