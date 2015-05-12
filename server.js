var path = require('path');

var express = require('express');
var app = express();

var http = require('http');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './client')));

app.get('/', function(req, res)
{
	res.render('index');
});


var server = app.listen(8000, function()
{
	console.log('listening on port 8000');
});

var users = [];
var messages = [];
var words = ['dog', 'cat', 'egg', 'snake', 'elephant', 'tree', 'bird'];
// var word = words[Math.floor(Math.random() * words.length)];
var word = '';
// var whiteboard_list = [];

var totalUsers = 0;
var stepID = 0;
var friendsGroup = [];

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
	console.log("We are using sockets!");

	socket.on('drawRequest', function(data){
		console.log(data);
		socket.broadcast.emit('drew', data);
	})

	socket.on("start_point", function(output){
		console.log('in the server', output);
		socket.broadcast.emit('start_drawing', output);
	})

	socket.on('drawingRequest', function(data, data2){
		socket.broadcast.emit('drawn', data, data2);
	})

	socket.on("clear_all", function(data){
		socket.broadcast.emit("server_clear", data);
	})
	// socket.on("stop", function(data){
	// 	// console.log('stop', data);
	// 	socket.broadcast.emit("stop_drawing", data);
	// })

	// socket.on('drawingRequest', function(data){
		// console.log('in the server', data);
		// socket.broadcast.emit('drew', data);
	// })

	socket.on('try_clear', function(data){
		io.emit('cleared', {some:'data'});
	})

	// socket.on('adduser', function(data){
	// 	users.push(data);
	// 	name = data;
	// 	console.log(users);
	// 	socket.broadcast.emit('got_a_new_user', data);
	// })

	socket.on('need_word', function(data){
		word = words[Math.floor(Math.random() * words.length)];

		socket.emit('sending_word', word);
		socket.broadcast.emit('word_chosen', 'A word has been chosen');
	})

	socket.on('guess_c', function(data){
		if(data === word)
		{
			socket.broadcast.emit('user_guess_c', 'Another player has guessed it properly!');
			socket.emit('you_guess_c', 'You got it!!!');
		}
		else
		{
			socket.broadcast.emit('user_guess_w', 'Another player has guessed incorrectly');
			socket.emit('you_guess_w', 'Guess Again');
		}
	})

//---------------------MOUSE STUFF------------------------------------------------------------->

  var thisID = getID();
  // step users++
  addUser();
  // new connection ALL
  io.sockets.emit('connected', { connections: totalUsers });
  // new connection friends
  socket.broadcast.emit('new friend', { friend: thisID  });
  // new connection self
  socket.emit('init',{ player:thisID, friends: friendsGroup });
  // disconnect friends
  socket.on('disconnect', function (){
      removeUser(thisID);
      socket.broadcast.emit('bye friend',{connections:totalUsers, friend: thisID});
  });
  // mouse move
  socket.on('move',function(data){
      socket.broadcast.emit('move', data);
  });
  //console.log(friendsGroup);
// });

// Functions

function getID() {
    friendsGroup.push(++stepID);
    return stepID;
}

function addUser(){
    totalUsers++;
}

function removeUser(thisID){
    friendsGroup = removeFromArray(thisID,friendsGroup);
    totalUsers--;
}

// Helpers

function removeFromArray(string, array) {
  var i = 0;
  for(i in array){
    if(array[i] === string){
      array.splice(i,1);
    }
  }
  return array;
}
	
})










