import React from 'react';
export default class GameDetails extends React.Component {
    render() {
        let details = this.props.GameDetails;
        let amIMod = details.currentPlayerData.amIMod;
        let startButton;
        if(amIMod === true) {
            startButton = <button>Start Game</button>
        }
        /*
        {
    "GameDetails": {
        "gameStatus": "pending",
        "currentPlayerData": {
            "amIMod": true,
            "actions": []
        }
    }
}
        */
        return (
            <div className="GameDetails">
                <div>Status: {details.gameStatus}</div>
                {startButton}
            </div>
        )
    }
}