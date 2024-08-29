import type { ColorFormats } from '@ctrl/tinycolor'
import { colorPalette } from './palette'
import { colorPaletteDark } from './palette-dark'

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
export function generate(
  color: string,
  options: {
    index?: number
    dark?: boolean
    list?: boolean
    format?: Extract<ColorFormats, 'hex' | 'rgb' | 'hsl'>
  } = {}
) {
  const { dark, list, index = 6, format = 'hex' } = options

  if (list) {
    const list: string[] = []
    const func = dark ? colorPaletteDark : colorPalette
    for (let i = 1; i <= 10; i++) {
      list.push(func(color, i, format))
    }
    return list
  }
  return dark ? colorPaletteDark(color, index, format) : colorPalette(color, index, format)
}
