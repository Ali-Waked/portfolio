<template>
  <article
    ref="cardRef"
    class="group glass rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer"
    @mouseenter="onCardEnter"
    @mouseleave="onCardLeave"
    @mousemove="onCardMove"
    @click="openProject"
    :title="t('projectsSection.viewDetails')"
  >
    <!-- Project image -->
    <div class="relative aspect-[16/10] overflow-hidden bg-dark-card">
      <img
        v-if="project.image"
        :src="project.image"
        :alt="project.title"
        class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div v-else class="absolute inset-0" :style="placeholderStyle">
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-7xl md:text-8xl font-bold font-display select-none" :style="{ color: project.accent + '2b' }">
            {{ project.title.charAt(0) }}
          </span>
        </div>
        <div
          class="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-125"
          :style="{ background: project.accent + '1f' }"
        />
        <div
          class="absolute -bottom-20 -left-20 w-56 h-56 rounded-full blur-3xl"
          :style="{ background: project.accent + '14' }"
        />
      </div>

      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/10 to-transparent" />
      <div class="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/10 transition-colors duration-500" />

      <!-- Status badge -->
      <span
        class="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full glass text-[10px] font-mono uppercase tracking-wider text-dark-muted"
      >
        <span
          class="w-1.5 h-1.5 rounded-full"
          :class="project.status === 'Completed' ? 'bg-emerald-400' : 'bg-amber-400'"
        />
        {{ project.statusLabel }}
      </span>

      <!-- Category pill -->
      <span
        class="absolute bottom-4 left-4 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider"
        :style="{ color: project.accent, backgroundColor: project.accent + '1a', border: '1px solid ' + project.accent + '40' }"
      >
        {{ project.category }}
      </span>

      <!-- View details affordance -->
      <span
        class="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-[10px] font-mono uppercase tracking-wider text-dark-muted opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
      >
        {{ t('projectsSection.viewDetails') }}
        <svg class="w-3 h-3 text-primary-400 flip-rtl" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </div>

    <!-- Content -->
    <div class="p-6 md:p-7">
      <div
        v-if="project.metrics && project.metrics.length"
        class="text-[10px] font-mono text-dark-muted/70 mb-3 tracking-wide"
      >
        {{ project.metrics.join(' · ') }}
      </div>

      <h3 class="text-xl md:text-2xl font-semibold font-display text-dark-text mb-3">{{ project.title }}</h3>

      <p class="text-sm text-dark-muted leading-relaxed mb-5 line-clamp-3">{{ project.description }}</p>

      <!-- Technology badges -->
      <div class="flex flex-wrap gap-2 mb-5">
        <span
          v-for="tech in project.technologies"
          :key="tech"
          class="px-2.5 py-1 text-[10px] font-mono rounded-md glass text-dark-muted transition-all duration-300 hover:text-dark-text hover:border-primary-500/30 hover:-translate-y-0.5"
        >
          {{ tech }}
        </span>
      </div>

      <!-- Highlights -->
      <div v-if="project.highlights && project.highlights.length" class="flex flex-wrap gap-2 mb-6">
        <span
          v-for="h in project.highlights"
          :key="h"
          class="flex items-center gap-1.5 text-[11px] rounded-full px-2.5 py-1 text-dark-muted glass"
        >
          <svg class="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
          {{ h }}
        </span>
      </div>

      <!-- Actions -->
      <div v-if="hasLinks" class="flex items-center gap-3 pt-5 border-t border-dark-border/50">
        <a
          v-if="project.github"
          :href="project.github"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg glass text-dark-muted hover:text-dark-text hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-0.5"
          @click.stop
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          {{ t(projectRepoLabel(project)) }}
        </a>
        <a
          v-if="project.githubFrontend"
          :href="project.githubFrontend"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg glass text-dark-muted hover:text-dark-text hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-0.5"
          @click.stop
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          {{ t('projectDetail.frontendRepo') }}
        </a>
        <a
          v-if="project.youtube"
          :href="project.youtube"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg glass text-dark-muted hover:text-dark-text hover:border-accent-500/30 transition-all duration-300 hover:-translate-y-0.5"
          @click.stop
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ t('projectDetail.videoDemo') }}
        </a>
        <a
          v-if="project.caseStudy"
          :href="project.caseStudy"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg glass text-dark-muted hover:text-dark-text hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-0.5"
          @click.stop
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {{ t('projectDetail.caseStudy') }}
        </a>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { projectPath, projectRepoLabel } from '@/composables/useLocalizedData'

const { t } = useI18n()

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const cardRef = ref(null)
const hasLinks = computed(() => props.project.github || props.project.githubFrontend || props.project.youtube || props.project.caseStudy)

function openProject() {
  router.push(projectPath(props.project))
}

const placeholderStyle = computed(() => ({
  background: `radial-gradient(80% 80% at 85% 0%, ${props.project.accent}2e, transparent 55%), radial-gradient(90% 90% at 0% 100%, ${props.project.accent}1c, transparent 60%), linear-gradient(135deg, ${props.project.accent}0d, transparent 45%)`,
}))

let gsap = null

onMounted(async () => {
  const module = await import('gsap')
  gsap = module.default
})

function onCardEnter() {
  if (!gsap || !cardRef.value) return
  gsap.to(cardRef.value, { scale: 1.02, y: -6, duration: 0.4, ease: 'power2.out' })
}

function onCardLeave() {
  if (!gsap || !cardRef.value) return
  gsap.to(cardRef.value, { scale: 1, y: 0, rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' })
}

function onCardMove(e) {
  if (!gsap || !cardRef.value) return
  const rect = cardRef.value.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  gsap.to(cardRef.value, {
    rotateX: -y * 6,
    rotateY: x * 6,
    duration: 0.3,
    ease: 'power2.out',
  })
}
</script>
