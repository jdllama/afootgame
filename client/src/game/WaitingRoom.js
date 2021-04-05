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
        const {setThief, makeSpectator, players, startGame, isThisPlayerMod, shapes, makePlayer, spectators, GameDetails} = this.props;
        return (
            <div className="WaitingRoom">
                <PlayerList 
                    setThief={setThief}
                    makeSpectator={makeSpectator}
                    players={players}
                    startGame={startGame}
                    isThisPlayerMod={isThisPlayerMod}
                    shapes={shapes}
                    GameDetails={GameDetails}
                />
                <SpectatorList
                    makePlayer={makePlayer}
                    spectators={spectators}
                    isThisPlayerMod={isThisPlayerMod}
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