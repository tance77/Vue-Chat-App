var path = require('path')
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var users = names = {};

server.listen(3000);

function logData(message){
  var d = new Date();
  var time = '[' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + '] ';
  console.log(time + message);
}

console.log("Chat server has booted..");
io.on('connection', function(socket){

  socket.on('join', function(user){
    logData("User "+ user[2] + " has connected to channel " + user[0] + ".");
    socket.userId = user[1];
    socket.userName = user[2];

    users[user[1]] = socket;

    names[user[1]] = {
      'name': user[2],
      'socketId': socket.id
    };

    function updateNames(){
      io.emit('chat.' + user[0], names);
    }

    updateNames();

    socket.on('chat', function(payload){
      io.emit('chat.' + payload[0], payload);
    });

    socket.on('disconnect', function(){
      if(!socket.name) return;

      delete users[user[1]];
      delete names[user[1]];

      updateNames();

    });
  });
});


module.exports = {
  build: {
    index: path.resolve(__dirname, 'dist/index.html'),
    assetsRoot: path.resolve(__dirname, 'dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true
  },
  dev: {
    port: 8080,
    proxyTable: {}
  }
}
