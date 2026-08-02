import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { i18n } from '@/i18n'

export function useIsRtl() {
  const { locale } = useI18n()
  return computed(() => locale.value === 'ar')
}

export function useLocalizedMessages() {
  const { locale } = useI18n()
  return computed(() => i18n.global.getLocaleMessage(locale.value) || {})
}

export function useLocalizedTech() {
  const { t, te } = useI18n()
  return (name) => (te(`tech.${name}`) ? t(`tech.${name}`) : name)
}
