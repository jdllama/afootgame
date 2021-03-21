const defaultMap = require("./demoRoom");
let Player = require("./PlayerClass");
module.exports = class Game {
    constructor(obj) {
        this.gameID = obj.gameID;
        this.players = [];
        this.currentPlayer = null;
        this.thief = null;
        this.isThiefVisible = false;
        this.gameMap = [...defaultMap];
        this.gameStatus = "pending";
        this.mod = null;

        this.joinGame = this.joinGame.bind(this);
        this.playerLeavesGame = this.playerLeavesGame.bind(this);
        this.updateAllPlayers = this.updateAllPlayers.bind(this);
        this.setMod = this.setMod.bind(this);
        this.setThief = this.setThief.bind(this);
        this.isCurrentPlayer = this.isCurrentPlayer.bind(this);
        this.startGame = this.startGame.bind(this);
        this.authenticateUser = this.authenticateUser.bind(this);
    }

    startGame() {
        this.isThiefVisible = false;
        this.gameMap = [...defaultMap];
        this.currentPlayer = null;
        this.gameStatus = "objectivePlacement";
    }

    joinGame(socket, success, fail) {
        if(this.players.length <= 5) {
            if(this.gameStatus !== "pending") {
                return fail("Game is currently active");
            }
            this.players.push(socket);
            success();
        }
        else fail("Room is full");
    }

    setMod(socket) {
        this.mod = socket;
    }

    setThief(socket) {
        let thief = null;
        this.players.forEach(player => {
            //console.log("Fart", player);
            if(player.client.id === socket) thief = player;
        })
        this.thief = thief;
    }

    isCurrentPlayer(socketID, success, failure = () => {}) {
        if(!this.currentPlayer) return failure();
        if(this.currentPlayer.client.id === socketID) {
            success();
        }
        else {
            failure();
        }
    }

    authenticateUser(socketID, success, failure = () => {}) {
        if(!this.mod) return failure();
        if(this.mod.client.id === socketID) {
            success();
        }
        else {
            failure();
        }
    }

    updateAllPlayers() {
        this.players.forEach(socket => {
            let data = {
                players: this.players.map(player => {
                    return {
                        nickname: player.nickname,
                        isMe: player.client.id === socket.client.id,
                        isMod: player.client.id === this.mod.client.id,
                        isThief: (this.thief && (this.thief.client.id === player.client.id)) ? true : false,
                        socketID: player.client.id
                    }
                }),
                thief: this.thief ? this.thief.client.id : null,
                gameMap: this.gameMap.map(row => {
                    return row.map(cell => {
                        let fakeCell = {...cell};
                        //console.log(fakeCell);
                        if(this.thief) {
                            if(socket.client.id === this.thief.client.id) {
                                //I might need to do some kind of logic in the future, you never know!
                            }
                            else {
                                fakeCell.currentPlayers = fakeCell.currentPlayers.filter(player => {
                                    return player.client.id !== this.thief.client.id;
                                });
                            }
                        };
                        return fakeCell;
                    })
                }),
                
                gameStatus: this.gameStatus,
                inGame: true,
                amIMod: socket.client.id === this.mod.client.id,
            };
            //console.log(data);
            socket.emit("game update", data);
        });
    }

    playerLeavesGame(socket) {
        this.players = this.players.filter(player => {
            return player.client.id !== socket.client.id;
        });
        if(this.mod.client.id === socket.client.id) {
            if(this.players[0] !== undefined) this.setMod(this.players[0]);
        }
        this.updateAllPlayers();
    }
}