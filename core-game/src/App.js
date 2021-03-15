import React from 'react';
import Gamefield from "./game/Gamefield";
import GameCreate from "./pregame/GameCreate";
import socketClient  from "socket.io-client";
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

    const SERVER = "http://localhost:8080/";
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
  }

  createGame(data) {
    //this.socket.emit("create game");
    this.socket.emit("try join game", data);
  }

  render() {
    let returner = null;
    if(this.state.inGame === true) {
      returner = (
        <>
          <Gamefield players={this.state.players} />
        </>
      )
    }
    else {
      returner = (
        <>
          <GameCreate createGame={this.createGame}/>
        </>
      );
    }
    return (
      returner
    );
  }
}
/*
import logo from './logo.svg';
import './App.css';

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