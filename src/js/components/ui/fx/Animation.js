import React from 'react';

export default class Animation extends React.Component {}

Animation.propTypes = {
    selector:React.PropTypes.string.isRequired,

    from:React.PropTypes.string,
    to: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
    removeFinal: React.PropTypes.bool,
    stagger: React.PropTypes.number,
    delay: React.PropTypes.number,
    onComplete: React.PropTypes.func

};
