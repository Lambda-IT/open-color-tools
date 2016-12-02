import { VNode, div, pre } from '@cycle/dom'
import { DOMSource } from '@cycle/dom/xstream-typings'
import xs, { Stream } from 'xstream'
import { style, classes } from 'typestyle';
import * as csx from 'typestyle/lib/csx';
import { ntc } from './ntc';
import { paramCase } from 'change-case';

import { dot } from './util';
import { Group } from './types';

export type Sources = {
    DOM: DOMSource
}

export type Sinks = {
    DOM: Stream<VNode>
}

const circleClass = style({
    height: '5em',
    width: '5em',
    borderRadius: '2.5em'
});

export function App(sources: Sources, groups: Group[]): Sinks {
    const vtree$ = xs.of(
        div(groups.map(renderGroup))
    )
    const sinks = {
        DOM: vtree$
    }
    return sinks
}

const groupNameClass = dot(style({ fontWeight: 'bold', paddingBottom: '1em' }));
const groupClass = dot(style({ paddingBottom: '3em' }));

function renderGroup(group: Group) {
    const colors = group.colors.map((hex, i) => ({
        colorHeading: `${group.name.toUpperCase()} ${i}`,
        ocColorName: `$oc-${group.name}-${i}`,
        niceColorName: `${paramCase(ntc.name(hex)[1] as string)}`,
        hex: hex,
    }))
    return div(groupClass, [
        div(groupNameClass, [group.name]),
        div(dot(style(csx.horizontal)), colors.map(renderColor))
    ])
}

const colorClass = dot(style(csx.vertical, { minWidth: '9em', alignItems: 'center' }));
const textsClass = dot(style({ paddingTop: '1em' }));
const textClass = dot(style({ textAlign: 'center', lineHeight: '1.4em' }));

function renderColor(color: { colorHeading: string, ocColorName: string, niceColorName: string, hex: string }) {
    const thisCircleClass = dot(classes(circleClass, style( { background: color.hex })));
    return div(colorClass, [
        div(thisCircleClass),
        div(textsClass, [
            div(textClass, [color.colorHeading]),
            div(textClass, [color.ocColorName]),
            div(textClass, [color.niceColorName]),
            div(textClass, [color.hex])
        ])
    ]);
}
