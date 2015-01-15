var mysql = require('mysql');
var connection_db = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'toor',
	database : 'test_with_nodejs'
});
connection_db.connect(function(err) {});

//var io = require('socket.io').listen(SOCKETIO_PORT);
//io.sockets.on('connection', function() {
//	console.log('Connected : ' + socket.id);
//	io.socket.emit();
//});

function insertValue(data) {
	//var data  = {id:3, name: 'test', point:20};
	var query = connection_db.query('INSERT INTO table1 SET ?', data, function(err, result) {
		console.log(err);
		console.log(result);
	});
}

function getValueFormID(id) {
	var query = connection_db.query('select * from table1 where id='+id, function(err, result) {
		console.log(err);
		console.log(result);
		return result;
	});
	return query;
}

function updateValueAtID(id, point) {
	var query = connection_db.query('update table1 set point='+ point +'where id'+id, function(err, result) {
		console.log(err);
		console.log(result);
	});
}


//console.log(query.sql);
//insertValue()
//insertValue({id:3, point:20 name:'test test2'});
getValueFormID(3);
