module.exports = class Game {
    constructor(obj) {
        this.gameID = obj.gameID;
        this.players = [];
        this.thief = null;
        this.gameMap = [];
        this.gameStatus = "pending";
        this.mod = null;

        this.joinGame = this.joinGame.bind(this);
        this.playerLeavesGame = this.playerLeavesGame.bind(this);
        this.updateAllPlayers = this.updateAllPlayers.bind(this);
        this.setMod = this.setMod.bind(this);
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

    updateAllPlayers() {
        this.players.forEach(socket => {
            
            socket.emit("game update", {
                players: this.players.map(player => {
                    return {
                        nickname: player.nickname,
                        isMe: player.client.id === socket.client.id,
                        isMod: player.client.id === this.mod.client.id,
                    }
                }),
                thief: this.thief,
                gameMap: this.gameMap,
                gameStatus: this.gameStatus,
                inGame: true,
                amIMod: socket.client.id === this.mod.client.id,
            });
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