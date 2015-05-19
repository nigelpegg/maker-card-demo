import EventTarget from '../../model/EventTarget'

export default class AnimationSequence extends EventTarget {

    sequenceTransitionsThrough(p_nodes, p_statesThrough, p_removeFinal, p_removeInitial, p_stagger, p_delay)
    {
        for (var i=0; i<p_nodes.length; i++) {
            p_nodes[i].style['transition'] = '';
        }

        setTimeout(()=>
        {
            for (var i=0; i<p_nodes.length; i++) {
                this.sequenceTransitionThrough(p_nodes[i], p_statesThrough, p_removeFinal, p_removeInitial, p_stagger*i);
            }
        }, p_delay)
    }

    sequenceTransitionThrough(p_node, p_statesThrough, p_removeFinal, p_removeInitial, p_delay)
    {
        setTimeout(()=>
        {
            p_node.classList.remove(p_removeInitial);
            var currentIdx = 0;
            var transitionHandler = (e)=>
            {
                // the end condition here is either :
                // don't remove final and end at l-1 OR remove final and end at l
                var stopIndex = p_removeFinal ? p_statesThrough.length : p_statesThrough.length-1;
                if (currentIdx==stopIndex) {
                    // we've finished all transitions
                    p_node.removeEventListener('transitionend', transitionHandler);
                    p_node.style['transition'] = '';
                    return;
                }

                p_node.classList.remove(p_statesThrough[currentIdx]);

                if (++currentIdx<p_statesThrough.length) {
                    this.transitionNodeToState(p_node, p_statesThrough[currentIdx]);
                }
            };

            p_node.addEventListener('transitionend', transitionHandler);

            this.transitionNodeToState(p_node, p_statesThrough[currentIdx]);

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
        var prop = p_node.style['transition-property'];
        var dur = p_node.style['transition-duration'];
        var ease = p_node.style['transition-timing-function'];
        return {prop:prop, dur:dur, ease:ease};
    }

    writeTransition(p_node, p_obj)
    {
        p_node.style['transition-property'] = p_obj.prop;
        p_node.style['transition-duration'] = p_obj.dur;
        p_node.style['transition-timing-function'] = p_obj.ease;
    }

}