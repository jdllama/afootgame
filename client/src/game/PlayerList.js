import React from 'react';
import Player from "./Player";
import {ReactComponent as Logo} from "../hamburger.svg";
import "./PlayerList.css";

export default class PlayerList extends React.Component {
    render() {
        /*
        setThief={this.props.setThief}
                    makeSpectator={this.props.makeSpectator}
                    players={this.props.players}
                    startGame={this.props.startGame}
                    isThisPlayerMod={this.props.isThisPlayerMod}*/
        const {setThief, players, isThisPlayerMod, makeSpectator, shapes} = this.props;
        let renders = [];
        for(let i = 0; i<8;i++) {
            let player = players[i];
            if(player !== undefined) {
                const {isMe, isMod, isThief, nickname, socketID} = player;
            
                renders.push(<Player
                    isThisPlayerMod={isThisPlayerMod}
                    isMe={isMe}
                    isMod={isMod}
                    isThief={isThief}
                    socketID={socketID}
                    nickname={nickname}
                    makeSpectator={makeSpectator}
                    setThief={setThief}
                    shapes={shapes}
                />);
                
            }
            else {
                renders.push(<Player />)
            }
            if(i === 3) {
                renders.push(<div style={{flexBasis: "100%", height: 0}}></div>)
            }
        }
        /*
        let renders = players.map(player => {
            
            const {isMe, isMod, isThief, nickname, socketID} = player;
            
            return <Player
                isThisPlayerMod={isThisPlayerMod}
                isMe={isMe}
                isMod={isMod}
                isThief={isThief}
                socketID={socketID}
                nickname={nickname}
                makeSpectator={makeSpectator}
                setThief={setThief}
            />
        });
        */
        return (
            <>
                <div className="PlayerList">
                    {renders}
                </div>
                
            </>
        );
    }
        /*
        let players = this.props.players;
        let renders;
        if(this.state.playersVisible === true) {
            renders = players.map(player => {
                return (<Player socketID={player.socketID} isThisPlayerMod={this.props.isThisPlayerMod} setThief={this.props.setThief} nickname={player.nickname} isMe={player.isMe} isMod={player.isMod} amIMod={player.isMe === true && player.isMod === true}/>);
            })
        }
        

        return (
            <>
                <button className="hamburger-button" onClick={this.togglePlayers}>
                <Logo className="hamburger-icon" />
                </button>
            <div className="player-list">
                {renders}
            </div>
            </>
            
        )
        */
}