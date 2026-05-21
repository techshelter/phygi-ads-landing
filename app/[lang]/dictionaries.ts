// Mark as server-only to prevent client bundles from importing dictionaries
// Install `server-only` package to enforce: import 'server-only'

import type fr from '../../dictionaries/fr.json'

const dictionaries = {
  fr: () => import('../../dictionaries/fr.json').then((m) => m.default),
  en: () => import('../../dictionaries/en.json').then((m) => m.default),
}

export type Locale = keyof typeof dictionaries
export type Dictionary = typeof fr

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]() as Promise<Dictionary>
