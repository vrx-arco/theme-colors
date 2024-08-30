import { type Numberify, type RGB, inputToRGB, rgbToHex, rgbToHsl, rgbToHsv } from '@ctrl/tinycolor'

export function getRgbStr(color: string) {
  const rgb = inputToRGB(color)
  return `${rgb.r},${rgb.g},${rgb.b}`
}

export type ColorFormats = 'hex' | 'rgb' | 'hsl'

const formats: ColorFormats[] = ['hex', 'rgb', 'hsl']

function getFormat(format?: ColorFormats) {
  if (!format || !formats.includes(format)) {
    return 'hex'
  }
  return format
}

export function getColorString(color: Numberify<RGB>, format?: ColorFormats) {
  const innerFormat = getFormat(format)
  const config = {
    hex: () => '#' + rgbToHex(color.r, color.g, color.b, false).toUpperCase(),
    hsl: () => {
      const hsl = rgbToHsl(color.r, color.g, color.b)
      const h = Math.round(hsl.h * 360)
      const s = Math.round(hsl.s * 100)
      const l = Math.round(hsl.l * 100)
      return `hsl(${h}, ${s}%, ${l}%)`
    },
    rgb: () => {
      const r = Math.round(color.r)
      const g = Math.round(color.g)
      const b = Math.round(color.b)
      return `rgb(${r}, ${g}, ${b})`
    },
  }
  return config[innerFormat]()
}

export function toHSV(color: Numberify<RGB>) {
  const hsv = rgbToHsv(color.r, color.g, color.b)
  return {
    h: hsv.h * 360,
    s: hsv.s * 100,
    v: hsv.v * 100,
  }
}
