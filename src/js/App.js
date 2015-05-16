'use strict';

import React from 'react';
import MakerCard from './MakerCard';
import FullBleed from './FullBleed';
import Centerer from './Centerer';

React.render(
    <FullBleed>
        <Centerer>
            <MakerCard />
        </Centerer>
    </FullBleed>,
    document.getElementById('app')
);
