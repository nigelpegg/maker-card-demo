import React from 'react';

export default class ContentEditable extends React.Component {
    constructor(props) {
        super(props);
    }

    render()
    {
        return <this.props.tag
            {...this.props}
            onInput={(p_evt)=>{this.emitChange(p_evt)}}
            onBlur={(p_evt)=>{this.emitBlur(p_evt)}}
            contentEditable={this.props.editable}
            dangerouslySetInnerHTML={{__html: this.props.html}}></this.props.tag>;
    }

    shouldComponentUpdate(nextProps){
        return nextProps.html !== React.findDOMNode(this).innerHTML ||
                                    nextProps.editable !== this.props.editable;
    }

    componentDidUpdate() {
        if ( this.props.html !== React.findDOMNode(this).innerHTML ) {
            React.findDOMNode(this).innerHTML = this.props.html;
        }
    }

    emitChange(evt){
        var html = React.findDOMNode(this).innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {
            evt.value = html;
            this.props.onChange(evt);
        }
        this.lastHtml = html;
    }

    emitBlur(evt){
        if (this.props.onBlur) {
            evt.value = (this.lastHtml!=null) ? this.lastHtml : this.props.html;
            this.props.onBlur(evt);
        }
    }
}

ContentEditable.defaultProps = {
    editable: false,
    tag: 'div',
    html:''
};
