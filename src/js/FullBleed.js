import React from 'react';

export default class FullBleed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            windowW : 0,
            windowH : 0
        };
    }

    render() {
        var divStyles = {
            width: this.state.windowW,
            height: this.state.windowH
        };

        return (
            <div style={divStyles}>
                {this.props.children}
            </div>
        );
    }

    componentDidMount() {
        window.addEventListener('resize', ()=> {this.updateDivSize()});
        this.updateDivSize();
    }

    updateDivSize() {
        console.log('size');
        var w = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        var h = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;

        this.setState({
            windowW: w,
            windowH: h
        });
    }
}

