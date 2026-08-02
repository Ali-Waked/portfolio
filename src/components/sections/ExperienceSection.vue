<template>
  <section id="experience" class="relative py-16 md:py-24 overflow-hidden">
    <div class="section-container">
      <div v-reveal="'fade-up'" class="mb-16 md:mb-20">
        <p class="text-xs font-mono text-primary-400 tracking-[0.3em] uppercase mb-4">{{ t('experience.kicker') }}</p>
        <h2 class="section-title">
          {{ t('experience.title1') }} <span class="gradient-text">{{ t('experience.title2') }}</span>
        </h2>
        <div class="w-16 h-[2px] bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mt-4" />
      </div>

      <div class="relative">
        <!-- Timeline line -->
        <div
          class="absolute top-0 bottom-0 start-0 md:start-1/2 w-[1px] bg-gradient-to-b from-primary-500/40 via-accent-500/20 to-transparent"
        />

        <div class="space-y-16 md:space-y-24">
          <div
            v-for="(exp, i) in experience"
            :key="exp.id"
            v-reveal="{ variant: i % 2 === 0 ? 'fade-left' : 'fade-right', delay: i * 90 }"
            class="relative"
            :class="timelineSideClasses(i)"
          >
            <!-- Timeline dot -->
            <div
              class="absolute top-0 start-0 md:start-1/2 md:-ms-2 w-4 h-4 rounded-full glass border-2 border-primary-500/50 z-10"
            >
              <div class="w-2 h-2 m-auto mt-[2px] rounded-full bg-primary-500" />
            </div>

            <!-- Card -->
            <div
              class="group glass rounded-2xl p-6 md:p-8 ms-8 md:ms-0 transition-all duration-500 hover:-translate-y-1 hover:border-primary-500/30 hover:shadow-[0_20px_50px_-15px_rgba(99,102,241,0.35)]"
            >
              <div class="flex flex-wrap items-center gap-3 mb-4">
                <span
                  class="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center shrink-0 border border-primary-500/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                >
                  <svg
                    class="w-5 h-5 text-primary-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path v-for="d in iconPaths(exp.icon)" :key="d" :d="d" />
                  </svg>
                </span>
                <h3 class="text-lg font-semibold text-dark-text font-display flex-1 min-w-0">{{ exp.role }}</h3>
                <span class="text-[10px] font-mono text-primary-400/60 px-2 py-1 rounded-full glass shrink-0">{{ exp.period }}</span>
              </div>
              <p class="text-sm text-dark-muted leading-relaxed mb-4">{{ exp.description }}</p>

              <ul v-if="exp.achievements && exp.achievements.length" class="space-y-1.5 mb-5">
                <li
                  v-for="(achievement, j) in exp.achievements"
                  :key="j"
                  class="flex items-start gap-2 text-xs text-dark-muted"
                >
                  <svg class="w-3.5 h-3.5 mt-0.5 text-primary-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{{ achievement }}</span>
                </li>
              </ul>

              <div
                v-if="exp.technologies && exp.technologies.length"
                class="flex flex-wrap gap-2 justify-start"
              >
                <span
                  v-for="tech in exp.technologies"
                  :key="tech"
                  class="px-2.5 py-1 text-[10px] font-mono rounded-full glass text-dark-muted hover:text-dark-text hover:border-primary-500/30 transition-all duration-300"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useExperience } from '@/composables/useLocalizedData'

const { t } = useI18n()
const experience = useExperience()

const icons = {
  flag: ['M4 21V5a2 2 0 0 1 2-2h9l-1 4 1 4H6'],
  code: ['M16 18l6-6-6-6', 'M8 6l-6 6 6 6'],
  box: ['M21 8l-9-5-9 5v8l9 5 9-5V8z', 'M3 8l9 5 9-5', 'M12 13v9'],
  trending: ['M23 6l-9.5 9.5-5-5L1 18', 'M17 6h6v6'],
}

function iconPaths(name) {
  return icons[name] || icons.code
}

function timelineSideClasses(i) {
  const even = i % 2 === 0
  return even ? 'md:pr-[calc(50%+2rem)]' : 'md:pl-[calc(50%+2rem)]'
}
</script>
