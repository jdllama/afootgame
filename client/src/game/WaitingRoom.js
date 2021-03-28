import React from 'react';
import PlayerList from "./PlayerList";
import SpectatorList from "./SpectatorList";
import "./WaitingRoom.css";

export default class WaitingRoom extends React.Component {
    render() {
        /*
            setThief={setThief}
            makePlayer={makePlayer}
            makeSpectator={makeSpectator}
            players={players}
            spectators={spectators}
            GameDetails={GameDetails}
            isThisPlayerMod={isThisPlayerMod}
            startGame={startGame}
            cellClick={cellClick}
            map={map}
            gameStatus={gameStatus}
        */
        return (
            <div className="WaitingRoom">
                <PlayerList 
                    setThief={this.props.setThief}
                    makeSpectator={this.props.makeSpectator}
                    players={this.props.players}
                    startGame={this.props.startGame}
                    isThisPlayerMod={this.props.isThisPlayerMod}
                />
                <SpectatorList
                    makePlayer={this.props.makePlayer}
                    spectators={this.props.spectators}
                    isThisPlayerMod={this.props.isThisPlayerMod}
                />
            </div>
        )
        /*
       return (
            <>
                <PlayerList setThief={this.props.setThief} players={this.props.players} isThisPlayerMod={this.props.isThisPlayerMod} />
                <GameRegion startGame={this.props.startGame} GameDetails={this.props.details} isThisPlayerMod={this.props.isThisPlayerMod} cellClick={this.props.cellClick} map={this.props.map} />
            </>
       )
       */
    }
}