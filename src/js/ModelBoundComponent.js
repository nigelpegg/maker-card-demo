import React from 'react';

export default class ModelBoundComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    bindStateToModel(p_model, p_propMap)
    {
        if (this.state==null) {
            this.state = {};
        }
        if (Array.isArray(p_propMap)) {
            var tmpMap = {};
            for (var i=0; i<p_propMap.length; i++) {
                tmpMap[p_propMap[i]] = p_propMap[i];
            }
            p_propMap = tmpMap;
        }
        for (var modelPropName in p_propMap) {
            this.state[p_propMap[modelPropName]] = p_model.getProperty(modelPropName);
        }
        p_model.addEventListener('propertyChange',
            (p_evt)=>
            {
                var statePropName = p_propMap[p_evt.name];
                if (statePropName) {
                    var newState = {};
                    newState[statePropName] = p_model.getProperty(p_evt.name);
                    this.setState(newState);
                }
            })
    }

}