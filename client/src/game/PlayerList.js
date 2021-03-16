import React from 'react';
import Player from "./Player";
import "./PlayerList.css";

export default class PlayerList extends React.Component {
    render() {
        let players = this.props.players;
        let renders = players.map(player => {
            return (<Player nickname={player.nickname} isMe={player.isMe} isMod={player.isMod} amIMod={player.isMe === true && player.isMod === true}/>);
        })
        return (
            <div className="player-list">{renders}</div>
        )
    }
}