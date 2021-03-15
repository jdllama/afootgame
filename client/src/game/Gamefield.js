import React from 'react';
import Player from "./Player";
export default class Gamefield extends React.Component {
    render() {
        let players = this.props.players;
        let renders = players.map(player => {
            return (<Player nickname={player.nickname} isMe={player.isMe} isMod={player.isMod} amIMod={player.isMe === true && player.isMod === true}/>);
        })
        /*
        let renders = [];
        players.forEach(player => {
            renders.push(<Player nickname={player.nickname} isMe={player.isMe}  />);
        });
        */
        return (
            <div>{renders}</div>
        )
    }
}