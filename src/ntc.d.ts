declare var ntc: {
    init: () => void;
    name: (color: any) => (string | boolean)[];
    hsl: (color: any) => number[];
    rgb: (color: any) => number[];
    names: string[][];
};
export { ntc };
