import React from 'react';
import PlayerList from "./PlayerList";
import GameRegion from "./GameRegion";
export default class Game extends React.Component {
    render() {
        console.log(this.props);
       return (
            <>
                <PlayerList setThief={this.props.setThief} players={this.props.players} isThisPlayerMod={this.props.isThisPlayerMod} />
                <GameRegion GameDetails={this.props.details} isThisPlayerMod={this.props.isThisPlayerMod} cellClick={this.props.cellClick} map={this.props.map} />
            </>
       )
    }
}