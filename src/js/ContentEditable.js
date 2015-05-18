import React from 'react';

export default class ContentEditable extends React.Component {
    constructor(props) {
        super(props);
    }

    render()
    {
        var tagClass = React.DOM[this.props.tag];
        return <tagClass
            {...this.props}
            onInput={()=>{this.emitChange()}}
            onBlur={()=>{this.emitChange()}}
            contentEditable={this.props.editable}
            dangerouslySetInnerHTML={{__html: this.props.html}}></tagClass>;
    }

    shouldComponentUpdate(nextProps){
        return nextProps.html !== React.findDOMNode(this).innerHTML;
    }

    componentDidUpdate() {
        if ( this.props.html !== React.findDOMNode(this).innerHTML ) {
            React.findDOMNode(this).innerHTML = this.props.html;
        }
    }

    emitChange(evt){
        var html = React.findDOMNode(this).innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {
            evt.target = { value: html };
            this.props.onChange(evt);
        }
        this.lastHtml = html;
    }
}

ContentEditable.defaultProps = {
    editable: false,
    tag: 'div'
};
