import { type ColorFormats, TinyColor } from '@ctrl/tinycolor'
import { getColorString, toHSV } from './utils'
import { colorPalette } from './palette'

// 暗色色板

// 动态梯度算法
export function colorPaletteDark(originColor: string, i: number, format?: ColorFormats) {
  const lightColor = toHSV(new TinyColor(colorPalette(originColor, 10 - i + 1)))
  const originBaseColor = toHSV(new TinyColor(originColor))

  const originBaseHue = originBaseColor.h
  const originBaseSaturation = originBaseColor.s
  const baseColor = new TinyColor({
    h: originBaseColor.h,
    s: getNewSaturation(6),
    v: originBaseColor.v,
  })

  const baseSaturation = toHSV(baseColor).s
  const step = Math.ceil((baseSaturation - 9) / 4)
  const step1to5 = Math.ceil((100 - baseSaturation) / 5)

  function getNewSaturation(_index) {
    if (_index < 6) {
      return baseSaturation + (6 - _index) * step1to5
    }
    if (_index === 6) {
      if (originBaseHue >= 0 && originBaseHue < 50) {
        return originBaseSaturation - 15
      }
      if (originBaseHue >= 50 && originBaseHue < 191) {
        return originBaseSaturation - 20
      }
      if (originBaseHue >= 191 && originBaseHue <= 360) {
        return originBaseSaturation - 15
      }
    }

    return baseSaturation - step * (_index - 6)
  }

  const retColor = new TinyColor({
    h: lightColor.h,
    s: getNewSaturation(i),
    v: lightColor.v,
  })

  return getColorString(retColor, format)
}
