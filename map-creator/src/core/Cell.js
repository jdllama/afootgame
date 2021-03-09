import React from 'react';
import './Cell.css';
export default class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.row = props.row;
        this.col = props.col;
        this.setRoom = this.setRoom.bind(this);
        this.setObject = this.setObject.bind(this);
        this.setWall = this.setWall.bind(this);
    }

    setRoom() {
        this.props.updateRoom(this.row, this.col);
    }

    setObject(e) {
        //onContextMenu={this.setObject}
        e.preventDefault();
        this.props.updateObject(this.row, this.col);
    }

    setWall(whichWall) {
        this.props.updateWall(this.row, this.col, whichWall);
    }
    
    render() {
        let color = "#FFFFFF";
        let cell = this.props.getCell(this.row, this.col);
        let img = cell.objectHeld;
        if(cell.type !== null) {
            color = cell.type.color;
        }
        return (
            <span style={{backgroundColor: color}} className="Cell" onClick={this.setRoom}>
                <span className="Wall" onClick={(e) => {e.stopPropagation(); this.setWall("north")}} style={{width: "100%", top: 0, left: 0, height: "5px", backgroundColor: cell.northWall === true ? "black" : ""}}></span>
                <span className="Wall" onClick={(e) => {e.stopPropagation(); this.setWall("south")}} style={{width: "100%", bottom: 0, left: 0, height: "5px", backgroundColor: cell.southWall === true ? "black" : ""}}></span>
                <span className="Wall" onClick={(e) => {e.stopPropagation(); this.setWall("west")}} style={{left: 0, top: 0, height: "100%", width: "5px", backgroundColor: cell.westWall === true ? "black" : ""}}></span>
                <span className="Wall" onClick={(e) => {e.stopPropagation(); this.setWall("east")}} style={{right: 0, top: 0, height: "100%", width: "5px", backgroundColor: cell.eastWall === true ? "black" : ""}}></span>
                <span>
                    <img src={img} />
                </span>
            </span>
        );

    }
}