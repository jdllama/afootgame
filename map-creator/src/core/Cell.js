import React from 'react';
export class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
/*    constructor(props) {
        super(props);
        this.rows = this.props.rows;
        this.cols = this.props.cols;
    }
    mapBuilder = () => {
        let returnRows = [];
        for(let i = 0;i<this.rows;i++) {
            let row = [];
            row.push(<span>Test</span>)
            returnRows.push(row);
        }
        return returnRows.map((row) => {
            return <div>a{row}</div>
        })
    }
*/
    render() {
        return (
            <span>
                <span>
                Rock
            </span>
            </span>
        );
    }
}