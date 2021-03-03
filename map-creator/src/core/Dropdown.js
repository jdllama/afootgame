import React from 'react';
export class Dropdown extends React.Component {
    
    constructor(props) {
        super(props);
        this.optBuilder = this.optBuilder.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onDropdownChange(e.target.value);
    }

    optBuilder() {
        let opts = [];
        for(let i = 0;i<15;i++) {
            opts.push(<option value={i + 1} id={i}>{i + 1}</option>)
        }
        return opts;

    }
    render() {
        return (
            <span>
                <label>
                    {this.props.type}
                    <select value={this.props.initial} onChange={this.handleChange}>
                        {this.optBuilder()}
                    </select>
                </label>
            </span>
        );
    }
}