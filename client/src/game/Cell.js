import React from 'react';
import './Cell.css';
export default class GameMap extends React.Component {
    constructor(props) {
        super(props);
        //console.log(props);
        /*
        {
    "row": 5,
    "col": 5,
    "northWall": false,
    "southWall": false,
    "eastWall": false,
    "westWall": false,
    "cellType": null,
    "currentObject": null,
    "currentPlayers": []
}
        */
    }
    render() {
        let cell = this.props;
        return (
        <span className="Cell">
            <span className="Wall Horizontal North" style={{ backgroundColor: cell.northWall === true ? "black" : ""}}></span>
            <span className="Wall Horizontal South" style={{ backgroundColor: cell.southWall === true ? "black" : ""}}></span>
            <span className="Wall Vertical West" style={{ backgroundColor: cell.westWall === true ? "black" : ""}}></span>
            <span className="Wall Vertical East" style={{ backgroundColor: cell.eastWall === true ? "black" : ""}}></span>
            <span>
            </span>
        </span>
        );
    }
}