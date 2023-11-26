const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const ffish = require('ffish');
const db = require('./database');

db.delete("nextRoomId");
db.empty();

ffish['onRuntimeInitialized'] = () => {
ffish.loadVariantConfig(require('./variants.js'));
  console.log(ffish.variants())
}



//
/*
db.set("key", "value");
let key = db.get("key");
console.log(key);
*/

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  pingInterval: 25000,
  pingTimeout: 20000,
});

var nextRoomId = 0;

var dbNextRoomId = parseInt(db.get("nextRoomId"));
if (dbNextRoomId) {
  nextRoomId = dbNextRoomId;
} else {
  db.set("nextRoomId", 0);
  for (let i = 0; i < nextRoomId; i++) {
    try {
      db.delete('room-' + i);
    } catch { }
  }
}


const CLOCK_TIME = 1800;


var clientsInfo = {};

const RATING_MAX_OFFSET = 150;

const androiddownloadlink = "https://drive.google.com/file/d/152-GotbvlDBNjJFW5505GW87NB1zXcW_/view?usp=drive_link";

const most_recent_version = "0.5";

app.use(express.static('public'));

app.get('/downloadandroid', (req, res) => {
  res.send(`<script>window.location.href = '${androiddownloadlink}';</script>`);
});

app.get('/room/:roomId', async (req, res) => {
  if (rooms[req.params.roomId]) {
    res.send(`<script>window.location.href = '/?id=${req.params.roomId}';</script>`);
  } else {
    let roompgn = db.get('room-' + req.params.roomId);
    if (roompgn) {
      res.send(`<script>window.location.href = 'oxadrez://viewpgn?pgn=${encodeURIComponent(roompgn)}';window.location.href = '/downloadapp.html';</script>`);
    }
  }
});


app.get('/puzzle/:puzzleId', (req, res) => {
  res.send(`<script>window.location.href = 'oxadrez://viewpuzzle?id=${req.params.puzzleId}';window.location.href = '/downloadapp.html';</script>`);
});

var rooms = {};

var waitingrooms = {
  "20": [],
  "60": [],
  "120": [],
  "300": [],
  "600": [],
  "900": [],
  "1800": [],
  "3600": [],
  "7200": [],
};

