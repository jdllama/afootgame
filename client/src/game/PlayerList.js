import React from 'react';
import Player from "./Player";
import {ReactComponent as Logo} from "../hamburger.svg";
import "./PlayerList.css";

export default class PlayerList extends React.Component {
    render() {
        let players = this.props.players;
        let renders = players.map(player => {
            return (<Player socketID={player.socketID} isThisPlayerMod={this.props.isThisPlayerMod} setThief={this.props.setThief} nickname={player.nickname} isMe={player.isMe} isMod={player.isMod} amIMod={player.isMe === true && player.isMod === true}/>);
        })
        return (
            <>
            <Logo className="hamburger-icon" />
            <div className="player-list">
                {renders}
            </div>
            </>
            
        )
    }
}