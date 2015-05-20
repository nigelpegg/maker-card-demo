import React from 'react';
import StaggeredAnimation from './StaggeredAnimation';

export default class AnimationSequence extends React.Component {

    constructor(props)
    {
        super(props);
    }

    render()
    {
        var style = { display:'none' };
        return (
            <div style={style}/>
        );
    }

    play()
    {
        var totalAnimations = React.Children.count(this.props.children);
        var completedAnimations = 0;
        React.Children.forEach(this.props.children,
            (p_child)=>
            {
                var to = p_child.props.to;
                if (to!=null) {
                    if (!Array.isArray(to)) {
                        to = [to];
                    }
                }
                var anim = new StaggeredAnimation({
                    nodes:document.querySelectorAll(p_child.props.selector),
                    from:p_child.props.from,
                    to: to,
                    removeFinal: p_child.props.removeFinal,
                    stagger: p_child.props.stagger,
                    delay: p_child.props.delay
                });
                if (p_child.props.onComplete) {
                    anim.addEventListener('animationend', ()=>
                    {
                        p_child.props.onComplete();
                    });
                }

                if (this.props.onComplete) {
                    anim.addEventListener('animationend', ()=>
                    {
                        if (++completedAnimations>=totalAnimations) {
                            this.props.onComplete();
                        }
                    });
                }
            });
    }
}