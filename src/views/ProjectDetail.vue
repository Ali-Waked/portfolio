<template>
  <section ref="sectionRef" class="relative min-h-screen pt-24 md:pt-32 pb-24 md:pb-32 overflow-hidden">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <template v-if="project">
        <!-- Top bar -->
        <div ref="topRef" class="flex items-center justify-between mb-10 md:mb-14">
          <RouterLink
            to="/projects"
            class="inline-flex items-center gap-2 text-sm text-dark-muted hover:text-primary-400 transition-colors duration-300 group"
          >
            <svg class="w-4 h-4 flip-rtl transition-transform duration-300" :class="isRtl ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            {{ t('projectDetail.back') }}
          </RouterLink>

          <div class="flex items-center gap-2">
            <RouterLink
              v-if="prevProject"
              :to="projectPath(prevProject)"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-xs text-dark-muted hover:text-dark-text hover:border-primary-500/30 transition-all duration-300"
            >
              <svg class="w-3.5 h-3.5 flip-rtl" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              {{ t('projectDetail.previous') }}
            </RouterLink>
            <RouterLink
              v-if="nextProject"
              :to="projectPath(nextProject)"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-xs text-dark-muted hover:text-dark-text hover:border-primary-500/30 transition-all duration-300"
            >
              {{ t('projectDetail.next') }}
              <svg class="w-3.5 h-3.5 flip-rtl" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </RouterLink>
          </div>
        </div>

        <!-- Header -->
        <header ref="headerRef" class="mb-10 md:mb-12">
          <div class="flex flex-wrap items-center gap-3 mb-4">
            <span
              class="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider"
              :style="{ color: project.accent, backgroundColor: project.accent + '1a', border: '1px solid ' + project.accent + '40' }"
            >
              {{ project.category }}
            </span>
              <span class="flex items-center gap-1.5 px-3 py-1 rounded-full glass text-[10px] font-mono uppercase tracking-wider text-dark-muted">
                <span
                  class="w-1.5 h-1.5 rounded-full"
                  :class="project.status === 'Completed' ? 'bg-emerald-400' : 'bg-amber-400'"
                />
                {{ project.statusLabel }}
              </span>
          </div>
          <h1 class="section-title mb-3">{{ project.title }}</h1>
          <div
            v-if="project.metrics && project.metrics.length"
            class="text-xs font-mono text-dark-muted/70 tracking-wide mb-4"
          >
            {{ project.metrics.join(' · ') }}
          </div>
          <p class="section-subtitle">{{ project.description }}</p>
          <div class="w-16 h-[2px] bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mt-4" />
        </header>

        <!-- Hero image -->
        <div ref="imageRef" class="relative aspect-[16/8] rounded-3xl overflow-hidden mb-12 md:mb-16 glass">
          <img
            v-if="project.image"
            :src="project.image"
            :alt="project.title"
            class="w-full h-full object-cover"
          />
          <div v-else class="absolute inset-0" :style="placeholderStyle">
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-[9rem] md:text-[13rem] font-bold font-display select-none" :style="{ color: project.accent + '2b' }">
                {{ project.title.charAt(0) }}
              </span>
            </div>
            <div class="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl" :style="{ background: project.accent + '1f' }" />
            <div class="absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-3xl" :style="{ background: project.accent + '14' }" />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-80" />
        </div>

        <!-- Main content -->
        <div ref="contentRef" class="grid lg:grid-cols-5 gap-6 md:gap-8 items-start">
          <!-- Overview -->
          <div class="lg:col-span-3 space-y-4">
            <h2 class="text-sm font-mono text-primary-400 tracking-[0.3em] uppercase mb-4">{{ t('projectDetail.overview') }}</h2>
            <div class="space-y-4">
              <p
                v-for="(paragraph, i) in overviewParagraphs"
                :key="i"
                class="text-[15px] text-dark-muted leading-[1.9]"
              >
                {{ paragraph }}
              </p>
            </div>
          </div>

          <!-- Sidebar -->
          <aside class="lg:col-span-2 space-y-4 md:sticky md:top-24">
            <!-- Technologies -->
            <div class="glass rounded-2xl p-6">
              <h3 class="text-sm font-semibold text-dark-text mb-4">{{ t('projectDetail.technologies') }}</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-2.5 py-1 text-[10px] font-mono rounded-md glass text-dark-muted transition-all duration-300 hover:text-dark-text hover:border-primary-500/30"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Highlights -->
            <div class="glass rounded-2xl p-6">
              <h3 class="text-sm font-semibold text-dark-text mb-4">{{ t('projectDetail.highlights') }}</h3>
              <div class="space-y-2.5">
                <div
                  v-for="h in project.highlights"
                  :key="h"
                  class="flex items-start gap-2.5 text-sm text-dark-muted"
                >
                  <svg class="w-4 h-4 mt-0.5 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ h }}
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div v-if="hasLinks" class="glass rounded-2xl p-6">
              <h3 class="text-sm font-semibold text-dark-text mb-4">{{ t('projectDetail.links') }}</h3>
              <div class="space-y-2.5">
                <a
                  v-if="project.github"
                  :href="project.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2.5 px-4 py-3 text-sm font-medium rounded-xl glass text-dark-muted hover:text-dark-text hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  {{ t(projectRepoLabel(project)) }}
                </a>
                <a
                  v-if="project.githubFrontend"
                  :href="project.githubFrontend"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2.5 px-4 py-3 text-sm font-medium rounded-xl glass text-dark-muted hover:text-dark-text hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  {{ t('projectDetail.frontendRepo') }}
                </a>
                <a
                  v-if="project.youtube"
                  :href="project.youtube"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2.5 px-4 py-3 text-sm font-medium rounded-xl glass text-dark-muted hover:text-dark-text hover:border-accent-500/30 transition-all duration-300 hover:-translate-y-0.5"
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
                  class="flex items-center gap-2.5 px-4 py-3 text-sm font-medium rounded-xl glass text-dark-muted hover:text-dark-text hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {{ t('projectDetail.caseStudy') }}
                </a>
              </div>
            </div>
          </aside>
        </div>

        <!-- Key features -->
        <div ref="featuresRef" v-if="project.features && project.features.length" class="mt-16 md:mt-20">
          <h2 class="text-sm font-mono text-primary-400 tracking-[0.3em] uppercase mb-4">{{ t('projectDetail.keyFeatures') }}</h2>
          <div class="glass rounded-2xl p-6 md:p-8">
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
              <div
                v-for="(feature, i) in project.features"
                :key="i"
                class="flex items-start gap-2.5 text-sm text-dark-muted"
              >
                <svg class="w-4 h-4 mt-0.5 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
                {{ feature }}
              </div>
            </div>
          </div>
        </div>

        <!-- Prev / Next footer -->
        <div ref="navRef" class="mt-16 md:mt-20 grid sm:grid-cols-2 gap-4">
          <RouterLink
            v-if="prevProject"
            :to="`/projects/${prevProject.id}`"
            class="group glass rounded-2xl p-6 transition-all duration-300 hover:border-primary-500/30 hover:-translate-y-1"
          >
            <span class="flex items-center gap-2 text-xs font-mono text-dark-muted/60 uppercase tracking-wider mb-2">
              <svg class="w-3.5 h-3.5 flip-rtl transition-transform duration-300" :class="isRtl ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              {{ t('projectDetail.prevProject') }}
            </span>
            <span class="block text-lg font-semibold font-display text-dark-text">{{ prevProject.title }}</span>
          </RouterLink>
          <RouterLink
            v-if="nextProject"
            :to="`/projects/${nextProject.id}`"
            class="group glass rounded-2xl p-6 transition-all duration-300 hover:border-primary-500/30 hover:-translate-y-1 text-end sm:ms-auto"
          >
            <span class="flex items-center justify-end gap-2 text-xs font-mono text-dark-muted/60 uppercase tracking-wider mb-2">
              {{ t('projectDetail.nextProject') }}
              <svg class="w-3.5 h-3.5 flip-rtl transition-transform duration-300" :class="isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <span class="block text-lg font-semibold font-display text-dark-text">{{ nextProject.title }}</span>
          </RouterLink>
        </div>
      </template>

      <template v-else>
        <div class="pt-16 text-center">
          <h1 class="section-title mb-4">{{ t('projectDetail.notFoundTitle1') }} <span class="gradient-text">{{ t('projectDetail.notFoundTitle2') }}</span></h1>
          <RouterLink
            to="/projects"
            class="inline-flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 transition-colors"
          >
            <svg class="w-4 h-4 flip-rtl" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            {{ t('projectDetail.backToAll') }}
          </RouterLink>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useProjects, projectPath, projectRepoLabel } from '@/composables/useLocalizedData'
