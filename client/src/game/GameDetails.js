import React from 'react';
export default class GameDetails extends React.Component {
    render() {
        let details = this.props.GameDetails;
        let amIMod = details.currentPlayerData.amIMod;
        let count = details.count;
        let hasThief = details.hasThief;
        //console.log(details)
        let startButton;
        if(amIMod === true) {
            if(hasThief === true && count >= 2) {
                startButton = <button>Start Game</button>
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
            </div>
        )
    }
}