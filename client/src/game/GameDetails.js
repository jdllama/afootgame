import React from 'react';
import PaintingHolder from "./PaintingHolder";
export default class GameDetails extends React.Component {
    render() {
        let details = this.props.GameDetails;
        let status = details.gameStatus;
        let amIMod = details.currentPlayerData.amIMod;
        let count = details.count;
        let hasThief = details.hasThief;
        //console.log(details)
        let startButton;
        if(amIMod === true) {
            if(hasThief === true && count >= 1 && status == "pending") {
                startButton = <button onClick={this.props.startGame}>Start Game</button>
            }
            
        }
        /*
        {
    "GameDetails": {
        "gameStatus": "pending",
        "currentPlayerData": {
            "amIMod": true,
            "actions": []
        },
        count: 0,
        hasThief: false
    }
}
        */
        return (
            <div className="GameDetails">
                <div>Status: {details.gameStatus}</div>
                <div>Player Count: {count}</div>
                <div>hasThief: {hasThief + ""}</div>
                {startButton}
                <PaintingHolder unusedPaintings={details.unusedPaintings}/>
            </div>
        )
    }
}