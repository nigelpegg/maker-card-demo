export default class EventTarget extends Object {

    constructor(props)
    {
        super(props);
        this._listeners = {};
    }

    addEventListener(p_type, p_handler)
    {
        if (!this._listeners[p_type]) {
            this._listeners[p_type] = [];
        }
        this._listeners[p_type].push(p_handler);
    }

    removeEventListener(p_type, p_handler)
    {
        var typeListeners = this._listeners[p_type];
        if (typeListeners) {
            for (var i=0; i<typeListeners.length; i++) {
                if (typeListeners[i]==p_handler) {
                    typeListeners.splice(i,1);
                    return;
                }
            }
        }
    }

    dispatchEvent(p_evt)
    {
        if (!p_evt.target) {
            p_evt.target = this;
        }
        var typeListeners = this._listeners[p_evt.type];
        if (typeListeners) {
            for (var i=0; i<typeListeners.length; i++) {
                typeListeners[i].call(this, p_evt);
            }
        }
    }
}