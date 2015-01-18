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
var images = [0, 3];
var names = {
	'572050xxxx':'test test'
}

var port = 1234
var io = require('socket.io').listen(port);
io.sockets.on('connection', function(socket) {
	console.log('Connected : ' + socket.id);
	var match = randomMatch();
	io.socket.emit('Connected', match); // prints id_women names
	// io.socket.emit('Ranking',

	sockets.on('Update', function(winnerID, loserID) {
		var winnerIndexID = id_women.indexOf(winnerID);
		var loserIndexID = id_women.indexOf(loserID);
		var winner = pointsElo[winnerIndexID];
		var loser = pointsElo[loserIndexID];
		winner = winElo(winner, loser);
		loser = loseElo(winner, loser);
		updateDBValueAtID(winner, winnerID, 0, 0);
		updateDBValueAtID(loser, loserID, 0, 0);
		sortpointsElo();
		match = randomMatch();
		io.sockets.emit('NewMatch', match); // prints id_women names
		//io.sockets.socket(socket.id).emit('NewMatch', match); // prints id_women name
		// io.socket.emit('Ranking',
	});

	// I want to test this code
	//sockets.on('Update', function(socket, winnerID, loserID) {
	//	var winnerIndexID = id_women.indexOf(winnerID);
	//	var loserIndexID = id_women.indexOf(loserID);
	//	var winner = pointsElo[winnerIndexID];
	//	var loser = pointsElo[loserIndexID];
	//	winner = winElo(winner, loser);
	//	loser = loseElo(winner, loser);
	//	updateDBValueAtID(winner, winnerID, 0, 0);
	//	updateDBValueAtID(loser, loserID, 0, 0);
	//	sortpointsElo();
	//	//io.sockets.emit('NewMatch', match); // prints id_women names
	//	io.sockets.socket(socket.id).emit('NewMatch', match); // prints id_women name
	// 	io.socket.emit('Ranking',
	//});
	// I want to test this code
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

function updateDBValueAtID(id, eloPoint, win, lose) {
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

					temp = images[j];
					images[j] = images[j+1];
					images[j+1] = temp;
				}
			}
		}
	}
}

function randomImageSuffixName(id) {
	//return images[Math.floor(Math.random() * images.length)];
	return Math.floor(Math.random() * images[id]);
}

function randomMatch() {
	var match 
	return match;;
	
}

// ============================================
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
