import React from 'react';
import PlayerList from "./PlayerList";
import GameMap from "./GameMap";
export default class Game extends React.Component {
    render() {
        /*
        let players = this.props.players;
        let renders = players.map(player => {
            return (<Player nickname={player.nickname} isMe={player.isMe} isMod={player.isMod} amIMod={player.isMe === true && player.isMod === true}/>);
        })
        return (
            <div>{renders}</div>
        )
        */
       return (
            <>
                <PlayerList players={this.props.players} />
                <GameMap />
            </>
       )
    }
}