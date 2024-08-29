import { ColorFormats, TinyColor } from '@ctrl/tinycolor'

export function getRgbStr(color: string) {
  const rgb = new TinyColor(color).toRgb()
  return [rgb.r, rgb.g, rgb.b].filter((i) => i != null).join(',')
}

const formats: ColorFormats[] = ['hex', 'rgb', 'hsl']

function getFormat(format?: ColorFormats) {
  if (!format || !formats.includes(format)) {
    return 'hex'
  }
  return format
}

export function getColorString(color: TinyColor, format?: ColorFormats) {
  const innerFormat = getFormat(format)

  if (innerFormat === 'hex') {
    return color.toString('hex').toUpperCase()
  }
  return color.toString(innerFormat)
}

export function toHSV(color: TinyColor) {
  const hsv = color.toHsv()
  return {
    h: hsv.h,
    s: hsv.s * 100,
    v: hsv.v * 100,
  }
}
