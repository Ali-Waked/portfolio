import { createI18n } from 'vue-i18n'

export const SUPPORTED_LOCALES = ['en', 'ar']
export const DEFAULT_LOCALE = 'en'
export const STORAGE_KEY = 'locale'

export function getSavedLocale() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && SUPPORTED_LOCALES.includes(saved)) return saved
  } catch (e) {
    /* ignore */
  }
  return DEFAULT_LOCALE
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages: {},
})

const loaded = new Set()

export async function loadLocale(locale) {
  if (loaded.has(locale)) return
  const messages = await import(`../locales/${locale}.json`)
  i18n.global.setLocaleMessage(locale, messages.default)
  loaded.add(locale)
}

export function applyLocale(locale) {
  const html = document.documentElement
  html.lang = locale
  html.dir = locale === 'ar' ? 'rtl' : 'ltr'
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch (e) {
    /* ignore */
  }
}

export function updateDocumentMeta(locale) {
  const msg = i18n.global.getLocaleMessage(locale) || {}
  const meta = msg.meta || {}
  if (meta.title) document.title = meta.title

  const setMeta = (selector, attr, value) => {
    if (!value) return
    const el = document.querySelector(selector)
    if (el) el.setAttribute(attr, value)
  }

  setMeta('meta[name="description"]', 'content', meta.description)
  setMeta('meta[property="og:title"]', 'content', meta.title)
  setMeta('meta[property="og:description"]', 'content', meta.ogDescription || meta.description)
  setMeta('meta[property="og:locale"]', 'content', meta.ogLocale)
}

export async function setLocale(locale) {
  if (!SUPPORTED_LOCALES.includes(locale)) locale = DEFAULT_LOCALE
  await loadLocale(locale)
  i18n.global.locale.value = locale
  applyLocale(locale)
  updateDocumentMeta(locale)
}

export async function initI18n() {
  const saved = getSavedLocale()
  await loadLocale(saved)
  i18n.global.locale.value = saved
  applyLocale(saved)
  updateDocumentMeta(saved)
  return i18n
}
