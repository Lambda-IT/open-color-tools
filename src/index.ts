import { run } from '@cycle/xstream-run';
import { makeDOMDriver } from '@cycle/dom';
import { App } from './app';
import { normalize, setupPage } from 'typestyle/lib/csx';

import { Group } from './types';

normalize();
setupPage('#app');

var openColors = require("json-loader!../node_modules/open-color/open-color.json");

function getGroups(): Group[] {
    return Object.keys(openColors)
        .filter(x => x !== 'white' && x !== 'black')
        .map(name => ({ name, colors: openColors[name] }));
}

const main = function(sources: any) {
    return App(sources, getGroups());
};

const drivers = {
    DOM: makeDOMDriver('#app')
}

run(main, drivers);
