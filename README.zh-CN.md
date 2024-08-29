# ArcoDesign Color

Fork from [@arco-design/color](https://github.com/arco-design/color)

> 致力于 `ESM` 优先，在 `vite` 类似工具中，可以跳过依赖预构建

ArcoDesign Color Utils. 

根据给定颜色通过算法生成指定包含十个颜色的梯度色板，也可生成暗色模式下包含十个颜色的色板。

## Usage

```bash
npm i @vrx-arco/theme-colors
```

```js
import { generate, presetColor } from '@vrx-arco/theme-colors';

console.log(generate('#123456'));

console.log(presetColor);
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

生成 10 个梯度色中的第几个颜色。

#### options.list {boolean}

生成包含十个颜色的梯度颜色数组。

#### options.dark

生成暗色色板的颜色。

#### options.format {'hex' | 'rgb' | 'hsl'}

生成颜色的格式。

### getPresetColors {Function}

包含了预设的 14 组颜色，包括一组中性灰。

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

获得指定颜色的三通道 r, g, b 字符串。

```js
getRgbStr('#F53F3F') // 245,63,63
```

### ⚠️常见问题

#### 生成的色板与[`@arco-design/color`](https://github.com/arco-design/color)存在差异

- 为了达到纯 ESM 的目的，颜色解析工具替换为在 ant-design 与 element 中使用的 [`@ctrl/tinycolor`](https://github.com/scttcper/tinycolor)。颜色计算中精度存在细微差别,实际生成的颜色存在细微差别，但在实际显示中相差不大。
- 在后续版本中，为了保持返回数据一致，可能会将原项目[`@arco-design/color`](https://github.com/arco-design/color)使用的 `color` 包进行改写
