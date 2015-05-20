import EventTarget from '../../model/EventTarget'

export default class StaggeredAnimation extends EventTarget {

    constructor(props)
    {
        super(props);
        if (props.nodes) {
            var states = props.to || [];
            var removeFinal = (props.removeFinal!=null) ? props.removeFinal : false;
            var stagger = (props.stagger!=null) ? props.stagger : 0;
            var delay = (props.delay!=null) ? props.delay : 0;
            this.sequenceTransitionsThrough(props.nodes, states, removeFinal, props.from, stagger, delay);
        }
    }

    sequenceTransitionsThrough(p_nodes, p_statesThrough, p_removeFinal, p_removeInitial, p_stagger, p_delay)
    {
        for (var i=0; i<p_nodes.length; i++) {
            p_nodes[i].style['transition'] = '';
        }

        setTimeout(()=>
        {
            var finished = 0;
            for (var i=0; i<p_nodes.length; i++) {
                this.sequenceTransitionThrough(p_nodes[i], p_statesThrough, p_removeFinal, p_removeInitial, p_stagger*i,
                ()=>
                {
                    if (++finished>=p_nodes.length) {
                        this.dispatchEvent({type:'animationend'});
                    }
                });
            }
        }, p_delay)
    }

    sequenceTransitionThrough(p_node, p_statesThrough, p_removeFinal, p_removeInitial, p_delay, p_callBack)
    {
        setTimeout(()=>
        {
            var currentIdx = 0;
            var transitionHandler = (e)=>
            {
                // the end condition here is either :
                // don't remove final and end at l-1 OR remove final and end at l
                var stopIndex = p_removeFinal ? p_statesThrough.length : p_statesThrough.length-1;
                if (currentIdx>=stopIndex) {
                    // we've finished all transitions
                    p_node.removeEventListener('transitionend', transitionHandler);
                    p_node.style['transition'] = '';
                    if (p_callBack) {
                        p_callBack();
                    }
                    return;
                }
                p_node.classList.remove(p_statesThrough[currentIdx]);

                if (++currentIdx<p_statesThrough.length) {
                    this.transitionNodeToState(p_node, p_statesThrough[currentIdx]);
                }
            };

            p_node.addEventListener('transitionend', transitionHandler);

            if (p_removeInitial) {
                currentIdx = -1;
                this.writeTransition(p_node, this.readTransition(p_node));
                p_node.classList.remove(p_removeInitial);
            } else {
                this.transitionNodeToState(p_node, p_statesThrough[currentIdx]);
            }
        },p_delay);

    }

    transitionNodeToState(p_node, p_state)
    {

        // sneaky method that 'pre-reads' the transition defined in the next state,
        // applies it inline, then triggers the move to the next state
        p_node.style['transition'] = '';   // clean up any inline transitions

        // get the transition specified in the new state
        p_node.classList.add(p_state);
        var trans = this.readTransition(p_node);

        // revert back to the old state
        p_node.classList.remove(p_state);
        // write that transition inline
        this.writeTransition(p_node,trans);

        // need to wait a frame to make sure the transition exists before the new state
        setTimeout(function()
        {
            p_node.classList.add(p_state);
        },5)
    }

    readTransition(p_node)
    {
        var style = window.getComputedStyle(p_node);
        var prop = style['transition-property'];
        var dur = style['transition-duration'];
        var ease = style['transition-timing-function'];
        return {prop:prop, dur:dur, ease:ease};
    }

    writeTransition(p_node, p_obj)
    {
        p_node.style['transition-property'] = p_obj.prop;
        p_node.style['transition-duration'] = p_obj.dur;
        p_node.style['transition-timing-function'] = p_obj.ease;
    }

}