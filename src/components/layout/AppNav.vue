<template>
  <nav
    ref="navRef"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="scrolled ? 'glass border-b border-white/5 shadow-lg shadow-black/20' : 'bg-transparent'"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <AnimatedLogo />

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-1">
          <a
            v-for="link in navLinks"
            :key="link.id"
            :href="link.href"
            ref="linkRefs"
            class="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300"
            :class="activeSection === link.id ? 'text-primary-400' : 'text-dark-muted hover:text-dark-text'"
            @click.prevent="scrollTo(link.href)"
          >
            {{ t(link.key) }}
            <span
              v-if="activeSection === link.id"
              class="absolute inset-0 bg-primary-500/10 rounded-lg -z-10"
            />
          </a>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-3">
          <LanguageSwitcher class="hidden md:inline-flex" variant="desktop" />

          <button
            class="w-9 h-9 rounded-lg glass flex items-center justify-center text-dark-muted hover:text-dark-text hover:border-primary-500/30 transition-all duration-300"
            :title="t('nav.themeTooltip')"
            @click="toggleTheme"
          >
            <svg v-if="!isDark" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>

          <button
            class="md:hidden w-9 h-9 rounded-lg glass flex items-center justify-center text-dark-muted hover:text-dark-text transition-all duration-300"
            @click="mobileOpen = !mobileOpen"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 -translate-y-4"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="mobileOpen" class="md:hidden glass border-t border-white/5">
        <div class="px-4 py-4 space-y-1">
          <a
            v-for="link in navLinks"
            :key="link.id"
            :href="link.href"
            class="block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
            :class="activeSection === link.id ? 'text-primary-400 bg-primary-500/10' : 'text-dark-muted hover:text-dark-text hover:bg-white/5'"
            @click="mobileOpen = false; scrollTo(link.href)"
          >
            {{ t(link.key) }}
          </a>
          <div class="pt-3 pb-2">
            <LanguageSwitcher variant="mobile" />
          </div>
        </div>
      </div>
    </Transition>

    <!-- Scroll progress -->
    <div class="absolute bottom-0 left-0 right-0 h-[1px] bg-dark-border">
      <div
        ref="progressRef"
        class="h-full bg-gradient-to-r from-primary-500 via-accent-500 to-purple-500 transition-all duration-150"
        :style="{ width: `${scrollProgress}%` }"
      />
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import AnimatedLogo from '@/components/ui/AnimatedLogo.vue'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const navLinks = [
  { id: 'hero', key: 'nav.home', href: '#hero' },
  { id: 'about', key: 'nav.about', href: '#about' },
  { id: 'skills', key: 'nav.skills', href: '#skills' },
  { id: 'projects', key: 'nav.projects', href: '#projects' },
  { id: 'experience', key: 'nav.experience', href: '#experience' },
  { id: 'contact', key: 'nav.contact', href: '#contact' },
]

const navRef = ref(null)
const progressRef = ref(null)
const linkRefs = ref([])
const scrolled = ref(false)
const activeSection = ref('hero')
const scrollProgress = ref(0)
const mobileOpen = ref(false)
const isDark = ref(true)

const isHome = computed(() => route.path === '/')

watch(() => route.path, () => {
  mobileOpen.value = false
  updateActiveSection()
})

let gsap = null
let scrollHandler = null

onMounted(async () => {
  const module = await import('gsap')
  gsap = module.default

  const saved = localStorage.getItem('theme')
  if (saved === 'light') {
    isDark.value = false
    document.documentElement.classList.add('light')
  }

  updateActiveSection()

  scrollHandler = () => {
    updateScrollProgress()
    updateActiveSection()
  }

  window.addEventListener('scroll', scrollHandler, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandler)
})

function updateScrollProgress() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
  scrolled.value = scrollTop > 50
}

function updateActiveSection() {
  // On non-home pages highlight the matching route section instead of
  // using scroll-spy, because the homepage sections do not exist there.
  if (!isHome.value) {
    activeSection.value = route.path.startsWith('/projects') ? 'projects' : 'hero'
    return
  }

  const scrollPos = window.scrollY + 200

  for (const link of [...navLinks].reverse()) {
    const el = document.querySelector(link.href)
    if (el && el.offsetTop <= scrollPos) {
      activeSection.value = link.id
      break
    }
  }
}

function scrollTo(href) {
  const el = document.querySelector(href)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  } else if (route.path !== '/') {
    // The target section lives on the home page — navigate there and let
    // the router's scrollBehavior smooth-scroll to the hash.
    router.push({ path: '/', hash: href })
  }
}

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('light', !isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}
</script>
