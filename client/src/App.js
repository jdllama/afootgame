import React from 'react';
import Game from "./game/Game";
import GameCreate from "./pregame/GameCreate";
import socketClient  from "socket.io-client";
import './normalize.css';
import './App.css';
export default class Main extends React.Component {
  constructor(props) {
    
    super(props);
    this.state = {
      inGame: false,
      gameMap: [],
      players: [],
      gameStatus: null,
      thief: null,
    };

    const SERVER = "http://192.168.1.2:8080/";
    let socket = socketClient(SERVER, {transports: ['websocket']});;

    /*socket.on("join game", () => {
      this.setState({inGame: true});
    })
    */

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
          <Game setThief={this.setThief} cellclick={this.cellClick} players={this.state.players} map={this.state.gameMap} isThisPlayerMod={this.state.amIMod}  />
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
      <footer>
          Game inspired by <a href="https://boardgamegeek.com/boardgame/1484/clue-great-museum-caper" target="_blank">Clue: The Great Museum Caper</a>. Code by J.D. Lowe, all rights reserved. Source code available on <a href="https://github.com/jdllama/afootgame" target="_blank">Github</a>.
        </footer>
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