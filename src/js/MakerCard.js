import React from 'react';

export default class MakerCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div {...this.props} className="maker-card">
                I Make
            </div>
        );
    }
}
