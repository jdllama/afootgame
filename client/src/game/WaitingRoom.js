import React from 'react';
import PlayerList from "./PlayerList";
import GameRegion from "./GameRegion";
export default class WaitingRoom extends React.Component {
    render() {
       return (
            <>
                <PlayerList setThief={this.props.setThief} players={this.props.players} isThisPlayerMod={this.props.isThisPlayerMod} />
                <GameRegion startGame={this.props.startGame} GameDetails={this.props.details} isThisPlayerMod={this.props.isThisPlayerMod} cellClick={this.props.cellClick} map={this.props.map} />
            </>
       )
    }
}