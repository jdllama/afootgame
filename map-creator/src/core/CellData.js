module.exports = class CellData {
    constructor(row, col) {
        this.objectHeld =null;
        this.type = null;
        this.row = row;
        this.col = col;
        this.northWall = false;
        this.southWall = false;
        this.eastWall = false;
        this.westWall = false;
        
    }
}