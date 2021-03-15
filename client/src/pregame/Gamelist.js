import React from 'react';

export default class Gamelist extends React.Component {

    render() {
        let games = [];
        games = this.props.list.map(game => {
            return <div>{game}</div>
        });
        return (
            <div>
                {games}
            </div>
        )
    }
}