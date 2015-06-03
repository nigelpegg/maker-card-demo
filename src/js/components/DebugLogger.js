import React from 'react';

export default class DebugLogger extends React.Component {

    static log(p_message)
    {
        console.log(p_message);

        var instances = DebugLogger._instances;
        if (instances) {
            for (var i=0; i<instances.length; i++) {
                instances[i].addMessage(p_message);
            }
        }

    }

    static register(p_instance)
    {
        if (DebugLogger._instances==null) {
            DebugLogger._instances = [];
        }
        DebugLogger._instances.push(p_instance);
    }

    constructor(props) {
        super(props);
        DebugLogger.register(this);

        this.state = {
            messages: []
        };

        this._loggerStyle = {};
        var styleCache = this.props.style;
        if (styleCache!=null) {
            for (var i in styleCache) {
                this._loggerStyle[i] = styleCache[i];
            }
        }
        this._loggerStyle.position = 'absolute';
        this._loggerStyle.background = 'white';
        this._loggerStyle.top = 0;
        this._loggerStyle.width = 300;
        this._loggerStyle.height = 400;
        this._loggerStyle.overflow = 'scroll';
        this._loggerStyle.fontFamily = 'Menlo';
    }

    render() {
        var msgs = this.state.messages;
        var pStyle = {
            overflow: 'scroll',
            margin:0,
            padding:0,
            lineHeight:1
        };
        return (
            <div style={this._loggerStyle}>
            {msgs.map(function(msg) {
                var timeString = msg.time+'';
                timeString = timeString.substr(timeString.length-4);
                return <p style={pStyle} key={msg.time}>{msg.msg}</p>
            })}
            </div>
        );
    }

    addMessage(p_message) {
        var timeStamp = (new Date()).getTime();
        this.setState({messages: this.state.messages.concat({msg:p_message, time:timeStamp})});
    }
}