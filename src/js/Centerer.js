
module.exports = React.createClass({
    getInitialState: function()
    {
        return {
            shimX : 0,
            shimY : 0
        };
    },
    render: function()
    {
        var shimStyle = {
            display: "inline",
            position:'relative',
            top: this.state.shimY,
            left: this.state.shimX
        };
        return (
            <div {...this.props} ref="outerBox">
                <div ref="centerShim" style={shimStyle}>
                    {this.props.children}
                </div>
            </div>
            );
    },

    componentDidMount: function()
    {
        window.addEventListener('resize', this.updateShimPosition);
        this.updateShimPosition();
    },

    updateShimPosition: function()
    {
        var outerBox = this.refs.outerBox.getDOMNode();
        var shim = this.refs.centerShim.getDOMNode();

        this.setState({
            shimX: Math.round((outerBox.offsetWidth-shim.offsetWidth)/2),
            shimY: Math.round((outerBox.offsetHeight-shim.offsetHeight)/2)
        });
    }


});
