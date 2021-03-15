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

io.of("/").adapter.on("delete-room", room => {
    if(games[room]) delete games[room];
});

io.sockets.on("connection", socket => {
    socket.on("try join game", data => {
        let gameID = data.gameID;
        let activeGame = null;

        if(games[gameID]) {
            activeGame = games[gameID];
        }
        else {
            activeGame = new Game(data);
            activeGame.setMod(socket);
            games[gameID] = activeGame;

        }
        socket.nickname = data.nickname;
        activeGame.joinGame(socket, ()=>{
            socket.join(gameID);
            socket.gameID = gameID;
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
});