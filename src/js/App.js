'use strict';

import React from 'react';
import MakerCard from './MakerCard';
import FullBleed from './FullBleed';
import Centerer from './Centerer';

window.React = React;

React.render(
    <div>
        <FullBleed>
            <Centerer>
                <MakerCard />
            </Centerer>
        </FullBleed>
        <div className="maker-card">
            TESTING
        </div>
    </div>,

    document.body
);
