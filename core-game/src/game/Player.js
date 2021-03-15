import React from 'react';

export default class Player extends React.Component {
    render() {
        const isMe = this.props.isMe;
        const nickname = this.props.nickname;
        const isMod = this.props.isMod;
        const amIMod = this.props.amIMod;
        return (
            <div style={{backgroundColor: isMe ? "yellow" : ""}}>{nickname}<br />Mod: {isMod ? "Yes" : "No"}<br /> Am I mod? {amIMod ? "Yes" : "No"}</div>
        )
    }
}