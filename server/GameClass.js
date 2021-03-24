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
            //this.players.push(socket);
            let player = new Player(socket);
            this.players.push(player);
            success(player);
        }
        else fail("Room is full");
    }

    setMod(socketID) {
        //this.mod = socket;
        let mod = null;
        this.players.forEach(player => {
            if(player.id === socketID) mod = player;
        })
        this.mod = mod;
    }

    setThief(socket) {
        let thief = null;
        this.players.forEach(player => {
            if(player.id === socket) thief = player;
        })
        this.thief = thief;
    }

    isCurrentPlayer(socketID, success, failure = () => {}) {
        if(!this.currentPlayer) return failure();
        if(this.currentPlayer.id === socketID) {
            success();
        }
        else {
            failure();
        }
    }

    authenticateUser(socketID, success, failure = () => {}) {
        if(!this.mod) return failure();
        if(this.mod.id === socketID) {
            success();
        }
        else {
            failure();
        }
    }

    updateAllPlayers() {
        this.players.forEach(player => {
            let data = {
                players: this.players.map(playerInner => {
                    return {
                        nickname: playerInner.nickname,
                        isMe: playerInner.id === player.id,
                        isMod: playerInner.id === this.mod.id,
                        isThief: (this.thief && (this.thief.id === playerInner.id)) ? true : false,
                        socketID: playerInner.id
                    }
                }),
                thief: this.thief ? this.thief.id : null,
                gameMap: this.gameMap.map(row => {
                    return row.map(cell => {
                        let fakeCell = {...cell};
                        //console.log(fakeCell);
                        if(this.thief) {
                            if(player.id === this.thief.id) {
                                //I might need to do some kind of logic in the future, you never know!
                            }
                            else {
                                fakeCell.currentPlayers = fakeCell.currentPlayers.filter(playerInner => {
                                    return playerInner.id !== this.thief.id;
                                });
                            }
                        };
                        return fakeCell;
                    })
                }),
                
                gameStatus: this.gameStatus,
                inGame: true,
                currentPlayerData: {
                    amIMod: player.id === this.mod.id,
                    actions: []
                },
                
            };
            //console.log(data);
            player.socket.emit("game update", data);
        });
    }

    playerLeavesGame(socket) {
        this.players = this.players.filter(player => {
            return player.id !== socket.client.id;
        });
        if(this.mod.id === socket.client.id) {
            if(this.players[0] !== undefined) this.setMod(this.players[0].id);
        }
        this.updateAllPlayers();
    }
}