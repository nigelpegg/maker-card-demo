var Child = require('./Child');

module.exports = React.createClass({
    render: function() {
        return (
            <span className="commentBox">
                I am a Parent.<br/>
                <Child />
            </span>
        );
    }
});
