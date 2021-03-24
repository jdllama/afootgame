import React from 'react';
import Player from "./Player";
import {ReactComponent as Logo} from "../hamburger.svg";
import "./PlayerList.css";

export default class PlayerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playersVisible: false,
        };

        this.togglePlayers = this.togglePlayers.bind(this);
    }

    togglePlayers() {
        let playersVisible = !this.state.playersVisible;
        this.setState({playersVisible})
    }

    render() {
        let players = this.props.players;
        let renders;
        if(this.state.playersVisible === true) {
            renders = players.map(player => {
                return (<Player socketID={player.socketID} isThisPlayerMod={this.props.isThisPlayerMod} setThief={this.props.setThief} nickname={player.nickname} isMe={player.isMe} isMod={player.isMod} amIMod={player.isMe === true && player.isMod === true}/>);
            })
        }
        

        return (
            <>
                <button className="hamburger-button" onClick={this.togglePlayers}><Logo className="hamburger-icon" /></button>
            <div className="player-list">
                {renders}
            </div>
            </>
            
        )
    }
}