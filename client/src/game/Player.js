import React from 'react';
import "./Player.css";

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
        const {isThisPlayerMod, isMe, isMod, isThief, socketID, nickname, makeSpectator, setThief} = this.props;
        let showCrown;
        if(isThisPlayerMod) showCrown = <div className="Moderator"></div>
        return (
        <section className="Player">
            <header>
                <div className="Nickname">{nickname}</div>
                {showCrown}
            </header>
            <footer>Fart</footer>
        </section>
        );
        /*
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
                Fart
                {isThisPlayerMod === true ? <button onClick={this.setThief}>Make This Player Thief</button> : ""}
            </div>
        )
        */
    }
}