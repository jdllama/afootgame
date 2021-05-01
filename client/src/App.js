import React from 'react';
import Game from "./game/Game";
import FrontPage from "./pregame/FrontPage";
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
        count: this.players.length,
        hasThief: this.thief != null,
        unusedPaintings: this.unusedPaintings,
        colors: this.colors,
        shapes: this.shapes,
    }
    */
    this.state = {
      inGame: false,
      gameMap: [],
      players: [],
      gameStatus: null,
      thief: null,
      currentPlayerData: {},
      count: 0,
      hasThief: false,
      unusedPaintings: [],
      colors: [],
      shapes: [],
    };

    const SERVER = "http://192.168.1.2:8080/";
    let socket = socketClient(SERVER, {transports: ['websocket']});;

    socket.on("game update", data => {
      console.log(data);
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
    this.makePlayer = this.makePlayer.bind(this);
    this.makeSpectator = this.makeSpectator.bind(this);
    this.startGame = this.startGame.bind(this);
    this.changeShape = this.changeShape.bind(this);
  }

  cellClick(opt) {

  }

  makePlayer(socketID) {
    this.socket.emit("make player", socketID);
  }

  makeSpectator(socketID) {
    this.socket.emit("make spectator", socketID);
  }

  setThief(socketID) {
    this.socket.emit("make thief", socketID);
    //this.props.setThief(socketID);
  }

  createGame(data) {
    //this.socket.emit("create game");
    this.socket.emit("try join game", data);
  }

  startGame() {
    this.socket.emit("try start game");
  }

  changeShape(shape) {
    //this.socket.emit("change shape", shape);
  }

  render() {
    let pageContent = null;
    if(this.state.inGame === true) {
      let gameDetails = {
        gameStatus: this.state.gameStatus,
        currentPlayerData: this.state.currentPlayerData,
        count: this.state.count,
        hasThief: this.state.hasThief,
        unusedPaintings: this.state.unusedPaintings,
      }
      pageContent = (
        <>
          <Game 
            details={gameDetails}
            setThief={this.setThief}
            makePlayer={this.makePlayer}
            makeSpectator={this.makeSpectator}
            cellclick={this.cellClick}
            changeShape={this.changeShape}
            players={this.state.players}
            spectators={this.state.spectators}
            map={this.state.gameMap}
            startGame={this.startGame}
            isThisPlayerMod={this.state.currentPlayerData.amIMod}
            colors={this.state.colors}
            shapes={this.state.shapes}
            
            />
        </>
      )
    }
    else {
      pageContent = (
        <>
          <FrontPage createGame={this.createGame}/>
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