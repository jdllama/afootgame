import React from 'react';
import './Cell.css';
export default class Room extends React.Component {
    constructor(props) {
        super(props);

        this.setRoom = this.setRoom.bind(this);
    }

    setRoom() {
        this.props.setRoom({color: this.props.color, name: this.props.name});
    }
    render() {
        return (
            <div onClick={this.setRoom}>
                <span className="Cell" style={{backgroundColor: this.props.color}}></span>
                {this.props.name}
            </div>
        )
    }
}