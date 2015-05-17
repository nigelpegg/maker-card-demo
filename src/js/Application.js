import React from 'react';
import MakerCard from './MakerCard';
import FullBleedLayout from './FullBleedLayout';
import StretchedMedia from './StretchedMedia';
import CenteredLayout from './CenteredLayout';

export default class Application extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bgIdx: 0
        };

        this.bgs = ['images/bg1.jpg', 'images/bg2.jpg', 'images/bg3.jpg', 'images/bg4.jpg'];
    }

    render() {
        return (
            <div>
                <FullBleedLayout>
                    <StretchedMedia src={ this.getCurrentBG() } className="transition-all" />
                    <CenteredLayout className="transition-all">
                        <MakerCard onClick={()=>{ this.incrementBG() }} />
                    </CenteredLayout>
                </FullBleedLayout>

                <div>
                    <p> TESTING BELOW FULLBLEED 1</p>
                    <p> TESTING BELOW FULLBLEED 2</p>
                    <p> TESTING BELOW FULLBLEED 3</p>
                </div>
                <div>
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
        this.setState({
            bgIdx: this.state.bgIdx+1
        });
    }

    getCurrentBG() {
        return this.bgs[this.state.bgIdx % this.bgs.length];
    }
}
