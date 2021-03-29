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
        let thiefOrDetective = <div className="Detective" title="Detective">🕵️</div>;
        if(isMod === true) showCrown = <div className="Moderator" title="Moderator">👑</div>
        if(isThief) thiefOrDetective = <div className="Thief" title="Thief">👿</div>;
        if(socketID === undefined) {
            return (<section className="Player PlayerUnassigned">
            <header></header>
            <footer></footer>
        </section>);
        }
        return (
        <section className="Player">
            <header>
                <div className="Nickname">{nickname}</div>
                {showCrown}
                {thiefOrDetective}
            </header>
            <footer>{isThisPlayerMod && <button>Make Thief</button>}</footer>
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