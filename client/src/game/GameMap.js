import React from 'react';

export default class GameMap extends React.Component {
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
       let renders = [];
       //console.log(map);
        map.forEach(row => {
            let cells = [];

            row.forEach(cell => {
                cells.push(<div>Hi!</div>)
            })
            let flexBasis = 100 / row.length;
            let actualRow = (<div style={{display: "flex", flexDirection: "row", flexBasis: flexBasis + "%"}}>
                {cells}
            </div>);
            renders.push(actualRow);
        });
       return (
            <div style={{display: "flex", flexDirection: "column"}}>
                {renders}
            </div>
       )
    }
}