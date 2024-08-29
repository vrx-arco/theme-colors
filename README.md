# ArcoDesign Color

Fork from [@arco-design/color](https://github.com/arco-design/color)

> Committed to `ESM` first, in `vite` similar tools, you can skip dependency pre-bundling

ArcoDesign Color Utils. 

For a given color, a gradient swatch containing ten colors is generated with an algorithm. This works for both light and dark modes.

## Usage

```bash
npm i @vrx-arco/theme-colors
```

```js
import { generate, getPresetColors } from '@vrx-arco/theme-colors';

console.log(generate('#123456'));

console.log(getPresetColors());
// {
//   red: {...},
//   orangered: {...},
//   orange: {...},
//   gold: {...},
//   yellow: {...},
//   lime: {...},
//   green: {...},
//   cyan: {...},
//   blue: {...},
//   arcoblue: {...},
//   purple: {...},
//   pinkpurple: {...},
//   magenta: {...},
//   gray: {...}
// }
```

## API

### generate(color: string, options: Object);

#### options.index {number | 1-10}

Index (starting from 1) of the gradient colors to be generated.

#### options.list {boolean}

Whether to generate color array containing the ten colors.

#### options.dark

Whether to generate colors for dark mode.

#### options.format {'hex' | 'rgb' | 'hsl'}

Color format.
### getPresetColors {Function}

Contains 14 preset sets of colors.

* `red`
* `orangered`
* `orange`
* `gold`
* `yellow`
* `lime`
* `green`
* `cyan`
* `blue`
* `arcoblue`
* `purple`
* `pinkpurple`
* `magenta`
* `gray`

```js
const { red } = getPresetColors();

console.log(red.light);
console.log(red.dark);
console.log(red.primary);
```

### getRgbStr(color: string)

For a given color, get the r, g, b value in string

```js
getRgbStr('#F53F3F') // 245,63,63
```

### ⚠️FAQ

#### The generated color palette is different from [`@arco-design/color`](https://github.com/arco-design/color)

- In order to achieve pure ESM, the color parsing tool is replaced by [`@ctrl/tinycolor`](https://github.com/scttcper/tinycolor) used in ant-design and element. There are slight differences in precision in color calculation, and slight differences in the actual generated colors, but the difference is not big in actual display.
- In subsequent versions, the `color` package used by the original project [`@arco-design/color`](https://github.com/arco-design/color) may be rewritten to keep the returned data consistent
