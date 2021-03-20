import React from 'react';
import Dropdown from "./Dropdown";
import Cell from "./Cell";
import Room from "./Room";
import Obj from "./Obj";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import CellData from "./CellData"

import padlockIcon from "../padlock.png";
import securityIcon from "../security.png";

export class Main extends React.Component {
    constructor(props) {
        super(props);
        const rows = 15;
        const cols = 15;
        this.buildMapData = this.buildMapData.bind(this);
        this.buildCells = this.buildCells.bind(this);
        this.buildObjects = this.buildObjects.bind(this);
        this.buildRooms = this.buildRooms.bind(this);

        this.updateRows = this.updateRows.bind(this);
        this.updateCols = this.updateCols.bind(this);
        this.updateCell = this.updateCell.bind(this);
        this.updateCellRoom = this.updateCellRoom.bind(this);
        this.updateCellObject = this.updateCellObject.bind(this);
        this.updateCellWall = this.updateCellWall.bind(this);

        this.setCurrentRoom = this.setCurrentRoom.bind(this);
        this.setCurrentObject = this.setCurrentObject.bind(this);

        this.getSingleCell = this.getSingleCell.bind(this);

        this.buildJSON = this.buildJSON.bind(this);


        let returnData = [];
        for(var i = 0; i<rows;i++) {
            let row = [];
            for(var j = 0;j<cols;j++) {
                row.push(new CellData(i, j));
            }
            returnData.push(row)
        }

        returnData = [[{"objectHeld":null,"type":null,"row":0,"col":0,"northWall":false,"southWall":false,"eastWall":false,"westWall":false},{"objectHeld":null,"type":null,"row":0,"col":1,"northWall":false,"southWall":false,"eastWall":false,"westWall":false},{"objectHeld":null,"type":null,"row":0,"col":2,"northWall":false,"southWall":false,"eastWall":false,"westWall":false},{"objectHeld":null,"type":null,"row":0,"col":3,"northWall":false,"southWall":false,"eastWall":false,"westWall":false},{"objectHeld":null,"type":null,"row":0,"col":4,"northWall":false,"southWall":false,"eastWall":false,"westWall":false},{"objectHeld":null,"type":null,"row":0,"col":5,"northWall":false,"southWall":false,"eastWall":false,"westWall":false}],[{"objectHeld":null,"type":null,"row":1,"col":0,"northWall":false,"southWall":false,"eastWall":false,"westWall":false},{"objectHeld":null,"type":{"color":"#7209B7","name":"Room 1"},"row":1,"col":1,"northWall":true,"southWall":false,"eastWall":false,"westWall":true},{"objectHeld":null,"type":{"color":"#7209B7","name":"Room 1"},"row":1,"col":2,"northWall":true,"southWall":false,"eastWall":true,"westWall":false},{"objectHeld":null,"type":{"color":"lightgray","name":"Hallway"},"row":1,"col":3,"northWall":true,"southWall":false,"eastWall":false,"westWall":false},{"objectHeld":null,"type":{"color":"#33673B","name":"Room 4"},"row":1,"col":4,"northWall":true,"southWall":false,"eastWall":true,"westWall":false},{"objectHeld":null,"type":null,"row":1,"col":5,"northWall":false,"southWall":false,"eastWall":false,"westWall":false}],[{"objectHeld":null,"type":null,"row":2,"col":0,"northWall":false,"southWall":false,"eastWall":false,"westWall":false},{"objectHeld":null,"type":{"color":"#7209B7","name":"Room 1"},"row":2,"col":1,"northWall":false,"southWall":false,"eastWall":false,"westWall":true},{"objectHeld":null,"type":{"color":"#7209B7","name":"Room 1"},"row":2,"col":2,"northWall":false,"southWall":true,"eastWall":false,"westWall":false},{"objectHeld":null,"type":{"color":"lightgray","name":"Hallway"},"row":2,"col":3,"northWall":false,"southWall":false,"eastWall":false,"westWall":false},{"objectHeld":null,"type":{"color":"#33673B","name":"Room 4"},"row":2,"col":4,"northWall":false,"southWall":false,"eastWall":true,"westWall":false},{"objectHeld":null,"type":null,"row":2,"col":5,"northWall":false,"southWall":false,"eastWall":false,"westWall":false}],[{"objectHeld":null,"type":null,"row":3,"col":0,"northWall":false,"southWall":false,"eastWall":false,"westWall":false},{"objectHeld":null,"type":{"color":"#08A4BD","name":"Room 3"},"row":3,"col":1,"northWall":false,"southWall":false,"eastWall":false,"westWall":true},{"objectHeld":null,"type":{"color":"#08A4BD","name":"Room 3"},"row":3,"col":2,"northWall":false,"southWall":false,"eastWall":false,"westWall":false},{"objectHeld":null,"type":{"color":"lightgray","name":"Hallway"},"row":3,"col":3,"northWall":false,"southWall":false,"eastWall":false,"westWall":false},{"objectHeld":null,"type":{"color":"#33673B","name":"Room 4"},"row":3,"col":4,"northWall":false,"southWall":false,"eastWall":true,"westWall":true},{"objectHeld":null,"type":null,"row":3,"col":5,"northWall":false,"southWall":false,"eastWall":false,"westWall":false}],[{"objectHeld":null,"type":null,"row":4,"col":0,"northWall":false,"southWall":false,"eastWall":false,"westWall":false},{"objectHeld":null,"type":{"color":"#08A4BD","name":"Room 3"},"row":4,"col":1,"northWall":false,"southWall":true,"eastWall":false,"westWall":true},{"objectHeld":null,"type":{"color":"#08A4BD","name":"Room 3"},"row":4,"col":2,"northWall":false,"southWall":true,"eastWall":false,"westWall":false},{"objectHeld":null,"type":{"color":"lightgray","name":"Hallway"},"row":4,"col":3,"northWall":false,"southWall":true,"eastWall":false,"westWall":false},{"objectHeld":null,"type":{"color":"#33673B","name":"Room 4"},"row":4,"col":4,"northWall":false,"southWall":true,"eastWall":true,"westWall":false},{"objectHeld":null,"type":null,"row":4,"col":5,"northWall":false,"southWall":false,"eastWall":false,"westWall":false}],[{"objectHeld":null,"type":null,"row":5,"col":0,"northWall":false,"southWall":false,"eastWall":false,"westWall":false},{"objectHeld":null,"type":null,"row":5,"col":1,"northWall":false,"southWall":false,"eastWall":false,"westWall":false},{"objectHeld":null,"type":null,"row":5,"col":2,"northWall":false,"southWall":false,"eastWall":false,"westWall":false},{"objectHeld":null,"type":null,"row":5,"col":3,"northWall":false,"southWall":false,"eastWall":false,"westWall":false},{"objectHeld":null,"type":null,"row":5,"col":4,"northWall":false,"southWall":false,"eastWall":false,"westWall":false},{"objectHeld":null,"type":null,"row":5,"col":5,"northWall":false,"southWall":false,"eastWall":false,"westWall":false}]];
        this.state = {
            mapData: returnData,
            cols: cols,
            rows: rows,
            roomType: null,
            objectType: null,
        }
    }

