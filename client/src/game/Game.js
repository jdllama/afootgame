import React from 'react';
//import PlayerList from "./PlayerList";
import GameRegion from "./GameRegion";
import WaitingRoom from "./WaitingRoom";

export default class Game extends React.Component {
    render() {
        //console.log(this.props)
        const setThief = this.props.setThief;
        const makePlayer = this.props.makePlayer;
        const makeSpectator = this.props.makeSpectator;
        const players = this.props.players;
        const spectators = this.props.spectators;
        const GameDetails = this.props.details;
        const isThisPlayerMod = this.props.isThisPlayerMod;
        const startGame = this.props.startGame;
        const cellClick = this.props.cellClick;
        const map = this.props.map;

        const count = GameDetails.count;
        const currentPlayerData = GameDetails.currentPlayerData;
        const gameStatus = GameDetails.gameStatus;
        const hasThief = GameDetails.hasThief;
        if(gameStatus === "pending") {
            return (
                <>
                    <WaitingRoom 
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
                    />
                </>
            )
        }
            
        else return (<div>fart</div>)
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