<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale, SUPPORTED_LOCALES } from '@/i18n'

const props = defineProps({
  variant: {
    type: String,
    default: 'desktop',
  },
})

const { locale } = useI18n()

const isOpen = ref(false)
const currentLocale = ref(locale.value)

const displayNames = {
  en: 'English',
  ar: 'العربية',
}

watch(locale, (val) => {
  currentLocale.value = val
  isOpen.value = false
})

const otherLocales = () => SUPPORTED_LOCALES.filter((code) => code !== currentLocale.value)

const currentShort = () => currentLocale.value === 'en' ? 'EN' : 'AR'

async function switchLocale(code) {
  if (code === currentLocale.value) {
    isOpen.value = false
    return
  }
  await setLocale(code)
}

function onKeydown(event) {
  if (event.key === 'Escape') {
    isOpen.value = false
  }
}
</script>

<template>
  <div
    class="lang-switcher relative inline-flex"
    :class="{ 'lang-switcher--open': isOpen }"
    @keydown="onKeydown"
  >
    <button
      type="button"
      class="lang-switcher__trigger"
      :class="`lang-switcher__trigger--${variant}`"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :aria-label="currentLocale === 'en' ? 'Change language' : 'تغيير اللغة'"
      @click="isOpen = !isOpen"
    >
      <span class="lang-switcher__label">{{ displayNames[currentLocale] }}</span>
      <svg
        class="lang-switcher__caret"
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1l4 4 4-4"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <transition name="lang-dropdown">
      <ul
        v-if="isOpen"
        class="lang-switcher__menu"
        role="listbox"
        :aria-label="currentLocale === 'en' ? 'Select language' : 'اختر اللغة'"
      >
        <li v-for="code in otherLocales()" :key="code" role="option" :aria-selected="false">
          <button
            type="button"
            class="lang-switcher__option"
            :class="{ 'lang-switcher__option--current': code === currentLocale }"
            @click="switchLocale(code)"
          >
            <span class="lang-switcher__short">{{ code === 'en' ? 'EN' : 'AR' }}</span>
            {{ displayNames[code] }}
          </button>
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped>
.lang-switcher {
  --lang-height: 2.25rem;
}

.lang-switcher__trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  height: var(--lang-height);
  padding: 0 0.875rem;
  border-radius: 9999px;
  background: var(--color-glass-bg);
  border: 1px solid var(--color-border);
  color: var(--color-muted);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease,
    background 0.3s ease;
  white-space: nowrap;
}

.lang-switcher__trigger:hover {
  color: var(--color-text);
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 0 16px -4px rgba(99, 102, 241, 0.45);
}

.lang-switcher__trigger--mobile {
  height: 3rem;
  width: 100%;
  justify-content: center;
  font-size: 0.95rem;
}

.lang-switcher__caret {
  transition: transform 0.3s ease;
}

.lang-switcher--open .lang-switcher__caret {
  transform: rotate(180deg);
}

.lang-switcher__menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  inset-inline-start: 0;
  min-width: 100%;
  padding: 0.375rem;
  border-radius: 0.875rem;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  box-shadow: 0 18px 40px -12px rgba(0, 0, 0, 0.6);
  z-index: 50;
}

.lang-switcher__trigger--mobile + .lang-switcher__menu {
  inset-inline-start: 50%;
  transform: translateX(-50%);
}

html[dir='rtl'] .lang-switcher__trigger--mobile + .lang-switcher__menu {
  transform: translateX(50%);
}

.lang-switcher__option {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  padding: 0.625rem 0.75rem;
  border-radius: 0.625rem;
  background: transparent;
  border: none;
  color: var(--color-text);
  font-size: 0.85rem;
  font-weight: 500;
  text-align: start;
  cursor: pointer;
  transition: background 0.2s ease;
  white-space: nowrap;
}

.lang-switcher__option:hover {
  background: var(--color-glass-hover);
}

.lang-switcher__short {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.75rem;
  padding: 0.125rem 0.375rem;
  border-radius: 0.375rem;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15));
  border: 1px solid rgba(99, 102, 241, 0.3);
  color: var(--color-text);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  font-weight: 700;
}

.lang-dropdown-enter-active,
.lang-dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.lang-dropdown-enter-from,
.lang-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-0.375rem);
}
</style>
