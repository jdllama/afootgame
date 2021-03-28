let app = require("express")();
let http = require("http").createServer(app);
//const { default: Player } = require("../client/src/game/Player.js");
let Game = require("./GameClass.js");
let Player = require("./PlayerClass.js");
const PORT = 8080;

let games = {};

let io = require("socket.io")(http);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
})

//app.use(require("express").static("public"));

http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

io.of("/").adapter.on("delete-room", room => {
    if(games[room]) delete games[room];
});

io.sockets.on("connection", socket => {
    socket.on("try join game", data => {
        let gameID = data.gameID;
        let activeGame = null;
        let setMod = (socket) => {};
        let setFirstPlayer = (socket) => {};
        if(games[gameID]) {
            activeGame = games[gameID];
        }
        else {
            activeGame = new Game(data);
            activeGame.setMod(socket);
            setMod = (socket) => {
                activeGame.setMod(socket.client.id);
            };
            setFirstPlayer = (socket) => {
                activeGame.moveToPlayer(socket.client.id);
            };
            games[gameID] = activeGame;

        }
        socket.nickname = data.nickname;
        //let player = new Player(socket);
        activeGame.joinGame(socket, ()=>{
            socket.join(gameID);
            socket.gameID = gameID;
            setFirstPlayer(socket);
            setMod(socket);
            
            activeGame.updateAllPlayers();
        }, (err) => {
            socket.emit("error", `There was an error connecting to the game: ${err}`);
        });
    });
    socket.on("disconnecting", () => {
        let gameID = socket.gameID;
        if(gameID !== undefined) {
            games[gameID].playerLeavesGame(socket);
        }
    });

    //actual game logic goes here

    socket.on("try start game", () => {
        let gameID = socket.gameID;
        if(gameID !== undefined) {
            //games[gameID].playerLeavesGame(socket);
            let game = games[gameID];
            if(game !== undefined) {
                game.authenticateUser(socket.client.id, () => {
                    game.startGame(() => {
                        game.updateAllPlayers();
                    },(err) => {
                        socket.emit("error", `There was an error starting the game: ${err}`);
                    })
                    
                });
            }
            else socket.emit("error", "There was an error starting the game: No Game found");
        }
        else socket.emit("error", "There was an error starting the game: game not assigned");
    });

    socket.on("make player", playerSocketID => {
        let gameID = socket.gameID;
        if(gameID !== undefined) {
            //games[gameID].playerLeavesGame(socket);
            let game = games[gameID];
            if(game !== undefined) {
                game.authenticateUser(socket.client.id, () => {
                    //console.log(socket.to(thiefSocketID), thiefSocketID, gameID);
                    game.moveToPlayer(playerSocketID);
                    game.updateAllPlayers();
                });
            }
            else socket.emit("error", "There was an error making the spectator a player: No Game found");
        }
        else socket.emit("error", "There was an error making the spectator a player: No Game found");
    });

    socket.on("make spectator", playerSocketID => {
        let gameID = socket.gameID;
        if(gameID !== undefined) {
            let game = games[gameID];
            if(game !== undefined) {
                game.authenticateUser(socket.client.id, () => {
                    //console.log(socket.to(thiefSocketID), thiefSocketID, gameID);
                    game.moveToSpectator(playerSocketID);
                    game.updateAllPlayers();
                });
            }
            else socket.emit("error", "There was an error making the player a spectator: No Game found");
        }
        else socket.emit("error", "There was an error making the player a spectator: No Game found");
    });

    socket.on("make thief", thiefSocketID => {
        let gameID = socket.gameID;
        if(gameID !== undefined) {
            //games[gameID].playerLeavesGame(socket);
            let game = games[gameID];
            if(game !== undefined) {
                game.authenticateUser(socket.client.id, () => {
                    //console.log(socket.to(thiefSocketID), thiefSocketID, gameID);
                    game.setThief(thiefSocketID);
                    game.updateAllPlayers();
                });
            }
            else socket.emit("error", "There was an error making the thief: No Game found");
        }
        else socket.emit("error", "There was an error making the thief: No Game found");
    })
});