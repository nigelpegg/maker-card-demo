import React from 'react';

export default class StretchedMedia extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            imgX: 0,
            imgY: 0,
            imgW: 'auto',
            imgH: 'auto',
            rendered: false
        };
        this.debounceTimeout = null;
    }

    render() {
        var imgStyle = {
            position: 'absolute',
            top: this.state.imgY,
            left: this.state.imgX,
            width: this.state.imgW,
            height: this.state.imgH,
            opacity: this.state.rendered ? 1 : 0
        };
        var outerStyle = {
            position: 'absolute',
            width: '100%',
            height: '100%',
            overflow: 'hidden'
        };
        return (
            <div ref="outerBox" style={outerStyle}>
                <img src={this.props.src} style={imgStyle} ref="media" onLoad={ ()=> {this.updateLayout()} } />
            </div>
        );
    }

    componentDidMount() {
        window.addEventListener('resize', () => {this.updateLayout()});
        this.updateLayout();
    }

    updateLayout() {
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(()=>
        {
            var outerBox = this.refs.outerBox.getDOMNode();
            var media = this.refs.media.getDOMNode();
            var mediaAspect = media.width/media.height;
            var boxAspect = outerBox.offsetWidth/outerBox.offsetHeight;
            var newState = {rendered:true};
            if (boxAspect>mediaAspect) {
                // pin sides, grow vertically
                newState.imgW = outerBox.offsetWidth;
                newState.imgH = outerBox.offsetWidth / mediaAspect;
            } else {
                // pin top/bottom. grow horizontally
                newState.imgH = outerBox.offsetHeight;
                newState.imgW = outerBox.offsetHeight * mediaAspect;
            }
            newState.imgX = (outerBox.offsetWidth-newState.imgW)/2;
            newState.imgY = (outerBox.offsetHeight-newState.imgH)/2;
            this.setState(newState);
        },0);

    }
}
