const defaultMap = require("./demoRoom");
let Player = require("./PlayerClass");
let Shape = require("./ShapeClass");
module.exports = class Game {
    constructor(obj) {
        this.gameID = obj.gameID;
        this.players = [];
        this.spectators = [];
        this.currentPlayer = null;
        this.thief = null;
        this.isThiefVisible = false;
        this.gameMap = [...defaultMap];
        this.gameStatus = "pending";
        this.unusedPaintings = [];
        this.playerColors = ["red", "green", "blue", "yellow"]
        this.shapes = [
            new Shape("moon"),
            new Shape("cross"),
            new Shape("diamond"),
            new Shape("pound"),
            new Shape("star"),
            new Shape("swirl"),
            new Shape("dots"),
            new Shape("X"),
        ]
        this.mod = null;
        this.basePainting = require("fs").readFileSync(__dirname + "/easel.svg", "utf-8");
        

        this.joinGame = this.joinGame.bind(this);
        this.playerLeavesGame = this.playerLeavesGame.bind(this);
        this.updateAllPlayers = this.updateAllPlayers.bind(this);
        this.setMod = this.setMod.bind(this);
        this.setThief = this.setThief.bind(this);
        this.moveToPlayer = this.moveToPlayer.bind(this);
        this.moveToSpectator = this.moveToSpectator.bind(this);
        this.isCurrentPlayer = this.isCurrentPlayer.bind(this);
        this.startGame = this.startGame.bind(this);
        this.authenticateUser = this.authenticateUser.bind(this);
        this.makePaintings = this.makePaintings.bind(this);
    }

    startGame(success, fail) {
        this.isThiefVisible = false;
        this.gameMap = [...defaultMap];
        this.currentPlayer = null;
        this.gameStatus = "objectivePlacement";
        this.unusedPaintings = this.makePaintings();
        success();
    }

    makePaintings() {
        let arr = [];
        const colors = ["red", "yellow"];
        colors.forEach(color => {
            let myCopy = `${this.basePainting}`;
            myCopy = myCopy.replace("[[]]", color);
            arr.push(myCopy);
        })
        return arr;
    }

    joinGame(socket, success, fail) {
        let player = new Player(socket);
        this.spectators.push(player);
        success(player);
        /*
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
        */
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
            //JD work on this
            //player.shape = null;
        });
        this.thief = thief;
    }

    moveToPlayer(socketID) {
        let holder = null;
        this.spectators.forEach(spectator => {
            if(spectator.id === socketID) holder = spectator;
        });
        this.spectators = this.spectators.filter(spectator => {
            return spectator.id !== socketID;
        });

        let shapeIndex = this.shapes.findIndex(el => {
            return el.used === false;
        });

        this.shapes[shapeIndex].used = true;

        holder.shape = this.shapes[shapeIndex];

        if(holder !== null) this.players.push(holder);
    }

    moveToSpectator(socketID) {
        if(this.mod.id === socketID) return;
        let holder = null;
        this.players.forEach(player => {
            if(player.id === socketID) holder = player;
        });
        this.players = this.players.filter(players => {
            return players.id !== socketID;
        })

        let shapeIndex = this.shapes.findIndex(el => {
            return el.shape === holder.shape.shape;
        });

        this.shapes[shapeIndex].used = false;

        if(holder !== null) this.spectators.push(holder);
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
        const dataBuilder = player => {
            let data = {
                players: this.players.map(playerInner => {
                    return {
                        nickname: playerInner.nickname,
                        isMe: playerInner.id === player.id,
                        isMod: playerInner.id === this.mod.id,
                        isThief: (this.thief && (this.thief.id === playerInner.id)) ? true : false,
                        socketID: playerInner.id,
                    }
                }),
                spectators: this.spectators.map(playerInner => {
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
                    actions: [],
                    color: player.color,
                    shape: player.shape,
                },
                count: this.players.length,
                hasThief: this.thief != null,
                unusedPaintings: this.unusedPaintings,
                colors: this.colors,
                shapes: this.shapes,
            };
            //console.log(data);
            player.socket.emit("game update", data);
        };
        this.players.forEach(dataBuilder);
        this.spectators.forEach(dataBuilder);
    }

    playerLeavesGame(socket) {
        let holder = this.players.find(player => {
            return player.id === socket.client.id;
        })
        this.players = this.players.filter(player => {
            return player.id !== socket.client.id;
        });
        this.spectators = this.spectators.filter(player => {
            return player.id !== socket.client.id;
        });
        if(this.mod.id === socket.client.id) {
            if(this.players[0] !== undefined) this.setMod(this.players[0].id);
        }
        if(holder && holder.shape) {
            let shapeIndex = this.shapes.findIndex(el => {
                return el.shape === holder.shape.shape;
            });
            this.shapes[shapeIndex].used = false;
        }
        

        
        this.updateAllPlayers();
    }
}