import { useIsRtl } from '@/composables/useLocale'

const { t } = useI18n()
const isRtl = useIsRtl()
const route = useRoute()
const projects = useProjects()

const project = computed(() =>
  projects.value.find(p => (p.slug || String(p.id)).toLowerCase() === String(route.params.id).toLowerCase())
)

const overviewParagraphs = computed(() => {
  const overview = project.value?.overview
  if (Array.isArray(overview)) return overview.filter(Boolean)
  return (overview || '').split('\n\n').filter(Boolean)
})

const hasLinks = computed(() => project.value?.github || project.value?.githubFrontend || project.value?.youtube || project.value?.caseStudy)

const currentIndex = computed(() => projects.value.findIndex(p => p.id === project.value?.id))
const prevProject = computed(() => (currentIndex.value > 0 ? projects.value[currentIndex.value - 1] : null))
const nextProject = computed(() => (currentIndex.value >= 0 && currentIndex.value < projects.value.length - 1 ? projects.value[currentIndex.value + 1] : null))

const placeholderStyle = computed(() => ({
  background: `radial-gradient(80% 80% at 85% 0%, ${project.value.accent}2e, transparent 55%), radial-gradient(90% 90% at 0% 100%, ${project.value.accent}1c, transparent 60%), linear-gradient(135deg, ${project.value.accent}0d, transparent 45%)`,
}))

const sectionRef = ref(null)
const topRef = ref(null)
const headerRef = ref(null)
const imageRef = ref(null)
const contentRef = ref(null)
const featuresRef = ref(null)
const navRef = ref(null)

let gsap = null

onMounted(async () => {
  const module = await import('gsap')
  gsap = module.default
  animatePage()
})

function animatePage() {
  if (!gsap) return

  const tl = gsap.timeline()

  tl.fromTo(topRef.value, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' })
    .fromTo(headerRef.value, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')
    .fromTo(imageRef.value, { opacity: 0, y: 40, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' }, '-=0.3')
    .fromTo(contentRef.value, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
    .fromTo(featuresRef.value, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    .fromTo(navRef.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
}
</script>
