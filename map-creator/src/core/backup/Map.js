import React from 'react';
import {Cell} from "./Cell";

export class Map extends React.Component {
    constructor(props) {
        super(props);
        this.getMapData = this.props.getMapData;
        this.returnRows = [];
        this.mapBuilder = this.mapBuilder.bind(this);
        this.mapChecker = this.mapChecker.bind(this);
    }

    mapChecker() {
        console.log(this.returnRows[0][0].state);
    }

    mapBuilder(rows, cols) {
        this.returnRows = [];
        for(let i = 0;i<rows;i++) {
            let row = [];
            
            for(let j = 0;j<cols;j++) {
                row.push(<Cell key={+(new Date()) + j}/>);
            }
            this.returnRows.push(row);
        }
        this.getMapData(this.returnRows);
        return this.returnRows.map((row) => {
            return <div>{row}</div>
        })
    }

    render() {
        const rows = this.props.rows;
        const cols = this.props.cols;
        return (
            <div className="map">
                {this.mapBuilder(rows, cols)}
            </div>
        );
    }
}