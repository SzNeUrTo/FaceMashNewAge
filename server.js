var sync = require('synchronize');
var mysql = require('mysql');
var temp = '';
var connection_db = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'toor',
	database : 'test_with_nodejs'
});
connection_db.connect(function(err) {});


var indexs = {
	'561050xxxx':0,
	x564050xxxx:1
};

var id_all = ['56for','67adf'];
var points = [];

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
		temp = result;
	});
}

function getValueFormID(id, callback) {
	var query = connection_db.query('select * from table1 where id='+id, function(err, result) {
		if (err) {
			callback(err);
		} else {
			callback(null, result);
		}
	});
}

function updateValueAtID(id, point) {
	var query = connection_db.query('update table1 set point='+ point +'where id'+id, function(err, result) {
		console.log(err);
		console.log(result);
	});
}

id = 3
getValueFormID(id, function(err, callback) {
	if (err) {
		console.error('Error!', err);
	} else {
		console.log(callback);
		id = callback;
	}
});
