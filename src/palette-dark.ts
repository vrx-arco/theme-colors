import { inputToRGB } from '@ctrl/tinycolor'
import { colorPalette } from './palette'
import { type ColorFormats, getColorString, toHSV } from './utils'

// 暗色色板

// 动态梯度算法
export function colorPaletteDark(originColor: string, i: number, format?: ColorFormats) {
  const lightColor = toHSV(inputToRGB(colorPalette(originColor, 10 - i + 1)))
  const originBaseColor = toHSV(inputToRGB(originColor))

  const originBaseHue = originBaseColor.h
  const originBaseSaturation = originBaseColor.s
  const baseColor = inputToRGB({
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

  const retColor = inputToRGB({
    h: lightColor.h,
    s: getNewSaturation(i),
    v: lightColor.v,
  })

  return getColorString(retColor, format)
}
