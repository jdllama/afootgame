module.exports = class Player {
    constructor(socket) {
        this.id = socket.client.id;
        this.nickname = socket.nickname;
        this.socket = socket;
        this.color = null;
        this.shape = null;
    }
}