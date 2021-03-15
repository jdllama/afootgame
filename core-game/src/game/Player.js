import React from 'react';

export default class Player extends React.Component {
    render() {
        return (
            <div style={{backgroundColor: this.props.isMe ? "yellow" : ""}}>{this.props.nickname}<br />Mod: {this.props.isMod ? "Yes" : "No"}<br /> Am I mod? {this.props.amIMod ? "Yes" : "No"}</div>
        )
    }
}