<template>
  <section id="skills" class="relative isolate py-16 md:py-24 overflow-hidden">
    <div class="section-container">
      <div v-reveal="'fade-up'" class="mb-12 md:mb-16">
        <div class="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p class="text-xs font-mono text-primary-400 tracking-[0.3em] uppercase mb-4">{{ t('skills.kicker') }}</p>
            <h2 class="section-title">
              {{ t('skills.title1') }}<br>
              <span class="gradient-text">{{ t('skills.title2') }}</span>
            </h2>
            <div class="w-16 h-[2px] bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mt-4" />
          </div>
          <p class="section-subtitle max-w-md text-sm md:text-base">
            {{ t('skills.subtitle') }}
          </p>
        </div>
      </div>

      <!-- Tech stack -->
      <div class="mb-6 md:mb-10">
        <div class="tech-grid">
          <div v-for="(group, gi) in groups" :key="group.key" class="tech-group">
            <div class="tech-group-head mb-5">
              <span class="tech-group-label">{{ group.label }}</span>
              <span class="tech-group-line" />
              <span class="tech-group-count">{{ t('skills.techCount', { count: group.items.length }) }}</span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 justify-items-center gap-3 md:gap-4">
              <div
                v-for="(tech, i) in group.items"
                :key="tech.name"
                v-reveal="{ variant: 'fade-up', delay: (groupOffsets[gi] + i) * 40 }"
                class="tech-card"
                tabindex="0"
                :style="{ '--tech-color': tech.color }"
              >
                <span class="tech-icon">
                  <svg v-if="tech.icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path :d="tech.icon" />
                  </svg>
                  <span v-else class="tech-icon-fallback">{{ tech.name.charAt(0) }}</span>
                </span>
                <span class="tech-name">{{ tech.name }}</span>
                <span class="tech-tooltip" role="tooltip">
                  {{ tech.name }}
                  <span class="tech-tooltip-level">{{ levelFor(tech.rawName) }}%</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Responsive Swiper Carousel -->
      <div v-reveal="{ variant: 'fade-up', delay: 100 }" class="relative skills-stage">
        <Swiper
          :modules="[Navigation, Autoplay]"
          class="skills-swiper"
          :slides-per-view="1"
          :slides-per-group="1"
          :space-between="16"
          :loop="true"
          :speed="600"
          :grab-cursor="true"
          :autoplay="{
            delay: 5500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            waitForTransition: false,
          }"
          :navigation="{ nextEl: '.skills-next', prevEl: '.skills-prev' }"
          :breakpoints="{
            640: { slidesPerView: 1.2, slidesPerGroup: 1, spaceBetween: 20 },
            1024: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 24 },
            1440: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 32 },
          }"
          @swiper="onSwiper"
          @init="setActive"
          @activeIndexChange="onActiveIndex"
          @slideChangeTransitionEnd="setActive"
          @breakpoint="setActive"
        >
          <SwiperSlide v-for="(slide, index) in slides" :key="slide.name">
            <article
              class="skill-card"
              :class="{ 'is-cta': slide.cta }"
              :style="slide.meta ? { '--cat-color': slide.meta.color } : null"
            >
              <span class="skill-card-accent" />
              <span class="skill-card-ghost" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>

              <template v-if="!slide.cta">
                <header class="skill-card-header">
                  <span class="skill-card-icon">
                    <svg
                      v-if="slide.meta.icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <path v-for="d in slide.meta.icon" :key="d" :d="d" />
                    </svg>
                    <span v-else class="skill-card-icon-fallback">{{ slide.name.charAt(0) }}</span>
                  </span>
                  <div class="min-w-0 flex-1">
                    <p class="skill-card-index">{{ String(index + 1).padStart(2, '0') }} / {{ String(slides.length).padStart(2, '0') }}</p>
                    <h3 class="skill-card-title">{{ slide.name }}</h3>
                  </div>
                  <span class="skill-card-count">{{ t('skills.skillCount', { count: slide.skills.length }) }}</span>
                </header>

                <p v-if="slide.description" class="skill-card-desc">{{ slide.description }}</p>

                <div class="skill-list" :class="{ 'skill-list--cols': slide.twoCols }">
                  <div
                    v-for="(skill, si) in slide.skills"
                    :key="skill.name"
                    class="skill-row"
                    :style="{ '--row-delay': `${si * 60}ms` }"
                  >
                    <div class="skill-row-top">
                      <span class="skill-name">{{ skill.name }}</span>
                      <span class="skill-percent">{{ skill.level }}%</span>
                    </div>
                    <div class="skill-bar">
                      <div class="skill-bar-fill" :style="{ '--skill-level': `${skill.level}%` }" />
                    </div>
                  </div>
                </div>
              </template>

              <div v-else class="skill-card-cta">
                <p class="skill-card-index">{{ String(index + 1).padStart(2, '0') }} / {{ String(slides.length).padStart(2, '0') }}</p>
                <h3 class="skill-card-title">{{ t('skills.ctaTitle') }}</h3>
                <p class="skill-card-desc">
                  {{ t('skills.ctaDescription') }}
                </p>
                <a href="#contact" class="skill-card-cta-btn">
                  {{ t('skills.ctaButton') }}
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </article>
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- Controls -->
      <div v-reveal="{ variant: 'fade-up', delay: 150 }" class="skills-controls">
        <div class="skills-nav-row">
          <button class="skills-nav skills-prev" type="button" :aria-label="t('skills.prevPage')">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <span class="skills-counter" aria-hidden="true">
            <span class="skills-counter-current">{{ String(currentPage).padStart(2, '0') }}</span>
            <span class="skills-counter-total">/ {{ String(totalPages).padStart(2, '0') }}</span>
          </span>
          <button class="skills-nav skills-next" type="button" :aria-label="t('skills.nextPage')">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'