io.on('connection', socket => {

  clientsInfo[socket.id] = {};

  clientsInfo[socket.id].elo = 500;
  clientsInfo[socket.id].username = "Usuário";

  socket.on('createRoom', async (variantname) => {
    if (!variantname) {
      variantname = "chess";
    }
    try {
      if (!rooms[nextRoomId]) {
        rooms[nextRoomId] = { started: false, variantname: variantname, game: new ffish.Board(variantname), white: socket };
        //rooms[nextRoomId].game.header('Event', 'Normal Chess Game', 'Site', 'https://oxadrez.com', 'Variant', 'Standart', 'TimeControl', `${CLOCK_TIME}+0`, 'White', `Usuário(1000)`, 'Black', `Usuário(1000)`);
        socket.emit('roomCreated', nextRoomId);

        nextRoomId += 1;
        db.set("nextRoomId", nextRoomId);

      }
    } catch {

    }
  });

  socket.on('disconnect', (reason) => {
    Object.keys(waitingrooms).forEach((waitingroom) => {
      if (waitingrooms[waitingroom].includes(socket)) {
        waitingrooms[waitingroom].splice(waitingrooms[waitingroom].indexOf(socket), 1);
      }
    })
    try {

      Object.keys(rooms).forEach((roomId) => {
        if (rooms[roomId].black && rooms[roomId].black.id == socket.id) {
          try {
            if (rooms[roomId].white) {
              rooms[roomId].white.emit('gameOver');
            }
            if (rooms[roomId].black) {
              rooms[roomId].black.emit('gameOver');
            }
          } catch { }

          db.set(`room-${roomId}`, rooms[roomId].pgn);

          delete rooms[roomId];
        }
        if (rooms[roomId].white && rooms[roomId].white.id == socket.id) {
          try {
            if (rooms[roomId].white) {
              rooms[roomId].white.emit('gameOver');
            }
            if (rooms[roomId].black) {
              rooms[roomId].black.emit('gameOver');
            }
          } catch { }

          db.set(`room-${roomId}`, rooms[roomId].pgn);

          delete rooms[roomId];

        }
      });
    } catch { }
    delete clientsInfo[socket.id];
  });

  socket.on('checkupdate', (app_version) => {
    if (app_version == most_recent_version) {
      socket.emit('updated');
    } else {
      socket.emit('not updated');
    }
  });

  socket.on('quickMatch', async (selectedtime) => {
    if (!selectedtime || !waitingrooms[selectedtime.toString()]) {
      selectedtime = 1800;
    }
    try {
      if (waitingrooms[selectedtime.toString()]) {
        waitingrooms[selectedtime.toString()].push(socket);
        while (waitingrooms[selectedtime.toString()].length >= 2) {
          roomId = nextRoomId;
          rooms[roomId] = { started: true, variantname: "chess", game: new ffish.Board("chess"), white: waitingrooms[selectedtime.toString()][0], black: waitingrooms[selectedtime.toString()][1], whiteTime: selectedtime, blackTime: selectedtime };
          if (Math.random() < 0.5) {
            rooms[roomId] = { started: true, variantname: "chess", game: new ffish.Board("chess"), white: waitingrooms[selectedtime.toString()][0], black: waitingrooms[selectedtime.toString()][1], whiteTime: selectedtime, blackTime: selectedtime };
          }
          //rooms[nextRoomId].game.header('Event', 'Normal Chess Game', 'Site', 'https://oxadrez.com', 'Variant', 'Standart', 'TimeControl', `${selectedtime}+0`, 'White', `Usuário(1000)`, 'Black', `Usuário(1000)`);
          rooms[roomId].white.emit('joinPermitted', roomId, 'b', selectedtime, selectedtime, clientsInfo[rooms[roomId].white.id].elo, clientsInfo[rooms[roomId].black.id].elo, clientsInfo[rooms[roomId].white.id].username, clientsInfo[rooms[roomId].black.id].username, rooms[roomId].game.fen(), rooms[roomId].variantname);
          rooms[roomId].black.emit('joinPermitted', roomId, 'w', selectedtime, selectedtime, clientsInfo[rooms[roomId].black.id].elo, clientsInfo[rooms[roomId].white.id].elo, clientsInfo[rooms[roomId].black.id].username, clientsInfo[rooms[roomId].white.id].username, rooms[roomId].game.fen(), rooms[roomId].variantname);
          nextRoomId += 1;
          db.set("nextRoomId", nextRoomId);



          waitingrooms[selectedtime.toString()].splice(0, 2);
        }
      }
    } catch { }
  });

  socket.on('joinRoom', (roomId) => {
    if (!roomId || !rooms[roomId]) {
      rooms[nextRoomId] = { started: false, variantname: "chess", game: new ffish.Board("chess"), white: socket };
      socket.emit('roomCreated', nextRoomId);

      nextRoomId += 1;
      db.set("nextRoomId", nextRoomId);

    } else if (!rooms[roomId].black) {
      rooms[roomId].black = socket;
      rooms[roomId].whiteTime = CLOCK_TIME;
      rooms[roomId].blackTime = CLOCK_TIME;
      if (Math.random() < 0.5) {
        const whitetemp = rooms[roomId].white;
        const blacktemp = rooms[roomId].black;
        rooms[roomId].white = blacktemp;
        rooms[roomId].black = whitetemp;
      }
      if (rooms[roomId]) {
        rooms[roomId].white.emit('joinPermitted', roomId, 'b', CLOCK_TIME, CLOCK_TIME, clientsInfo[rooms[roomId].white.id].elo, clientsInfo[rooms[roomId].black.id].elo, clientsInfo[rooms[roomId].white.id].username, clientsInfo[rooms[roomId].black.id].username, rooms[roomId].game.fen(), rooms[roomId].variantname);
        rooms[roomId].black.emit('joinPermitted', roomId, 'w', CLOCK_TIME, CLOCK_TIME, clientsInfo[rooms[roomId].black.id].elo, clientsInfo[rooms[roomId].white.id].elo, clientsInfo[rooms[roomId].black.id].username, clientsInfo[rooms[roomId].white.id].username, rooms[roomId].game.fen(), rooms[roomId].variantname);
        rooms[roomId].started = true;
      } else {
        socket.emit('joinDenied', roomId);
      }
    }
  });

  socket.on('makeMove', ({ room, move }) => {
    try {

      if (!rooms[room] || !rooms[room].started) {

      } else {
        if (rooms[room].game.turn() && rooms[room].white.id == socket.id) return;
        if (!rooms[room].game.turn() && rooms[room].black.id == socket.id) return;

        //rooms[room].game.setComment(`[% clk ${(rooms[room].game.turn() == 'w' ? rooms[room].blackTime : rooms[room].whiteTime)}]`);    console.log(rooms[room].game.legalMovesSan());
        if (rooms[room].game.legalMovesSan().includes(move.san)) {
          rooms[room].game.pushSan(move.san);

          if (!rooms[room].moves) {
            rooms[room].moves = [move.san];
          }else{
            rooms[room].moves.push(move.san);
          }

          var outputpgn = "1. ";
          rooms[room].moves.forEach((movetmp, indextmp) => {
            outputpgn += movetmp + " ";
            if ((indextmp % 2) == 1) {
              outputpgn += `${(indextmp + 3) / 2}. `;
            }
          });
          rooms[room].pgn = outputpgn;

          rooms[room].white.emit('moveMade', move, rooms[room].whiteTime, rooms[room].blackTime);
          rooms[room].black.emit('moveMade', move, rooms[room].blackTime, rooms[room].whiteTime);

          if (rooms[room].game.isGameOver()) {
            rooms[room].white.emit('gameOver');
            rooms[room].black.emit('gameOver');
            db.set(`room-${room} `, rooms[room].pgn);

            delete rooms[room];
          }
        }
      }
    } catch {

    }
  });

});


setInterval(() => {
  Object.keys(rooms).forEach((roomId) => {
    if (rooms[roomId].started) {
      if (!rooms[roomId].game.turn()) {
        rooms[roomId].whiteTime -= 0.1;
        if (rooms[roomId].whiteTime <= 0) {
          rooms[roomId].white.emit('timeOver', "b");
          rooms[roomId].black.emit('timeOver', "b");

          db.set(`room-${roomId} `, rooms[roomId].pgn);

          delete rooms[roomId];
        }
      } else {
        rooms[roomId].blackTime -= 0.1;
        if (rooms[roomId].blackTime <= 0) {
          rooms[roomId].white.emit('timeOver', "w");
          rooms[roomId].black.emit('timeOver', "w");


          db.set(`room-${roomId} `, rooms[roomId].pgn);

          delete rooms[roomId];
        }
      }
    }
  });
}, 100);

server.listen(3000);

/* frontend js


function createRoom() {
    socket.emit('createRoom');
    socket.on('roomCreated', room => {
        roomId = room;
        board = Chessboard2('board', config);
        board.start();
    });
}

function joinRoom(room) {
    socket.emit('joinRoom', room);
}


*/