import React from 'react';
import './Cell.css';
export default class Obj extends React.Component {
    constructor(props) {
        super(props);

        this.setObj = this.setObj.bind(this);
    }

    setObj() {
        this.props.setObj({icon: this.props.icon, name: this.props.name});
    }
    render() {
        return (
            <div onClick={this.setObj}>
                <span className="Cell"><img src={this.props.icon} /></span>
                {this.props.name}
            </div>
        )
    }
}