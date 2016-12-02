import { VNode } from '@cycle/dom';
import { DOMSource } from '@cycle/dom/xstream-typings';
import { Stream } from 'xstream';
import { Group } from './types';
export declare type Sources = {
    DOM: DOMSource;
};
export declare type Sinks = {
    DOM: Stream<VNode>;
};
export declare function App(sources: Sources, groups: Group[]): Sinks;
