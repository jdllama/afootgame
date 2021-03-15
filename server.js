let app = require("express")();
let http = require("http").createServer(app);
let Game = require("./GameClass.js");
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

/*
io.of("/").adapter.on("create-room", room => {
    console.log(`hey yo check this out ${room}`);
});*/

io.of("/").adapter.on("delete-room", room => {
    //console.log(`hey yo check this out ${room}`);
    //console.log(games[room]);
    if(games[room]) delete games[room];
});

io.sockets.on("connection", socket => {
    //socket.emit("games", {games: games.map(game => {return game.id})});

    //console.log("connected",io.of("/").sockets.size);
    socket.on("try join game", data => {
        let gameID = data.gameID;
        let activeGame = null;

        if(games[gameID]) {
            activeGame = games[gameID];
        }
        else {
            activeGame = new Game(data);
            games[gameID] = activeGame;
        }
        socket.nickname = data.nickname;
        activeGame.joinGame(socket, ()=>{
            socket.join(gameID);
            socket.gameID = gameID;
            //socket.emit("join successful");
            activeGame.updateAllPlayers();
        }, (err) => {
            socket.emit("error", `There was an error connecting to the game: ${err}`);
        });
        /*
        let gameIndex = -1;
        games.forEach((game, index) => {
            if(game.id === data.gameID) {
                gameIndex = index;
            }
        });
        let activeGame = null;
        if(gameIndex != -1) {
            activeGame = games[gameIndex];
            //activeGame.joinGame(socket);
        }
        else {
            activeGame = new Game({...data, socket: socket});
            //games.push(activeGame);
        }
        socket.join(data.gameID);
        socket.gameID = data.gameID;

        */
        /*
        activeGame.joinGame(socket);
        socket.whichGame = activeGame;
        console.log(socket.whichGame)
        */
    });
    socket.on("disconnecting", () => {
        let gameID = socket.gameID;
        if(gameID !== undefined) {
            games[gameID].playerLeavesGame(socket);
        }
        //console.log("disconnect",io.of("/").sockets.size);
        //console.log(socket);
        //socket.whichGame.playerLeavesGame(socket);
    });
});