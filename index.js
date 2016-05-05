var app = require('express')();
var server = require('http').Server(app);

var io = require('socket.io')(server);

// app.get('/', function(request, response){
//   response.send('Hello World');
// });

server.listen(3000);


function logData(message){
  var d = new Date();
  var time = '[' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + '] ';

  console.log(time + message);
}


console.log("Chat server has booted..");
io.on('connection', function(socket){
  socket.on('join', function(user){
    logData("User "+ user[2] + " has connected to channel" + user[0] + ".");
    logData(user);
  });
});