import { useI18n } from 'vue-i18n'
import { useSkillCategories } from '@/composables/useLocalizedData'
import { useLocalizedTech } from '@/composables/useLocale'
import { skillCategories as rawSkillCategories, technologies } from '@/data/skills'

const { t } = useI18n()
const localizeTech = useLocalizedTech()
const skillCategories = useSkillCategories()

const groupOrder = [
  { key: 'languages' },
  { key: 'frontend' },
  { key: 'backend' },
  { key: 'database' },
  { key: 'tools' },
]

const groups = computed(() =>
  groupOrder
    .map(group => ({
      ...group,
      label: t(`skills.groups.${group.key}`),
      items: technologies
        .filter(tech => tech.group === group.key)
        .map(tech => ({ ...tech, rawName: tech.name, name: localizeTech(tech.name) })),
    }))
    .filter(group => group.items.length > 0)
)

// Cumulative number of tech cards before each group, used to stagger
// individual cards one-by-one across all groups (not per group).
const groupOffsets = computed(() => {
  const offsets = []
  let total = 0
  for (const group of groups.value) {
    offsets.push(total)
    total += group.items.length
  }
  return offsets
})

const categoryLevels = {}
for (const cat of rawSkillCategories) {
  for (const skill of cat.skills) categoryLevels[skill.name] = skill.level
}

const levelMap = {
  'HTML5': 92,
  'CSS3': 92,
  'AI Integration': 85,
}

function levelFor(name) {
  return categoryLevels[name] || levelMap[name] || 80
}

const strokeIcons = {
  backend: [
    'M4 3h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z',
    'M4 13h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z',
    'M7 6.5h.01',
    'M7 16.5h.01',
  ],
  frontend: [
    'M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5z',
    'M8 21h8',
    'M12 17v4',
  ],
  devops: [
    'M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18l3 3 5.3-5.3a5 5 0 0 0 6.4-6.4l-3.2 3.2-2.5-.5-.5-2.5 3.2-3.2z',
  ],
  ai: [
    'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z',
    'M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z',
  ],
  payments: [
    'M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z',
    'M3 10h18',
    'M6.5 15h4',
  ],
}

const categoryMeta = {
  backend: { color: '#FF2D20', icon: strokeIcons.backend },
  frontend: { color: '#4FC08D', icon: strokeIcons.frontend },
  devops: { color: '#2496ED', icon: strokeIcons.devops },
  ai: { color: '#a855f7', icon: strokeIcons.ai },
  payments: { color: '#635BFF', icon: strokeIcons.payments },
}

const slides = computed(() => [
  ...skillCategories.value.map(cat => ({
    ...cat,
    meta: categoryMeta[cat.key] || { color: '#6366f1', icon: null },
    twoCols: cat.skills.length > 6,
  })),
  { name: 'cta', cta: true },
])

const activeIndex = ref(0)
const currentPage = ref(1)
const totalPages = ref(slides.value.length)
let swiperInstance = null

function updateState(sw) {
  if (!sw) return
  const group = Math.max(1, Math.floor(sw.params.slidesPerGroup || 1))
  activeIndex.value = sw.realIndex
  currentPage.value = Math.floor(sw.realIndex / group) + 1
  totalPages.value = Math.max(1, Math.ceil(slides.value.length / group))
}

function setActive(sw) {
  if (!sw) return
  updateState(sw)

  const visible = new Set(sw.visibleSlides || [])
  const perView = Math.max(1, Math.ceil(sw.params.slidesPerView || 1))

  sw.slides.forEach(slide => {
    let isVisible = visible.has(slide)
    if (!isVisible && visible.size === 0) {
      const i = sw.slides.indexOf(slide)
      isVisible = i >= sw.activeIndex && i < sw.activeIndex + perView
    }
    slide.querySelector('.skill-card')?.classList.toggle('is-active', isVisible)
  })
}

function onActiveIndex(sw) {
  updateState(sw)
}

function onSwiper(sw) {
  swiperInstance = sw
  requestAnimationFrame(() => setActive(sw))
}
</script>
