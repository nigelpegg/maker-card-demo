'use strict';

import React from 'react';
import MakerCard from './MakerCard';
import FullBleedLayout from './FullBleedLayout';
import StretchedMedia from './StretchedMedia';
import CenteredLayout from './CenteredLayout';

window.React = React;

React.render(
    <div>
        <FullBleedLayout>
            <StretchedMedia />
            <CenteredLayout>
                <MakerCard />
            </CenteredLayout>
        </FullBleedLayout>

        <div>
            <p> TESTING BELOW FULLBLEED 1</p>
            <p> TESTING BELOW FULLBLEED 2</p>
            <p> TESTING BELOW FULLBLEED 3</p>
        </div>

    </div>,

    document.body
);
