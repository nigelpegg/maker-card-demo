import ModelBoundComponent from './components/boundUI/ModelBoundComponent';
import MakerCard from './MakerCard';
import FullBleedLayout from './components/ui/layouts/FullBleedLayout';
import StretchedMedia from './components/ui/StretchedMedia';
import CenteredLayout from './components/ui/layouts/CenteredLayout';
import BindableModel from './components/model/BindableModel';
import AnimationSequence from './components/ui/fx/AnimationSequence'


export default class Application extends ModelBoundComponent {
    constructor(props) {
        super(props);

        this._bgs = ['images/bg1.jpg', 'images/bg2.jpg', 'images/bg3.jpg', 'images/bg4.jpg'];
        this._bgIdx = 0;

        this._profile = new BindableModel({
            name:'Nigel Pegg',
            imake:'Crafty UX',
            cover:this.getCurrentBG(),
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
                    <StretchedMedia src={ this.state.cover } className={this.state.resizeClass} />
                    <CenteredLayout className={this.state.resizeClass}>
                        <MakerCard id="card" className="staged" profile={this._profile} editable={this.state.editable} />
                    </CenteredLayout>
                </FullBleedLayout>


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
        setTimeout(()=>
        {
            var nodes = document.querySelectorAll('.maker-card');
            var sequence = new AnimationSequence();
            sequence.sequenceTransitionsThrough(nodes, [], false, 'staged');
            this.setState({resizeClass:'transition-all'});
        },500);
    }

    incrementBG() {
        this._bgIdx++;
        this._profile.setProperty('cover', this.getCurrentBG());
    }

    getCurrentBG() {
        return this._bgs[this._bgIdx % this._bgs.length];
    }

    debug() {
        debugger;
    }
}
