<template>
  <section class="relative min-h-screen pt-24 md:pt-32 pb-24 md:pb-32 overflow-hidden flex items-center">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div ref="contentRef" class="text-center">
        <p class="font-mono text-7xl md:text-9xl font-bold gradient-text tracking-tight mb-6">{{ t('notFound.code') }}</p>
        <h1 class="section-title mb-4">{{ t('notFound.title') }}</h1>
        <p class="section-subtitle max-w-xl mx-auto mb-10">{{ t('notFound.message') }}</p>
        <RouterLink
          to="/"
          class="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-8 py-4 glass font-medium text-sm text-dark-text transition-all duration-500 hover:-translate-y-1 hover:border-primary-500/40 hover:shadow-[0_20px_50px_-15px_rgba(99,102,241,0.45)]"
        >
          <svg class="w-4 h-4 flip-rtl transition-transform duration-300" :class="isRtl ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          {{ t('notFound.backHome') }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useIsRtl } from '@/composables/useLocale'

const { t } = useI18n()
const isRtl = useIsRtl()

const contentRef = ref(null)

onMounted(async () => {
  const module = await import('gsap')
  const gsap = module.default
  gsap.fromTo(contentRef.value, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
})
</script>
