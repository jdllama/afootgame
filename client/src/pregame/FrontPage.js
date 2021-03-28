import React from 'react';
import "./FrontPage.css";

export default class FrontPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: "asdf",
            gameID: "asdf",
            error: "",
        };

        this.inputChange = this.inputChange.bind(this);
        this.joinGame = this.joinGame.bind(this);
    }

    inputChange(event) {
        const target = event.target;
        const name = target.name;
        
        let value = "";


        
        if(name === "gameID") {
            value = target.value.replace(/[^\w]/gi, '').substring(0, 20).trim();
        }
        else {
            value = target.value;
        }

        this.setState({
            [name]: value,
            error: "",
        })
    }

    joinGame() {
        const nickname = this.state.nickname;
        const gameID = this.state.gameID;
        let errs = [];
        
        if(nickname === "") {
            errs.push("Nickname not set");
        }
        if(gameID === "") {
            errs.push("Game code not set");
        }
        if(errs.length !== 0) {
           this.setState({error: errs.join(", ")});
           return;
        }
        
        this.props.createGame({nickname, gameID})
    }

    render() {
        let err = null;
        if(this.state.error !== "") {
            err = (<div>ERROR:<br />{this.state.error}</div>)
        }
        return (
            <>
                <header style={{width: "100%"}}>
                    Logo will go here
                </header>
                <div className="game-create">
                    <label>Display name:<br /><input type="text" autoComplete="off" name="nickname" value={this.state.nickname} onChange={this.inputChange} /></label>
                    <label>Game code:<br />
                    <input type="text" autoComplete="off" name="gameID" value={this.state.gameID} onChange={this.inputChange} /></label>
                    <button onClick={this.joinGame}>Create/join game</button>
                    {err}
                </div>
                <footer>
      Game inspired by <a href="https://boardgamegeek.com/boardgame/1484/clue-great-museum-caper" rel="noreferrer" target="_blank">Clue: The Great Museum Caper</a>. Code by J.D. Lowe, all rights reserved. Source code available on <a href="https://github.com/jdllama/afootgame" rel="noreferrer" target="_blank">Github</a>.
    </footer>
            </>
            
        )
    }
}