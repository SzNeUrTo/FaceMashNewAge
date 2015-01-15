var mysql = require('mysql');
var temp = '';
var connection_db = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'toor',
	database : 'test_with_nodejs'
});
connection_db.connect(function(err) {});

var id_women = ['3','3']; // max --> min
var points = []; // max --> min
var images = [[],[]];

var port = 1234
var io = require('socket.io').listen(port);
io.sockets.on('connection', function() {
	console.log('Connected : ' + socket.id);
	io.socket.emit();
});

var Elo = require('arpad');
var elo = new Elo();
function winElo(winner, loser) {
	winner = elo.newRatingIfWon(winner,loser)
	return winner;
}

function loseElo(winner, loser) {
	loser = elo.newRatingIfLost(winner,loser)
	return loser;
}

function insertValue(data) {
	//var data  = {id:572060xxx, elo:1234, win:1, lose:100};
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

//console.log(id_women);
//console.log(points);
for (var i = 0; i < id_women.length; i++) {
	var id = id_women[i];
	getValueFormID(id, function(err, callback) {
		if (err) {
			console.error('Error!', err);
		} else {
			if (callback) {
				//console.log(callback[0].point);
				//console.log(i);
				var point = callback[0].point;
				points[points.length] = point;
				
			}
		}
	});
}



setTimeout(function() {
	console.log('points[] = ' + points)
	console.log('points.length = ' + points.length);
},2);
