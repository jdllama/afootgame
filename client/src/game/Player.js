import React from 'react';
import "./Player.css";

export default class Player extends React.Component {
    constructor(props) {
        super(props);
        this.socketID = this.props.socketID;
        this.setThief = this.setThief.bind(this);
    }

    setThief() {
        this.props.setThief(this.props.socketID);
    }

    render() {

        const {isThisPlayerMod, isMe, isMod, isThief, socketID, nickname, makeSpectator, shapes, GameDetails} = this.props;
        
        //console.log(GameDetails);
        console.log(isMe);
        let showCrown;
        let thiefOrDetective = <div className="Detective" title="Detective">Detective</div>;
        if(isMod === true) showCrown = <span className="Moderator" title="Moderator">👑</span>
        if(isThief) thiefOrDetective = <div className="Thief" title="Thief">Thief</div>;
        if(socketID === undefined) {
            return (<section className="Player PlayerUnassigned">
            <header></header>
            <footer></footer>
        </section>);
        }

        let shapesButtons = shapes.map(shape => {
            let className = "";
            if(isMe && shape.used && (GameDetails.currentPlayerData.shape && shape.shape == GameDetails.currentPlayerData.shape.shape)) className="Mine";
            return <button style={{width: "25%"}} className={className} disabled={shape.used}>{shape.shape}</button>
        });
        let thiefButton;
        if(isThisPlayerMod) {
            if(!isThief) thiefButton = <button onClick={this.setThief}>Make Thief</button>
        }
        return (
        <section className="Player">
            <header>
                <center>
                <div className="Nickname">{nickname} {showCrown}</div>
                <hr style={{width:"98%", margin: 0}} />
                {thiefOrDetective}
                </center>
            </header>
            <section style={{display: "flex", flexWrap: "wrap",}}>
            {shapesButtons}
            </section>
            <footer>{thiefButton}</footer>
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