    updateRows(newRows) {
        this.setState({rows: newRows, mapData: []}, () => {
            this.buildMapData();
        });
    }

    updateCols(newCols) {
        this.setState({cols: newCols, mapData: []}, () => {
            this.buildMapData();
        });
    }

    updateCell(row, col, func) {
        this.setState(state => {
            let mapData = state.mapData.map((firstItem, innerRow) => {
                if(innerRow === row) {
                    return firstItem.map((secondItem, innerCol) => {
                        if(innerCol === col) {
                           secondItem = func({...secondItem});
                        }

                        return secondItem;
                    });
                }
                else {
                    return firstItem;
                }
            })
            return {
              mapData
            }
       });
    }

    setCurrentRoom(obj) {
        const color = obj.color;
        const name = obj.name;
        let state = null;
        if(name === "Blank") {
            state = null;
        }
        else {
            state = {
                color: color,
                name: name,
            }
        }

        this.setState({roomType: state})
    }

    setCurrentObject(obj) {
        const icon = obj.icon;
        const name = obj.name;
        let state = null;
        if(name === "Blank") {
            state = null;
        }
        else {
            state = {
                icon: icon,
                name: name,
            }
        }

        this.setState({objectType: state})
    }

    updateCellObject(row, col) {
        this.updateCell(row, col, (cell) => {
            cell.objectHeld = this.state.objectType;
            return cell;
        });
    }

