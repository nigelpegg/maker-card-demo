import ModelBoundComponent from './ModelBoundComponent';
import MakerCard from './MakerCard';
import FullBleedLayout from './FullBleedLayout';
import StretchedMedia from './StretchedMedia';
import CenteredLayout from './CenteredLayout';
import BindableModel from './BindableModel';

export default class Application extends ModelBoundComponent {
    constructor(props) {
        super(props);

        this._bgs = ['images/bg1.jpg', 'images/bg2.jpg', 'images/bg3.jpg', 'images/bg4.jpg'];
        this._bgIdx = 0;

        this._profile = new BindableModel({name:'Nigel', imake:'chairs', cover:this.getCurrentBG()});

        this.bindModelToState(this._profile, ['cover'])
    }


    render() {
        return (
            <div>
                <FullBleedLayout>
                    <StretchedMedia src={ this.state.cover } className="transition-all" />
                    <CenteredLayout className="transition-all">
                        <MakerCard profile={this._profile} />
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
                <div>
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
}
