import React from 'react';
import ModelBoundComponent from './components/boundUI/ModelBoundComponent';
import BoundContentEditable from './components/boundUI/BoundContentEditable';
import BindableModel from './components/model/BindableModel';

export default class MakerCard extends ModelBoundComponent {
    constructor(props) {
        super(props);
        this.bindStateToModel(this.props.profile, ['avatarURL']);
    }

    render() {

        var classNames = 'maker-card ';
        if (this.props.className) {
            classNames += this.props.className;
        }
        return (
            <div id={this.props.id} className={classNames}>

                <img src={this.state.avatarURL} className="avatar-img"/>
                <BoundContentEditable
                            tag="h1" placeholder="Your name"
                            editable={this.props.editable}
                            model={this.props.profile} propertyName="name" />
                I make <BoundContentEditable
                            tag="span" placeholder="Awesome stuff"
                            editable={this.props.editable}
                            model={this.props.profile} propertyName="imake"/>
            </div>
        );
    }
}

MakerCard.propTypes = {
    profile: React.PropTypes.instanceOf(BindableModel).isRequired,
    editable: React.PropTypes.bool
};

MakerCard.defaultProps = {
    editable : true
};
