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
       /*
       [
    null,
    "Room 1",
    "Hallway",
    "Room 4",
    "Room 3"
]
       */
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {

    }

    render() {
        let cell = this.props;
        let type = cell.cellType;
        let color = null;
        let rooms = {
            "Blank": {
                color: "#FFFFFF",
            },
            "Hallway": {
                color: "lightgray",
            },
            "Room 1": {
                color: "#7209B7",
            },
            "Room 2": {
                color: "#D7263D",
            },
            "Room 3": {
                color: "#08A4BD",
            },
            "Room 4": {
                color: "#33673B",
            },
            "Room 5": {
                color: "#FF9F1C",
            },
            "Main Room": {
                color: "#FDF0D5",
            },
            "Security": {
                color: "#4C4C4C",
            },
        }
        if(rooms[type]) {
            color = rooms[type].color
        }
        //color = rooms[type] || null;
        return (
        <span className="Cell" style={{backgroundColor: color}}>
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