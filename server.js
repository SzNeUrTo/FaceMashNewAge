var mysql = require('mysql');
var temp = '';
var connection_db = mysql.createConnection({
	host     : 'localhost',
	user     : 'root', // change database
	password : 'toor', // change database
	database : 'test_with_nodejs' // change database
});
connection_db.connect(function(err) {});

var id_women = [
	'5410101529',
	'5410400020',
	'5410401671',
	'5410401697',
	'5410401719',
	'5410401778',
	'5410401867',
	'5410401891',
	'5410602579',
	'5410702638',
	'5410702808',
	'5411000564',
	'5411000602',
	'5411000637',
	'5411104394',
	'5411300550',
	'5411300827',
	'5411300941',
	'5411301076',
	'5411301173',
	'5411301262',
	'5411301289',
	'5411301467',
	'5411303419',
	'5510101253',
	'5510102934',
	'5510700521',
	'5610102588',
	'5610404371',
	'5610500061',
	'5610500222',
	'5610501784',
	'5610502365',
	'5610503922',
	'5610503931',
	'5610504546',
	'5610505909',
	'5611101496',
	'5611101623',
	'5611101631',
	'5711102192',
	'5711102206',
	'5711102214',
	'5711102354',
	'5711400819',
	'5711400835',
	'5711401068',
	'5711401289']; // max --> min (sort)

var pointsElo = []; // max --> min (sort)
var images = [0,3,3,3,3,3,3,3,0,2,2,0,3,2,3,3,2,0,3,2,0,3,3,0,0,1,2,3,3,3,3,3,2,3,3,2,3,3,3,3,0,0,0,0,0,0,0,0];
var names = {
	'5410101529':'ทันทิรา ชัยยะ',
	'5410400020':'มัณฑนา จาดสอน',
	'5410401671':'นันทภรณ์ บรรจบผล',
	'5410401697':'ปาณิศา สอนสุภาพ',
	'5410401719':'ณัฐภัสสร แตงทอง',
	'5410401778':'มนพร ศุภศิริรัตน์',
	'5410401867':'สกุลเกศ ปานเพ็ชร',
	'5410401891':'สุพัตรา บัณฑิตย์เสถียร',
	'5410602579':'ต้องจิต มะดะเรส',
	'5410702638':'ธนาภรณ์ ตางาม',
	'5410702808':'พลอยไพลิน ตันติทวีรัตน์',
	'5411000564':'กฤติญา อนันตทัศน์',
	'5411000602':'นำพร วงศ์นพรัตน์เลิศ',
	'5411000637':'พรชนก หุนมาตรา',
	'5411104394':'ชนากานต์ เรือนสุวรรณ',
	'5411300550':'ญาณิชกานต์ แจ่มเจริญ',
	'5411300827':'ฐิติพร พุฒิกรวงศ์ศรี',
	'5411300941':'นิธีวรา คุตตรานนท์',
	'5411301076':'ภัสวดี สุรีย์รัตนากร',
	'5411301173':'ศศิวรรณ งามศิริอุดม',
	'5411301262':'สุพัฒนา ยิ่งยงค์',
	'5411301289':'สุพิชญา เกิดฟูกทิพย์',
	'5411301467':'ชมพูนิกข์ ภูมิพิระรัถยา',
	'5411303419':'สุรภา ทวีนิธิกร',
	'5510101253':'กฤษณา เจริญสง่า',
	'5510102934':'นาเดีย ศรีอดุลย์พันธุ์',
	'5510700521':'นริศรา ศรีสถิตย์ธรรม',
	'5610102588':'ฐาปณีย์ ศรศาสตร์',
	'5610404371':'ณิชกานต์ จินานุกูลวงศ์',
	'5610500061':'ศลิษา อติวัฒนชัย',
	'5610500222':'ชุติกาญจน์ น้อยกาญจนะ',
	'5610501784':'ชนากานต์ สุขเมตตา',
	'5610502365':'พรอุมา พรหมสิรินิมิต',
	'5610503922':'พิมวนัช โกศิยะกุล',
	'5610503931':'ภัทรพร ตุลาธรรม',
	'5610504546':'กัญฐิสา หงษ์ทอง',
	'5610505909':'ฐิติวรดา ฉัตรอุดมเกียรติ',
	'5611101496':'ณิชาภา เอกธนากุลพัชร',
	'5611101623':'รติมา เอียสกุล',
	'5611101631':'ลลิตา แซ่ตั้ง',
	'5711102192':'กัญวรา อัศวชัยกุล',
	'5711102206':'กานต์ธิดา เฮงตระกูล',
	'5711102214':'ขวัญชนก ประภากรสกุล',
	'5711102354':'รัชณีกร พินิจไชย',
	'5711400819':'จิราพร สุวงค์',
	'5711400835':'ชลธิชา ตุ่นคำ',
	'5711401068':'พิชญา พยับบรรณางกูร',
	'5711401289':'อัญชิษฐา ชายหงษ์'
};

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

function randomImageSuffixName(index) {
	//return images[Math.floor(Math.random() * images.length)];
	return Math.floor(Math.random() * images[index]);
}

function randomMatch() {
	var idWoman1 = -1, idWoman2 = -1, imagePathWoman1, imagePathWoman2;
	var indexWoman1 = -1, indexWoman2 = -1;
	while (indexWoman1 < 0) {
		indexWoman1 = Math.floor(Math.random() * id_women.length);
		if (images[indexWoman1] != 0) {
			break;
		}
		else {
			indexWoman1 = -1;
		}
	}

	while (indexWoman2 < 0) {
		indexWoman2 = Math.floor(Math.random() * id_women.length);
		if (images[indexWoman2] != 0 && indexWoman1 != indexWoman2) {
			break;
		}
		else {
			indexWoman2 = -1;
		}
	}

	idWoman1 = id_women[indexWoman1];
	idWoman2 = id_women[indexWoman2];

	var nameWoman1 = names[idWoman1];
	var nameWoman2 = names[idWoman2];

	imagePathWoman1 = './images/' + idWoman1 + randomImageSuffixName(indexWoman1);
	imagePathWoman2 = './images/' + idWoman2 + randomImageSuffixName(indexWoman2);



	var woman1 = {id:idWoman1, name:nameWoman1, path:imagePathWoman1}
	var woman2 = {id:idWoman2, name:nameWoman2, path:imagePathWoman2}

	match = [woman1, woman2];
	return match;
	
}

// ============================================
for (var i = 0; i < id_women.length; i++) {
	var id = id_women[i];
	getValueFormID(id, function(err, callback) {
		if (err) {
			console.error('Error!', err);
		} else {
			if (callback) {
				//console.log(callback[0].elo);
				//console.log(i);
				var pointElo = callback[0].elo;
				pointsElo.push(pointElo);
				
			}
		}
	});
}

setTimeout(function() {
	console.log('pointsElo[] = ' + pointsElo)
	console.log('pointsElo.length = ' + pointsElo.length);
},2);
