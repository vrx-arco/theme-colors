import { colorPalette } from './palette'
import { colorPaletteDark } from './palette-dark'
import type { ColorFormats } from './utils'

export interface GenerateOptions<List extends boolean = false> {
  index?: number
  dark?: boolean
  list?: List
  format?: ColorFormats
}

export function generate(color: string, options: GenerateOptions): string

export function generate<List extends boolean = true>(
  color: string,
  options: GenerateOptions<List>
): string[]

export function generate<List extends boolean = false>(
  color: string,
  options: GenerateOptions<List>
): string

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
export function generate(color: string, options: GenerateOptions = {}): string | string[] {
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
