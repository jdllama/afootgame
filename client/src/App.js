import React from 'react';
import Game from "./game/Game";
import GameCreate from "./pregame/GameCreate";
import socketClient  from "socket.io-client";
import './normalize.css';
import './App.css';
export default class Main extends React.Component {
  constructor(props) {
    
    super(props);
    /*
    {
        players: this.players.map(player => {
            return {
                nickname: player.nickname,
                isMe: player.client.id === socket.client.id,
                isMod: player.client.id === this.mod.client.id,
                isThief: (this.thief && (this.thief.client.id === player.client.id)) ? true : false,
                socketID: player.client.id
            }
        }),
        thief: this.thief ? this.thief.client.id : null,
        gameMap: this.gameMap.map(row => {
            return row.map(cell => {
                let fakeCell = {...cell};
                //console.log(fakeCell);
                if(this.thief) {
                    if(socket.client.id === this.thief.client.id) {
                        //I might need to do some kind of logic in the future, you never know!
                    }
                    else {
                        fakeCell.currentPlayers = fakeCell.currentPlayers.filter(player => {
                            return player.client.id !== this.thief.client.id;
                        });
                    }
                };
                return fakeCell;
            })
        }),
        
        gameStatus: this.gameStatus,
        inGame: true,
        currentPlayerData: {
                    amIMod: player.id === this.mod.id,
                    actions: []
                },
    }
    */
    this.state = {
      inGame: false,
      gameMap: [],
      players: [],
      gameStatus: null,
      thief: null,
      currentPlayerData: {},
    };

    const SERVER = "http://192.168.1.2:8080/";
    let socket = socketClient(SERVER, {transports: ['websocket']});;

    socket.on("game update", data => {
      this.setState(data);
    })

    socket.on("leave game", () => {
      this.setState({
        inGame: false,
        gameMap: [],
        players: [],
        gameStatus: null,
        thief: null,
        currentPlayerData: {},
      });
    });

    socket.on("error", data => {
      console.log(data);
    })

    this.socket = socket;

    this.createGame = this.createGame.bind(this);
    this.cellClick = this.cellClick.bind(this);
    this.setThief = this.setThief.bind(this);
  }

  cellClick(opt) {

  }

  setThief(socketID) {
    this.socket.emit("make thief", socketID);
    //this.props.setThief(socketID);
  }

  createGame(data) {
    //this.socket.emit("create game");
    this.socket.emit("try join game", data);
  }

  render() {
    let pageContent = null;
    if(this.state.inGame === true) {
      pageContent = (
        <>
          <Game details={{gameStatus: this.state.gameStatus, currentPlayerData: this.state.currentPlayerData,}}setThief={this.setThief} cellclick={this.cellClick} players={this.state.players} map={this.state.gameMap} isThisPlayerMod={this.state.amIMod}  />
        </>
      )
    }
    else {
      pageContent = (
        <>
          <GameCreate createGame={this.createGame}/>
        </>
      );
    }
    return (
      <>
        {pageContent}
      
      </>
    );
  }
}
/*
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

*/