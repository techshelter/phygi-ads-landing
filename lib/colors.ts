export const colors = {
  brand:       '#1D9E75',
  brandDark:   '#0F6E56',
  brandLight:  '#E1F5EE',
  accent:      '#534AB7',
  accentLight: '#EEEDFE',
  ink:         '#2C2C2A',
  muted:       '#5F5E5A',
  wire:        '#D3D1C7',
  surface:     '#F9F9F7',
  pit:         '#181818',
  leaf:        '#5DCAA5',
} as const

export type ColorKey = keyof typeof colors
