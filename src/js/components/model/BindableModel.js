import EventTarget from './EventTarget';

export default class BindableModel extends EventTarget {

    constructor(props)
    {
        super(props);
        this._propStore = {};
        for (var i in props) {
            this._propStore[i] = props[i];
        }
    }

    setProperty(p_name, p_value)
    {
        this._propStore[p_name] = p_value;
        this.dispatchEvent({type:'propertyChange', name:p_name})
    }

    getProperty(p_name)
    {
        return this._propStore[p_name];
    }
}