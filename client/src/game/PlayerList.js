import React from 'react';
import Player from "./Player";
import {ReactComponent as Logo} from "../hamburger.svg";
import "./PlayerList.css";

export default class PlayerList extends React.Component {
    render() {
        /*
        setThief={this.props.setThief}
                    makeSpectator={this.props.makeSpectator}
                    players={this.props.players}
                    startGame={this.props.startGame}
                    isThisPlayerMod={this.props.isThisPlayerMod}*/
       const {setThief, players, isThisPlayerMod, makeSpectator} = this.props;
        let renders = players.map(player => {
            
           const {isMe, isMod, isThief, nickname, socketID} = player;
            /*let myRender;
            if(isThisPlayerMod === true) myRender = <div>{player.nickname}<button onClick={() => {this.makeSpectator(player.socketID)}}>-</button></div>
            else myRender = <div>{player.nickname}</div>
            return myRender;
            this.props.makeSpectator(socketID);
            */
            return <Player
                isThisPlayerMod={isThisPlayerMod}
                isMe={isMe}
                isMod={isMod}
                isThief={isThief}
                socketID={socketID}
                nickname={nickname}
                makeSpectator={makeSpectator}
                setThief={setThief}
            />
        })
        return (
            <>
                <div className="PlayerList" style={{width: "100%"}}>
                    {renders}
                </div>
                
            </>
        );
    }
        /*
        let players = this.props.players;
        let renders;
        if(this.state.playersVisible === true) {
            renders = players.map(player => {
                return (<Player socketID={player.socketID} isThisPlayerMod={this.props.isThisPlayerMod} setThief={this.props.setThief} nickname={player.nickname} isMe={player.isMe} isMod={player.isMod} amIMod={player.isMe === true && player.isMod === true}/>);
            })
        }
        

        return (
            <>
                <button className="hamburger-button" onClick={this.togglePlayers}>
                <Logo className="hamburger-icon" />
                </button>
            <div className="player-list">
                {renders}
            </div>
            </>
            
        )
        */
}