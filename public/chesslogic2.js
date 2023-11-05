var ffish = null;

new Module().then(loadedModule => {
    ffish = loadedModule;
    console.log(`initialized ${ffish} ${loadedModule}`);
});

var selectedpremove = null;
var gamestarted = false;
var yourturn = 'w';
var promotion = 'q';
let board, game = null;
var pendingMove = null;
var pieceTheme = "lichess";
var localStorage = window.localStorage;

if (localStorage.getItem('pieceTheme')) {
    pieceTheme = localStorage.getItem('pieceTheme');
}

var pendingPromotionMove = {};
game = new Chess();

document.body.innerHTML += `<link rel="stylesheet" href="themes/${pieceTheme}.css">`;

function completePendingPromotionMove() {
    const moveResult = game.move({
        from: pendingPromotionMove.from,
        to: pendingPromotionMove.to,
        promotion: promotion
    });

    // was this a legal move?
    if (moveResult) {
        game.undo();
        // update to the new position
        board.set({
            fen: game.getFen()
        });

        onUserMoveEvent(moveResult);

        updateStatus();
        document.getElementById('promotion').style.display = "none";
    }
}

// Default Chessground config 
const chessgroundconfig = {

    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', // starting FEN

    orientation: 'white', // board orientation

    coordinates: true, // show ranks and files

    autoCastle: true, // automatically castle when king/rook move

    viewOnly: false, // restrict premoves, clicks, drag pieces

    disableContextMenu: false, // disable right click

    resizable: true, // allow resize

    animation: {
        enabled: true,
        duration: 200
    }, 

    movable: {
        free: false, // all moves are valid - no validation
        color: 'white', // allow both whites and blacks to move
        showDests: true, // highlight destinations
        dests: getDests(),
        showDests: true,
        rookCastle: true
    },

    drawable: {
        enabled: true,
        visible: true,
    },

    premovable: {
        enabled: true, // allow premoves for both colors
        events: {
            set: function(orig, dest) {
                selectedpremove = {
                    from: orig,
                    to: dest,
                    promotion: promotion
                };
            },
            unset: function() {
                selectedpremove = null;
            }
        }
    },

    predroppable: {
        enabled: false // disable predrops
    },

    highlight: {
        lastMove: true, // highlight last move
        check: true // highlight checks
    },

    events: {
        move: (orig, dest) => {
            const moveResult = game.move({
                from: orig,
                to: dest,
                promotion: promotion
            });

            // was this a legal move?
            if (moveResult) {
                if (moveResult.san.includes('=')) {
                    pendingPromotionMove = {
                        from: orig,
                        to: dest,
                    }
                    game.undo();
                    document.getElementById('promotion').style.display = "block";
                }else{
                    game.undo();
                    onUserMoveEvent(moveResult);
                }
            } else {
                board.set({
                    fen: game.getFen()
                });
            }
        },
        dropNewPiece: (role, key) => {
            // called when a new piece is dropped from pocket
            // add to position
        }
    }

};

board = Chessground(document.getElementById('board'), chessgroundconfig);

board.set({
    fen: game.getFen()
});

function getDests() {
    var moves = new Map();
    var letters = 'abcdefgh';
    letters.split("").forEach((letter) => {
        for (let number = 1; number <= 8; number++) {
            let legalMoves = game.moves({ square: (letter + number), verbose: true });
            let legalMovesFormatted = [];
            legalMoves.forEach(legalMove => {
                legalMovesFormatted.push(legalMove.to);
            });
            moves.set((letter + number), legalMovesFormatted);
        }
    });
    return moves;
}

board = Chessground(document.getElementById('board'), chessgroundconfig);
game = new Chess();

function moveMade(move) {

    let moveinfo = game.move(move);

    if (moveinfo) {
        if (yourturn == 'b') {
            board.set({
                orientation: "black"
            });
        }
        board.move(moveinfo.from, moveinfo.to);
        //board.set({lastMove: [moveinfo.from, moveinfo.to]});
        board.set({
            turnColor: (game.turn() == "w" ? 'white' : 'black'),
            movable: {
                free: false, // all moves are valid - no validation
                color: (yourturn == "w" ? 'white' : 'black'), // allow both whites and blacks to move
                showDests: true, // highlight destinations
                dests: getDests(),
                showDests: true,
            },
        });

        if (moveinfo.san.includes('x')) {
            let element = document.getElementById('piececaptured' + (game.turn() == "w" ? "1" : "0"));
            element.innerHTML = `${element.innerHTML}<img width="25" height="25" src="img/chesspieces/${pieceTheme}/${game.turn()}${moveinfo.captured.toUpperCase()}.png">`
        }
    }
    setInterval(() => {
        board.set({
            turnColor: (game.turn() == "w" ? 'white' : 'black'),
        });
    }, 3000);

    //board.set({check: (game.isCheck() ? (game.turn() == "w" ? 'white' : 'black') : false)});

    if (game.turn() == yourturn) {
        if (selectedpremove) {
            const moveinfo2 = game.move(selectedpremove);
            if (moveinfo2) {
                onUserMoveEvent(moveinfo2);
                game.undo();
            }
            selectedpremove = null;
        }
    }
    board.set({
        fen: game.getFen()
    });


    updateStatus();
};

function updateStatus() {
    let status = 'Seu turno';

    if (game.turn() !== yourturn) {
        status = "Turno do oponente";
    }

    document.getElementById('status').innerHTML = status;
}

function gameOver() {

    let winner = 'Empate';

    if (game.isCheckmate()) {
        winner = game.turn() === 'w' ? 'Vitória das pretas' : 'Vitória das Brancas'; 
    }

    document.getElementById('status').innerHTML = winner + `<button onclick="window.location.href = window.location.href;">RECARREGAR</button>`;

    localStorage.setItem('lastGamePgn', game.pgn());


}
function StartGame(turn) {
    game = new Chess();
    board = Chessground(document.getElementById('board'), chessgroundconfig);
    gamestarted = true;
    yourturn = turn;
    if (yourturn == 'b') {
        board.set({
            movable: {
                color: 'black'
            },
            orientation: "black"
        });
    }
    document.getElementById('promotion').innerHTML = `
    <button onclick="promotion = 'q'; completePendingPromotionMove();"><img src="img/chesspieces/${pieceTheme}/${yourturn}Q.png" style="width: 50%; height: 50%;"></button>
    <button onclick="promotion = 'r'; completePendingPromotionMove();"><img src="img/chesspieces/${pieceTheme}/${yourturn}R.png" style="width: 50%; height: 50%;"></button>
    <button onclick="promotion = 'b'; completePendingPromotionMove();"><img src="img/chesspieces/${pieceTheme}/${yourturn}B.png" style="width: 50%; height: 50%;"></button>
    <button onclick="promotion = 'n'; completePendingPromotionMove();"><img src="img/chesspieces/${pieceTheme}/${yourturn}N.png" style="width: 50%; height: 50%;"></button>`;
    updateStatus();
}
