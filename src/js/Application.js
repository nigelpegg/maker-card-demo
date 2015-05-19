import ModelBoundComponent from './components/boundUI/ModelBoundComponent';
import MakerCard from './MakerCard';
import FullBleedLayout from './components/ui/layouts/FullBleedLayout';
import StretchedMedia from './components/ui/StretchedMedia';
import CenteredLayout from './components/ui/layouts/CenteredLayout';
import BindableModel from './components/model/BindableModel';


export default class Application extends ModelBoundComponent {
    constructor(props) {
        super(props);

        this._bgs = ['images/bg1.jpg', 'images/bg2.jpg', 'images/bg3.jpg', 'images/bg4.jpg'];
        this._bgIdx = 0;

        this._profile = new BindableModel({
            name:'Nigel',
            imake:'chairs',
            cover:this.getCurrentBG(),
            avatarURL: 'images/full_avatar.jpg'
        });

        this.state = {
            editable: true
        };
        this.bindStateToModel(this._profile, ['cover']);
    }


    render() {
        return (
            <div>
                <FullBleedLayout>
                    <StretchedMedia src={ this.state.cover } className="transition-all" />
                    <CenteredLayout className="transition-all">
                        <MakerCard profile={this._profile} editable={this.state.editable} />
                    </CenteredLayout>
                </FullBleedLayout>

                <div onClick={()=>{this._profile.setProperty('name', 'Edith Au')}}>
                    <p> TESTING BELOW FULLBLEED 1</p>
                    <p> TESTING BELOW FULLBLEED 2</p>
                    <p> TESTING BELOW FULLBLEED 3</p>
                </div>
                <div onClick={()=>{this.incrementBG()}}>
                    <p> TESTING BELOW FULLBLEED 1</p>
                    <p> TESTING BELOW FULLBLEED 2</p>
                    <p> TESTING BELOW FULLBLEED 3</p>
                </div>
                <div onClick={()=>{this.debug()}}>
                    <p> TESTING BELOW FULLBLEED 1</p>
                    <p> TESTING BELOW FULLBLEED 2</p>
                    <p> TESTING BELOW FULLBLEED 3</p>
                </div>

            </div>
        );
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
