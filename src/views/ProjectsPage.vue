<template>
  <section ref="sectionRef" class="relative min-h-screen pt-24 md:pt-32 pb-24 md:pb-32 overflow-hidden">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Top bar -->
      <div ref="topRef" class="mb-12 md:mb-16">
        <RouterLink
          to="/"
          class="inline-flex items-center gap-2 text-sm text-dark-muted hover:text-primary-400 transition-colors duration-300 group"
        >
          <svg class="w-4 h-4 flip-rtl transition-transform duration-300" :class="isRtl ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          {{ t('projectsPage.back') }}
        </RouterLink>
      </div>

      <!-- Header -->
      <div ref="headerRef" class="mb-14 md:mb-20">
        <p class="text-xs font-mono text-primary-400 tracking-[0.3em] uppercase mb-4">{{ t('projectsPage.kicker') }}</p>
        <h1 class="section-title">
          {{ t('projectsPage.title1') }} <span class="gradient-text">{{ t('projectsPage.title2') }}</span>
        </h1>
        <p class="section-subtitle">
          {{ t('projectsPage.subtitle') }}
        </p>
        <div class="w-16 h-[2px] bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mt-4" />
      </div>

      <!-- Projects grid -->
      <div ref="gridRef" class="grid md:grid-cols-2 gap-6 md:gap-8">
        <div
          v-for="(project, i) in projects"
          :key="project.id"
          :ref="el => { if (el) cardRefs[i] = el }"
        >
          <ProjectCard :project="project" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import { useProjects } from '@/composables/useLocalizedData'
import { useIsRtl } from '@/composables/useLocale'

const { t } = useI18n()
const isRtl = useIsRtl()
const projects = useProjects()

const sectionRef = ref(null)
const topRef = ref(null)
const headerRef = ref(null)
const gridRef = ref(null)
const cardRefs = ref({})

let gsap = null

onMounted(async () => {
  const module = await import('gsap')
  gsap = module.default
  animateSection()
})

function animateSection() {
  if (!gsap) return

  const tl = gsap.timeline()

  tl.fromTo(topRef.value, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' })
    .fromTo(headerRef.value, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')
    .fromTo(
      Object.values(cardRefs.value).filter(Boolean),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
      '-=0.3'
    )
}
</script>
