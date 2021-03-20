import React from 'react';
import PlayerList from "./PlayerList";
import GameMap from "./GameMap";
export default class Game extends React.Component {
    render() {
       return (
            <>
                <PlayerList setThief={this.props.setThief} players={this.props.players} isThisPlayerMod={this.props.isThisPlayerMod} />
                <GameMap cellClick={this.props.cellClick} map={this.props.map} />
            </>
       )
    }
}