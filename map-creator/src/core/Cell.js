import React from 'react';
import './Cell.css';
export default class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.row = props.row;
        this.col = props.col;
        this.setRoom = this.setRoom.bind(this);
        this.setObject = this.setObject.bind(this);
    }

    setRoom() {
        this.props.updateRoom(this.row, this.col);
    }

    setObject(e) {
        e.preventDefault();
        this.props.updateObject(this.row, this.col);
    }
    
    render() {
        let color = "#FFFFFF";
        let cell = this.props.getCell(this.row, this.col);
        let img = cell.objectHeld;
        if(cell.type !== null) {
            color = cell.type.color;
        }
        return (
            <span style={{backgroundColor: color}} className="Cell" onContextMenu={this.setObject} onClick={this.setRoom}>
                <span>
                    <img src={img} />
                </span>
            </span>
        );

    }
}