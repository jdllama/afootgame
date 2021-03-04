import React from 'react';
export class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.changeType = this.changeType.bind(this);
        this.state = {
            type: false
        }
    }

    changeType() {
        this.setState({type: !this.state.type})
    }

    render() {
        let color = "#00FF00";
        if(this.state.type === true) color = "#FF0000";
        return (
            <span style={{backgroundColor: color}}>
                <span onClick={this.changeType}>
                    {+(new Date())}
                </span>
            </span>
        );
    }
}