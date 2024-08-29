'use strict';

var tinycolor = require('@ctrl/tinycolor');

// src/palette.ts
function getRgbStr(color) {
  const rgb = new tinycolor.TinyColor(color).toRgb();
  return [rgb.r, rgb.g, rgb.a, rgb.a].filter((i) => i != null).join(",");
}
var formats = ["hex", "rgb", "hsl"];
function getFormat(format) {
  if (!format || !formats.includes(format)) {
    return "hex";
  }
  return format;
}
function getColorString(color, format) {
  const innerFormat = getFormat(format);
  if (innerFormat === "hex") {
    return color.toString("hex");
  }
  return color.toString(innerFormat);
}

// src/palette.ts
function colorPalette(originColor, i, format) {
  const color = new tinycolor.TinyColor(originColor);
  const { h, s, v } = color.toHsv();
  const hueStep = 2;
  const maxSaturationStep = 100;
  const minSaturationStep = 9;
  const maxValue = 100;
  const minValue = 30;
  function getNewHue(isLight2, i2) {
    let hue;
    if (h >= 60 && h <= 240) {
      hue = isLight2 ? h - hueStep * i2 : h + hueStep * i2;
    } else {
      hue = isLight2 ? h + hueStep * i2 : h - hueStep * i2;
    }
    if (hue < 0) {
      hue += 360;
    } else if (hue >= 360) {
      hue -= 360;
    }
    return Math.round(hue);
  }
  function getNewSaturation(isLight2, i2) {
    let newSaturation;
    if (isLight2) {
      newSaturation = s <= minSaturationStep ? s : s - (s - minSaturationStep) / 5 * i2;
    } else {
      newSaturation = s + (maxSaturationStep - s) / 4 * i2;
    }
    return newSaturation;
  }
  function getNewValue(isLight2, i2) {
    return isLight2 ? v + (maxValue - v) / 5 * i2 : v <= minValue ? v : v - (v - minValue) / 4 * i2;
  }
  const isLight = i < 6;
  const index = isLight ? 6 - i : i - 6;
  const retColor = i === 6 ? color : new tinycolor.TinyColor({
    h: getNewHue(isLight, index),
    s: getNewSaturation(isLight, index),
    v: getNewValue(isLight, index)
  });
  return getColorString(retColor, format);
}
function colorPaletteDark(originColor, i, format) {
  const lightColor = new tinycolor.TinyColor(colorPalette(originColor, 10 - i + 1)).toHsv();
  const originBaseColor = new tinycolor.TinyColor(originColor).toHsv();
  const originBaseHue = originBaseColor.h;
  const originBaseSaturation = originBaseColor.s;
  const baseColor = new tinycolor.TinyColor({
    h: originBaseColor.h,
    s: getNewSaturation(6),
    v: originBaseColor.v
  });
  const baseSaturation = baseColor.toHsv().s;
  const step = Math.ceil((baseSaturation - 9) / 4);
  const step1to5 = Math.ceil((100 - baseSaturation) / 5);
  function getNewSaturation(_index) {
    if (_index < 6) {
      return baseSaturation + (6 - _index) * step1to5;
    }
    if (_index === 6) {
      if (originBaseHue >= 0 && originBaseHue < 50) {
        return originBaseSaturation - 15;
      }
      if (originBaseHue >= 50 && originBaseHue < 191) {
        return originBaseSaturation - 20;
      }
      if (originBaseHue >= 191 && originBaseHue <= 360) {
        return originBaseSaturation - 15;
      }
    }
    return baseSaturation - step * (_index - 6);
  }
  const retColor = new tinycolor.TinyColor({
    h: lightColor.h,
    s: getNewSaturation(i),
    v: lightColor.v
  });
  return getColorString(retColor, format);
}

// src/generate.ts
function generate(color, options = {}) {
  const { dark, list, index = 6, format = "hex" } = options;
  if (list) {
    const list2 = [];
    const func = dark ? colorPaletteDark : colorPalette;
    for (let i = 1; i <= 10; i++) {
      list2.push(func(color, i, format));
    }
    return list2;
  }
  return dark ? colorPaletteDark(color, index, format) : colorPalette(color, index, format);
}

// src/index.ts
var colorList = {
  red: "#F53F3F",
  orangered: "#F77234",
  orange: "#FF7D00",
  gold: "#F7BA1E",
  yellow: "#FADC19",
  lime: "#9FDB1D",
  green: "#00B42A",
  cyan: "#14C9C9",
  blue: "#3491FA",
  arcoblue: "#165DFF",
  purple: "#722ED1",
  pinkpurple: "#D91AD9",
  magenta: "#F5319D"
};
function getPresetColors() {
  const presetColors = {};
  Object.keys(colorList).forEach((key) => {
    presetColors[key] = {};
    presetColors[key].light = generate(colorList[key], { list: true });
    presetColors[key].dark = generate(colorList[key], { list: true, dark: true });
    presetColors[key].primary = colorList[key];
  });
  presetColors.gray = {};
  presetColors.gray.light = [
    "#f7f8fa",
    "#f2f3f5",
    "#e5e6eb",
    "#c9cdd4",
    "#a9aeb8",
    "#86909c",
    "#6b7785",
    "#4e5969",
    "#272e3b",
    "#1d2129"
  ];
  presetColors.gray.dark = [
    "#17171a",
    "#2e2e30",
    "#484849",
    "#5f5f60",
    "#78787a",
    "#929293",
    "#ababac",
    "#c5c5c5",
    "#dfdfdf",
    "#f6f6f6"
  ];
  presetColors.gray.primary = presetColors.gray.light[6];
  return presetColors;
}

exports.generate = generate;
exports.getPresetColors = getPresetColors;
exports.getRgbStr = getRgbStr;
