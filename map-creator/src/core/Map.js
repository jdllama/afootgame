import React from 'react';
import {Cell} from "./Cell";

export class Map extends React.Component {
    constructor(props) {
        super(props);
        this.mapBuilder = this.mapBuilder.bind(this);
    }
    mapBuilder = (rows, cols) => {
        let returnRows = [];
        for(let i = 0;i<rows;i++) {
            let row = [];
            
            for(let j = 0;j<cols;j++) {
                row.push(<Cell />);
            }
            returnRows.push(row);
        }
        return returnRows.map((row) => {
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