    updateCellRoom(row, col) {
        this.updateCell(row, col, (cell) => {
            cell.type = this.state.roomType;
            return cell;
        });
    }

    updateCellWall(row, col, whichWall) {
        this.updateCell(row, col, (cell) => {
            //cell.type = this.state.roomType;
            if(whichWall === "north") {
                cell.northWall = !cell.northWall;
            }
            else if(whichWall === "south") {
                cell.southWall = !cell.southWall;
            }
            else if(whichWall === "west") {
                cell.westWall = !cell.westWall;
            }
            else if(whichWall === "east") {
                cell.eastWall = !cell.eastWall;
            }
            return cell;
        });
    }

    getSingleCell(row, col) {
        let myFake = null;
        this.state.mapData.forEach((firstItem, innerRow) => {
            if(innerRow === row) {
                return firstItem.forEach((secondItem, innerCol) => {
                    if(innerCol === col) {
                        myFake = {...secondItem};
                    }
                });
            }
        })
        return myFake;
    }

    buildJSON() {
        let myJSON = [...this.state.mapData];
        myJSON = myJSON.map(row => {
            return row.map(cell => {
                return {
                    row: cell.row,
                    col: cell.col,
                    northWall: cell.northWall,
                    southWall: cell.southWall,
                    eastWall: cell.eastWall,
                    westWall: cell.westWall,
                    cellType: cell.type ? cell.type.name : null,
                    currentObject: cell.objectHeld ? cell.objectHeld.name : null,
                    currentPlayers: [],
                };
            })
            
        })
        console.log(JSON.stringify(myJSON));
        //console.log(JSON.stringify(this.state.mapData));
    }

    componentDidMount() {
    }

    buildMapData() {
        let returnData = [];
        for(var i = 0; i<this.state.rows;i++) {
            let row = [];
            for(var j = 0;j<this.state.cols;j++) {
                row.push(new CellData(i, j));
            }
            returnData.push(row)
        }
        this.setState({mapData: returnData});
    }

    buildCells() {
        return this.state.mapData.map((row) => {
            return <div>{row.map((cell) => {
                return <Cell click={this.updateCellRoom} key={cell.row + " " + cell.col}  row={cell.row} col={cell.col} getCell={this.getSingleCell}/>
            })}</div>
        })
    }

    buildObjects() {
        let objs = {
            "Blank": {
                icon: null,
            },
            "Camera": {
                icon: null,
            },
            "Thief Exit": {
                icon: padlockIcon,
            },
            "Thief Entrance": {
                icon: null,
            },
            "Security": {
                icon: securityIcon,
            },
        }
        return Object.keys(objs).map(obj => {
            return <Obj name={obj} icon={objs[obj].icon} setObj={this.setCurrentObject}/>
        })
    }

    buildRooms() {
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
        return Object.keys(rooms).map(room => {
            //return null;
            return <Room name={room} color={rooms[room].color} setRoom={this.setCurrentRoom} />
        })
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Dropdown key="1" type="rows" initial={this.state.rows} onDropdownChange={this.updateRows}/>
                        <br />
                        <Dropdown key="2" type="cols" initial={this.state.cols} onDropdownChange={this.updateCols}/>
                        <br />
                        <button onClick={this.buildJSON}>Build JSON</button><br />
                        <fieldset>
                            <legend>
                                Room Types
                            </legend>
                            {this.buildRooms()}
                        </fieldset>
                            
                        
                        <fieldset>
                            <legend>
                                Objects
                            </legend>
                            {this.buildObjects()}
                        </fieldset>
                    </Col>
                    <Col>
                        {
                            this.state.mapData.map(row => {
                                return <div>{row.map(cell => {
                                    let key = cell.row + " " + cell.col;
                                    return <Cell updateRoom={this.updateCellRoom} updateWall={this.updateCellWall} updateObject={this.updateCellObject} key={key} row={cell.row} col={cell.col} getCell={this.getSingleCell}/>
                                })}</div>
                            })
                        }
                    </Col>
                </Row>
            </Container>
        )
    }
}