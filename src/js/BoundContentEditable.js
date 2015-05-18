import ModelBoundComponent from './ModelBoundComponent';
import ContentEditable from './ContentEditable';
import React from 'react';
import BindableModel from './BindableModel';

export default class BoundContentEditable extends ModelBoundComponent {
    constructor(props)
    {
        super(props);
        var propMap = {};
        propMap[this.props.propertyName] = 'value';
        this.bindStateToModel(this.props.model, propMap);
    }

    render()
    {
        return <ContentEditable {...this.props} html={this.state.value}
                    onBlur={(p_evt)=>{this.onCommit(p_evt)}} />;
    }

    onCommit(p_evt)
    {
        if (p_evt.value!==this.state.value) {
            this.props.model.setProperty(this.props.propertyName, p_evt.value);
        }
    }

}
BoundContentEditable.propTypes = {
    model: React.PropTypes.instanceOf(BindableModel).isRequired,
    propertyName: React.PropTypes.string.isRequired
};