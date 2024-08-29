import { ColorFormats } from '@ctrl/tinycolor';

/**
 * @param {string} color
 * @param {Object} options
 * @param {number} options.index 1 - 10 (default: 6)
 * @param {boolean} options.dark
 * @param {boolean} options.list
 * @param {string} options.format 'hex' | 'rgb' | 'hsl'
 *
 * @return string | string[]
 */
declare function generate(color: string, options?: {
    index?: number;
    dark?: boolean;
    list?: boolean;
    format?: Extract<ColorFormats, 'hex' | 'rgb' | 'hsl'>;
}): string | string[];

declare function getRgbStr(color: string): string;

declare const colorList: {
    red: string;
    orangered: string;
    orange: string;
    gold: string;
    yellow: string;
    lime: string;
    green: string;
    cyan: string;
    blue: string;
    arcoblue: string;
    purple: string;
    pinkpurple: string;
    magenta: string;
};
declare function getPresetColors(): Record<keyof typeof colorList | 'gray', {
    light: string[];
    dark: string[];
    primary: string;
}>;

export { generate, getPresetColors, getRgbStr };
