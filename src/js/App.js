'use strict';

import React from 'react';
import MakerCard from './MakerCard';
import FullBleedLayout from './FullBleedLayout';
import StretchedMedia from './StretchedMedia';
import Centerer from './Centerer';

window.React = React;

React.render(
    <div>
        <FullBleedLayout>
            <StretchedMedia />
            <Centerer>
                <MakerCard />
            </Centerer>
        </FullBleedLayout>
        <div className="maker-card">
            TESTING
        </div>

    </div>,

    document.body
);
