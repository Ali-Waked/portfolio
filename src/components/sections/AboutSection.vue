<template>
  <section id="about" class="relative py-8 md:py-12 overflow-hidden">
    <div class="section-container">
      <!-- Section Header -->
      <div v-reveal="'fade-up'" class="mb-16 md:mb-20">
        <p class="text-xs font-mono text-primary-400 tracking-[0.3em] uppercase mb-4">{{ t('about.kicker') }}</p>
        <h2 class="section-title">
          {{ t('about.title1') }}<br>
          <span class="gradient-text">{{ t('about.title2') }}</span>
        </h2>
        <div class="w-16 h-[2px] bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mt-4" />
      </div>

      <div class="grid lg:grid-cols-2 gap-12 lg:gap-20">
        <!-- Bio -->
        <div v-reveal="{ variant: 'fade-left', delay: 80 }">
          <div class="space-y-4 text-dark-muted leading-relaxed">
            <p v-for="(paragraph, i) in bioParagraphs" :key="i" class="text-base md:text-lg">
              {{ paragraph }}
            </p>
          </div>

          <!-- Journey highlight -->
          <div v-reveal="{ variant: 'fade-left', delay: 160 }" class="mt-8 p-6 glass rounded-2xl border-primary-500/10">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-dark-text">{{ t('about.journeyHighlightTitle') }}</p>
                <p class="text-xs text-dark-muted mt-1">{{ t('about.journeyHighlightText') }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats & Timeline -->
        <div>
          <!-- Stats Grid -->
          <div v-reveal="{ variant: 'fade-right', delay: 100 }" class="grid grid-cols-2 gap-4 mb-12">
            <AnimatedCounter
              v-for="(stat, i) in stats"
              :key="i"
              :value="stat.value"
              :label="stat.label"
              :suffix="stat.suffix"
            />
          </div>

          <!-- Mini Timeline -->
          <div v-reveal="{ variant: 'fade-right', delay: 180 }" class="space-y-6">
            <h3 class="text-sm font-mono text-dark-muted tracking-wider uppercase">{{ t('about.journeyHeading') }}</h3>
            <div class="space-y-4">
              <div
                v-for="(item, i) in journey"
                :key="i"
                class="relative ps-6 border-s border-dark-border"
              >
                <div class="absolute start-[-5px] top-1 w-2 h-2 rounded-full bg-primary-500" />
                <p class="text-xs font-mono text-primary-400/60">{{ item.year }}</p>
                <p class="text-sm text-dark-text font-medium">{{ item.title }}</p>
                <p class="text-xs text-dark-muted">{{ item.company }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AnimatedCounter from '@/components/ui/AnimatedCounter.vue'
import { useLocalizedMessages } from '@/composables/useLocale'

const { t } = useI18n()
const messages = useLocalizedMessages()

const bioParagraphs = computed(() => messages.value.about?.bio ?? [])
const stats = computed(() => messages.value.about?.stats ?? [])
const journey = computed(() => messages.value.about?.journey ?? [])
</script>
