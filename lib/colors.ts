export const colors = {
  brand:       '#2584FE',
  brandDark:   '#1565c8',
  brandLight:  '#EEF4FF',
  accent:      '#0D0E47',
  accentLight: '#E8E9F8',
  ink:         '#151616',
  muted:       '#676A7B',
  wire:        '#D5D8E8',
  surface:     '#F2F5F7',
  pit:         '#0D0E47',
  leaf:        '#7ABDFE',
} as const

export type ColorKey = keyof typeof colors
