import React from 'react';
import {Dropdown} from "./Dropdown";
import {Cell} from "./Cell";

export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapData: [],
            cols: 15,
            rows: 15,
        }

        this.buildMapData = this.buildMapData.bind(this);
        this.buildCells = this.buildCells.bind(this);
        this.updateRows = this.updateRows.bind(this);
        this.updateCols = this.updateCols.bind(this);
        this.updateCell = this.updateCell.bind(this);
        this.buildJSON = this.buildJSON.bind(this);

        this.buildMapData(true);
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

    updateCell(row, col, data) {
       this.setState(state => {
           const mapData = this.state.mapData.map((firstItem, innerRow) => {
               if(innerRow === row) {
                    return firstItem.map((secondItem, innerCol) => {
                        if(innerCol === col) {
                            return data;
                        }
                        else {
                            return secondItem;
                        }
                    });
               }
               else {
                   return firstItem;
               }
           })
           return {
            mapData
           }
       })
    }

    buildJSON() {
        console.log(this.state.mapData);
    }

    componentDidMount() {
    }

    buildMapData(firstTime = false) {
        this.returnData = [];
        for(var i = 0; i<this.state.rows;i++) {
            let row = [];
            for(var j = 0;j<this.state.cols;j++) {
                row.push({test: true, type: true, row: i, col: j})
            }
            this.returnData.push(row)
        }
        if(firstTime === true) this.state.mapData = this.returnData;
        else this.setState({mapData: this.returnData});
    }

    buildCells() {
        return this.state.mapData.map((row) => {
            return <div>{row.map((cell) => {
                return <Cell click={this.updateCell} myState={cell}/>
            })}</div>
        })
    }

    render() {
        return (
            <>
            <button onClick={this.buildJSON}>Build JSON</button>
            <Dropdown type="rows" initial={this.state.rows} onDropdownChange={this.updateRows}/>
            <Dropdown type="cols" initial={this.state.cols} onDropdownChange={this.updateCols}/>
            {
                this.state.mapData.map(row => {
                    return <div>{row.map(cell => {
                        return <Cell click={this.updateCell} myState={cell} />
                    })}</div>
                })
            }
            </>
        )
    }
}