var React = require('react');
// Here we put our React instance to the global scope. Make sure you do not put it
// into production and make sure that you close and open your console if the
// DEV-TOOLS does not display
window.React = React;

var MakerCard = require('./MakerCard');
var Centerer = require('./Centerer');

React.render(
    <div className="fullScreen">
        <Centerer className="fullScreen">
            <MakerCard />
        </Centerer>
    </div>,
    document.getElementById('app')
);