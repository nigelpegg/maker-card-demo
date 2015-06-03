import ModelBoundComponent from './components/boundUI/ModelBoundComponent';
import MakerCard from './MakerCard';
import FullBleedLayout from './components/ui/layouts/FullBleedLayout';
import StretchedMedia from './components/ui/StretchedMedia';
import CenteredLayout from './components/ui/layouts/CenteredLayout';
import BindableModel from './components/model/BindableModel';

import AnimationSequence from './components/ui/fx/AnimationSequence';
import Animation from './components/ui/fx/Animation';

import DebugLogger from './components/DebugLogger';
import React from 'react';

export default class Application extends ModelBoundComponent {
    constructor(props) {
        super(props);

        React.initializeTouchEvents(true);

        this._profile = new BindableModel({
            name:'Nigel Pegg',
            imake:'Crafty UX',
            cover:'images/bg1.jpg',
            avatarURL: 'images/full_avatar.jpg'
        });

        this.state = {
            editable: true,
            resizeClass: 'transition-fade'
        };
        this.bindStateToModel(this._profile, ['cover']);
    }


    render() {
        return (
            <div>
                <FullBleedLayout>
                    <StretchedMedia src={ this.state.cover } className={this.state.resizeClass} onTouchStart={(e)=>{this.handleTouch(e)}} />
                    <CenteredLayout className={this.state.resizeClass}>
                        <MakerCard className="staged card" profile={this._profile} editable={this.state.editable} />
                    </CenteredLayout>
                </FullBleedLayout>

                <AnimationSequence ref="entrance" onComplete={()=>{}} >
                    <Animation selector=".card" from="staged" to={['bounce','normal']} stagger="250" onComplete={()=>{}} />
                </AnimationSequence>

                <AnimationSequence ref="left" onComplete={()=>{}} >
                    <Animation selector=".card" to={['bounce-right','bounce-left','left']} onComplete={()=>{console.log('left')}} />
                </AnimationSequence>

                <AnimationSequence ref="right" onComplete={()=>{}} >
                    <Animation selector=".card" to={['pull-left','bounce-right','right']} onComplete={()=>{}} />
                </AnimationSequence>

                <div onClick={()=>{this.debug()}}>
                    <p> TESTING BELOW FULLBLEED 1</p>
                    <p> TESTING BELOW FULLBLEED 2</p>
                    <p> TESTING BELOW FULLBLEED 3</p>
                </div>

            </div>
        );
    }

    componentDidMount()
    {
        window.addEventListener('keydown', (p_evt)=>{this.onKeyDown(p_evt)})
        setTimeout(()=>
        {
            this.refs.entrance.play();
            this.setState({resizeClass:'transition-all'});
        },500);
    }

    onKeyDown(p_evt)
    {
        if (p_evt.keyCode == 37) {
            this.refs.left.play();
        } else if (p_evt.keyCode == 39) {
            this.refs.right.play();
        }
    }

    handleTouch(p_evt)
    {
        if (this._anim=="right") {
            this._anim = "left";
            this.refs.left.play();
        } else {
            this._anim = "right";
            this.refs.right.play();
        }
        DebugLogger.log('t')
    }

    debug() {
        debugger;
    }
}
