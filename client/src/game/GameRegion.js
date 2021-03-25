import React from 'react';
import './GameRegion.css';
import Cell from "./Cell";
import GameDetails from "./GameDetails";
export default class GameRegion extends React.Component {
    render() {
        /*
        let players = this.props.players;
        let renders = players.map(player => {
            return (<Player nickname={player.nickname} isMe={player.isMe} isMod={player.isMod} amIMod={player.isMe === true && player.isMod === true}/>);
        })
        return (
            <div>{renders}</div>
        )
        */
       let map = this.props.map;
       let mapRenders = [];
       //console.log(map);
       let maybeValues = [];
        map.forEach(row => {
            let cells = [];

            row.forEach(cell => {
                //console.log(cell.cellType)
                maybeValues.push(cell.cellType);
                //cells.push(<Cell row={cell.row} col={cell.col} currentObject={cell.currentObject} />);
                cells.push(<Cell {...cell} />);
            })
            let flexBasis = 100 / row.length;
            let actualRow = (<div style={{display: "flex",justifyContent: "space-evenly", flexDirection: "row", flexBasis: flexBasis + "%"}}>
                {cells}
            </div>);
            mapRenders.push(actualRow);
        });
        /*console.log(maybeValues.filter((val, index, self) => {
            return self.indexOf(val) === index;
        }))
        */
       return (
           <div className="GameRegion">
                <div className="MapHolder">
                    <div style={{display: "flex", flexDirection: "column",justifyContent: "space-evenly", width: "100%", height: "100%"}}>
                        {mapRenders}
                    </div>
                </div>
                <GameDetails startGame={this.props.startGame} GameDetails={this.props.GameDetails} />
            </div>
       )
    }
}