import React from 'react';

export default class Player extends React.Component {
    constructor(props) {
        super(props);
        this.socketID = props.socketID;
        this.setThief = this.setThief.bind(this);
    }

    setThief() {
        this.props.setThief(this.socketID);
    }

    render() {
        const isMe = this.props.isMe;
        const nickname = this.props.nickname;
        const isMod = this.props.isMod;
        //const amIMod = this.props.amIMod;
        const isThisPlayerMod = this.props.isThisPlayerMod;
        return (
            <div style={{backgroundColor: isMe ? "yellow" : ""}}>
                {nickname}
                <br />
                Mod: {isMod ? "Yes" : "No"}
                <br />
                {isThisPlayerMod === true ? <button onClick={this.setThief}>Make This Player Thief</button> : ""}
            </div>
        )
    }
}