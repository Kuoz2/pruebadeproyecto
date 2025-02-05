const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/multikart-admin'));

app.get('/*', function (req, res) {
   res.setFile(path.join(__dirname + '/dist/multikart-admin/index.html'))
});



//    origin: "http://localhost:4200",
//var server = require('http').Server(app);
var server = require('http').createServer(app);
const io = require('socket.io')(server)
//    res.setHeader('Access-Control-Allow-Origin','http://localhost:4200');

app.use((req, res ,next) => {
    res.setHeader('Access-Control-Allow-Origin','https://vyt-computacion.herokuapp.com');
    res.setHeader('Acces-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Acces-Contorl-Allow-Methods','Content-Type','Authorization');
    next();
})

//app.use(express.static(__dirname + '/dist/multikart-admin/index.html'))

io.on('connection', (socket) => {
   // socket.on('disconnect', () => {
     //   console.log('user disconnected');
     //});
const idHandShake = socket.id
const {nameRoom} = socket.handshake.query

console.log(`hola dispositivo ${idHandShake} --> ${nameRoom}`)

socket.join(nameRoom)
socket.on('event', (res) => {
  console.log(res)
  socket.emit('event',res);
  socket.to(nameRoom).emit('event', res);
})
socket.on('marcaEvnt', (res) => {
  console.log(res)
  socket.emit('marcaEvnt',res);
  socket.to(nameRoom).emit('marcaEvnt', res);
})
socket.on('BitacoraEvent', (res) => {
  console.log("respuesta el socket",res)
  socket.emit('BitacoraEvent',res);
  socket.to(nameRoom).emit('BitacoraEvent', res);
})

socket.on("disconnect", () => {
  console.log(socket.id); // undefined
});

})


  server.listen(process.env.PORT || 3000, () => {

    console.log(process.env.PORT)
  });

  //01 03 04 06 07 08 10 11 12 14 15 18 22 25