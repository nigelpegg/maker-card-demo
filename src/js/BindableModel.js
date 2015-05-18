import EventTarget from './EventTarget';

export default class BindableModel extends EventTarget {

    constructor(props)
    {
        super(props);
        for (var i in props) {
            this[i] = props[i];
        }
    }

    setProperty(p_name, p_value)
    {
        this[p_name] = p_value;
        this.dispatchEvent({type:'propertyChange', name:p_name})
    }

}