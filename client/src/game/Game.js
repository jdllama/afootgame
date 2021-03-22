import React from 'react';
import PlayerList from "./PlayerList";
import GameRegion from "./GameRegion";
export default class Game extends React.Component {
    render() {
       return (
            <>
                <PlayerList setThief={this.props.setThief} players={this.props.players} isThisPlayerMod={this.props.isThisPlayerMod} />
                <GameRegion cellClick={this.props.cellClick} map={this.props.map} />
            </>
       )
    }
}