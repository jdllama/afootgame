import React from 'react';
import Player from "./Player";
import {ReactComponent as Logo} from "../hamburger.svg";
import "./PlayerList.css";

export default class SpectatorList extends React.Component {
    constructor(props) {
        super(props);

        this.makePlayer = this.makePlayer.bind(this);
    }

    makePlayer(socketID) {
        console.log(socketID);
        this.props.makePlayer(socketID);
    }

    render() {
        const spectators = this.props.spectators;
        const isThisPlayerMod = this.props.isThisPlayerMod;
        let renders = spectators.map(player => {
            let myRender;
            if(isThisPlayerMod === true) myRender = <div>{player.nickname}<button onClick={() => {this.makePlayer(player.socketID)}}>+</button></div>
            else myRender = <div>{player.nickname}</div>
            return myRender;
        })
        return (
            <>
                <div className="PlayerList" style={{width: "100%"}}>
                    {renders}
                </div>
                
            </>
        );
    }
}