<template>
  <section id="projects" class="relative py-16 md:py-24 overflow-hidden">
    <div class="section-container">
      <div v-reveal="'fade-up'" class="mb-16 md:mb-20">
        <p class="text-xs font-mono text-primary-400 tracking-[0.3em] uppercase mb-4">{{ t('projectsSection.kicker') }}</p>
        <h2 class="section-title">
          {{ t('projectsSection.title1') }} <span class="gradient-text">{{ t('projectsSection.title2') }}</span>
        </h2>
        <p class="section-subtitle">
          {{ t('projectsSection.subtitle') }}
        </p>
        <div class="w-16 h-[2px] bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mt-4" />
      </div>

      <div class="grid md:grid-cols-2 gap-6 md:gap-8">
        <div
          v-for="(project, i) in featuredProjects"
          :key="project.id"
          v-reveal="{ variant: 'zoom-in', delay: i * 120 }"
        >
          <ProjectCard :project="project" />
        </div>
      </div>

      <!-- View all projects -->
      <div v-reveal="{ variant: 'fade-up', delay: 200 }" class="mt-14 md:mt-20 text-center">
        <RouterLink
          to="/projects"
          class="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-8 py-4 glass font-medium text-sm text-dark-text transition-all duration-500 hover:-translate-y-1 hover:border-primary-500/40 hover:shadow-[0_20px_50px_-15px_rgba(99,102,241,0.45)]"
        >
          <span class="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span class="relative">{{ t('projectsSection.viewAll') }}</span>
          <svg class="relative w-4 h-4 text-primary-400 flip-rtl transition-transform duration-300" :class="isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import { useProjects } from '@/composables/useLocalizedData'
import { useIsRtl } from '@/composables/useLocale'

const { t } = useI18n()
const isRtl = useIsRtl()
const projects = useProjects()

const featuredProjects = computed(() => projects.value.filter(p => p.featured).slice(0, 4))
</script>
