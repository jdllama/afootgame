import React from 'react';
export class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.myState;
        this.quickTest = this.quickTest.bind(this);
    }

    quickTest() {
        var a = this.state;
        a.type = !a.type;
        this.props.click(this.state.row, this.state.col, a);
    }
    render() {

        let color = "#FFFFFF";
        if(this.state.type === true) color = "#FF0000";
        return (
            <span style={{backgroundColor: color, border: "1px solid lightgray", display:"inline-block", width:"35px", height:"35px"}}  onClick={this.quickTest}>
                <span>
                    &nbsp;
                </span>
            </span>
        );
    }
}