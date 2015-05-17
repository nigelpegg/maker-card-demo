import React from 'react';

export default class CenteredLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shimX: 0,
            shimY: 0,
            rendered: false
        };
        this.debounceTimeout = null;
    }

    render() {
        var shimStyle = {
            display: "inline",
            position: 'absolute',
            top: this.state.shimY,
            left: this.state.shimX,
            opacity: this.state.rendered ? 1 : 0
        };
        var outerStyle = {
            width: '100%',
            height: '100%'
        };
        return (
            <div ref="outerBox" style={outerStyle}>
                <span ref="centerShim" style={shimStyle} {...this.props} >
                    {this.props.children}
                </span>
            </div>
        );
    }

    componentDidMount() {
        window.addEventListener('resize', () => {this.updateShimPosition()});
        this.updateShimPosition();
    }

    updateShimPosition() {
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(()=>
        {
            var outerBox = this.refs.outerBox.getDOMNode();
            var shim = this.refs.centerShim.getDOMNode();
            this.setState({
                shimX: (this.props.horizontal=="true") ? Math.round((outerBox.offsetWidth - shim.offsetWidth) / 2) : 0,
                shimY: (this.props.vertical=="true") ? Math.round((outerBox.offsetHeight - shim.offsetHeight) / 2) : 0,
                rendered: true
            });
        },0);

    }
}
CenteredLayout.defaultProps = {
    vertical : "true",
    horizontal : "true"
};
