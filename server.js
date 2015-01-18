var mysql = require('mysql');
var temp = '';
var connection_db = mysql.createConnection({
	host     : 'localhost',
	user     : 'root', // change database
	password : 'toor', // change database
	database : 'test_with_nodejs' // change database
});
connection_db.connect(function(err) {});

var id_women = []; // max --> min (sort)
var pointsElo = []; // max --> min (sort)
var images = [[],[]];
var names = {
	'572050xxxx':'test test'
}

var indexImages = {
	'572050xxxx':0,
	'572050xxxx':1,
	'572050xxxx':-1, // InActive
}

var port = 1234
var io = require('socket.io').listen(port);
io.sockets.on('connection', function(socket) {
	console.log('Connected : ' + socket.id);
	var match = randomMatch();
	io.socket.emit('Connected', match); // prints id_women names
	// socket on  lisener on  emit return quickly (click)
	// ---> updateDatabase... (id1, id2 --> winner loser)
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
	var query = connection_db.query('select * from table1 where id=' + id, function(err, result) {
		if (err) {
			callback(err);
		} else {
			callback(null, result);
		}
	});
}

function updateValueAtID(id, eloPoint, win, lose) {
	var query = connection_db.query('update table1 set elo=' + eloPoint + ',win=' + win + ',lose=' + lose + 'where id' + id, function(err, result) {
	});
}

function sortpointsElo() { // BubbleSort
	for (var i = 0; i < pointsElo.length; i++) {
		for (var j = 0; j < pointsElo.length - 1; j++) {
			if (i != j) {
				if (pointsElo[j] < pointsElo[j+1]) {
					var temp = pointsElo[j];
					pointsElo[j] = pointsElo[j+1];
					pointsElo[j+1] = temp;

					temp = id_women[j];
					id_women[j] = id_women[j+1];
					id_women[j+1] = temp;
				}
			}
		}
	}
}

function randomImageNameIndex(id_index) {
	return images[Math.floor(Math.random() * images.length)];
}

function randomMatch() {
	var match 
	return match;;
	
}

//console.log(id_women);
//console.log(pointsElo);
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
				pointsElo[pointsElo.length] = point;
				
			}
		}
	});
}

setTimeout(function() {
	console.log('pointsElo[] = ' + pointsElo)
	console.log('pointsElo.length = ' + pointsElo.length);
},2);
