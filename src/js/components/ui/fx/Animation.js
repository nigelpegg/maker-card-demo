import React from 'react';

export default class Animation extends React.Component {}

Animation.propTypes = {
    selector:React.PropTypes.string.isRequired,

    from:React.PropTypes.string,
    to: React.PropTypes.number,
    removeFinal: React.PropTypes.bool,
    stagger: React.PropTypes.number,
    delay: React.PropTypes.number
};
