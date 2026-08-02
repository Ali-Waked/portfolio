<template>
  <section class="relative py-16 md:py-24 overflow-hidden">
    <div class="section-container">
      <div v-reveal="'fade-up'" class="mb-16 md:mb-20">
        <p class="text-xs font-mono text-primary-400 tracking-[0.3em] uppercase mb-4">{{ t('certificates.kicker') }}</p>
        <h2 class="section-title">
          <span class="gradient-text">{{ t('certificates.title1') }}</span> {{ t('certificates.title2') }}
        </h2>
        <div class="w-16 h-[2px] bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mt-4" />
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div
          v-for="(cert, i) in certificates"
          :key="cert.id"
          v-reveal="{ variant: 'fade-up', delay: i * 90 }"
          class="glass glass-hover rounded-2xl p-6 transition-all duration-500 cursor-default group"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
              <svg class="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <span class="text-[10px] font-mono text-dark-muted/60 px-2 py-1 rounded-full glass">{{ cert.date }}</span>
          </div>
          <h3 class="text-base font-semibold text-dark-text mb-1 font-display">{{ cert.title }}</h3>
          <p class="text-xs text-primary-400 mb-2">{{ cert.issuer }}</p>
          <p class="text-xs text-dark-muted/80 leading-relaxed">{{ cert.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useCertificates } from '@/composables/useLocalizedData'

const { t } = useI18n()
const certificates = useCertificates()
</script>
