import React from 'react';
import {Map} from "./Map";
import {Dropdown} from "./Dropdown";

export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: 15,
            cols: 15,
        }
        this.updateRows = this.updateRows.bind(this);
        this.updateCols = this.updateCols.bind(this);
        this.buildJSON = this.buildJSON.bind(this);
    }

    updateRows = (newRows) => {
        this.setState({rows: parseInt(newRows)});
    }

    updateCols = (newCols) => {
        this.setState({cols: newCols});
    }

    buildJSON() {
    }

    componentDidMount() {
        
    }
    
    render() {
        return (
            <div className="map-creator-main">
                <div>
                <button onClick={this.buildJSON}>Do it</button>
                <Dropdown type="rows" initial={this.state.rows} onDropdownChange={this.updateRows}/>
                <Dropdown type="cols" initial={this.state.cols} onDropdownChange={this.updateCols}/>

                </div>
                
                <Map rows={this.state.rows} cols={this.state.cols}/>
            </div>
            
        );
    }
}