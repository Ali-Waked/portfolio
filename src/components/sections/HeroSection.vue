<template>
  <section id="hero" ref="heroRef" class="relative min-h-screen flex items-center overflow-hidden">
    <!-- Three.js Starfield -->
    <canvas ref="threeCanvas" class="absolute inset-0 pointer-events-none" />

    <!-- Animated Gradient Blobs -->
    <div ref="blob1" class="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full opacity-10 blur-[100px] animate-morph" style="background: radial-gradient(circle at 30% 50%, #6366f1, transparent 70%)" />
    <div ref="blob2" class="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full opacity-10 blur-[80px] animate-morph" style="background: radial-gradient(circle at 70% 50%, #0ea5e9, transparent 70%); animation-delay: -3s" />
    <div ref="blob3" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-[120px]" style="background: radial-gradient(circle at center, #8b5cf6, transparent 70%)" />

    <!-- Subtle Grid -->
    <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px); background-size: 60px 60px" />

    <div class="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-12">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-8 lg:gap-16 min-h-[calc(100vh-8rem)] items-center">
          <!-- ===== LEFT COLUMN ===== -->
          <div class="space-y-6 md:space-y-8">
            <!-- Availability Badge -->
            <div ref="badgeRef">
              <div class="status-pill inline-flex items-center gap-3 rounded-full glass px-4 py-2.5 border border-emerald-400/20 shadow-[0_8px_30px_rgba(0,0,0,0.25),0_0_20px_rgba(16,185,129,0.06)] hover:border-emerald-400/40 hover:shadow-[0_10px_36px_rgba(0,0,0,0.3),0_0_28px_rgba(16,185,129,0.12)] transition-all duration-500 animate-float-soft">
                <span class="relative flex w-2 h-2">
                  <span class="absolute inset-0 rounded-full bg-emerald-400 animate-status-ping" />
                  <span class="relative rounded-full w-2 h-2 bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.7)]" />
                </span>
                <span class="text-[11px] font-mono tracking-[0.22em] uppercase text-dark-muted/80">
                  {{ t('hero.available') }} <span class="text-emerald-400 font-medium">{{ t('hero.opportunities') }}</span>
                </span>
              </div>
            </div>

            <!-- Headline -->
            <div ref="headlineRef" class="space-y-2">
              <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-display leading-[0.92] tracking-tight">
                <span ref="line1Ref" class="block">{{ t('hero.line1') }}</span>
                <span ref="line2Ref" class="block gradient-text">{{ t('hero.line2') }}</span>
                <span ref="line3Ref" class="block relative">
                  {{ t('hero.line3') }}
                  <span ref="underlineRef" class="absolute -bottom-1 md:-bottom-2 left-0 w-full h-[2px] md:h-[3px] bg-gradient-to-r from-primary-500 via-accent-500 to-purple-500 rounded-full origin-left" />
                </span>
              </h1>
            </div>

            <!-- Name -->
            <div ref="nameRef" class="flex items-center gap-3">
              <span class="text-sm font-mono text-primary-400/60">//</span>
              <span class="text-base md:text-lg font-medium text-dark-text/80 font-display tracking-wide">{{ t('brand.name') }}</span>
              <span class="text-sm text-dark-muted/40">—</span>
              <span class="text-sm text-dark-muted/60 font-mono">{{ t('hero.role') }}</span>
            </div>

            <!-- Description -->
            <p ref="descRef" class="text-base md:text-lg text-dark-muted leading-relaxed max-w-xl">
              {{ t('hero.description') }}
            </p>

            <!-- CTA Buttons -->
            <div ref="ctaRef" class="flex flex-wrap gap-3 md:gap-4 pt-2">
              <button ref="primaryBtn" class="group relative overflow-hidden rounded-full px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-medium text-sm shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-500" @click="scrollToSection('#projects')">
                <span class="relative z-10 flex items-center gap-2">
                  {{ t('hero.projects') }}
                  <svg class="w-4 h-4 flip-rtl transition-transform duration-300" :class="isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <span ref="primaryRipple" class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
              </button>

              <button ref="secondaryBtn" class="group relative overflow-hidden rounded-full px-6 py-3 glass text-dark-text font-medium text-sm border border-white/10 hover:border-primary-500/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition-all duration-500" @click="scrollToSection('#contact')">
                <span class="relative z-10 flex items-center gap-2">
                  {{ t('hero.connect') }}
                  <svg class="w-4 h-4 flip-rtl transition-transform duration-300" :class="isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </span>
                <span ref="secondaryRipple" class="absolute inset-0 bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
              </button>

              <a ref="outlineBtn" :href="cvUrl" download class="group inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-dark-muted hover:text-dark-text transition-all duration-300">
                <svg class="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {{ t('hero.resume') }}
              </a>
            </div>

            <!-- Social Links -->
            <div ref="socialRef" class="flex items-center gap-2 pt-2">
              <a
                v-for="(social, i) in socials"
                :key="social.name"
                :ref="el => { if (el) socialRefs[i] = el }"
                :href="social.url"
                :target="social.download ? undefined : '_blank'"
                :download="social.download || undefined"
                rel="noopener noreferrer"
                class="w-9 h-9 rounded-lg glass flex items-center justify-center text-dark-muted/60 hover:text-primary-400 hover:border-primary-500/30 hover:shadow-[0_0_15px_rgba(99,102,241,0.1)] transition-all duration-300 group"
                :title="social.name"
              >
                <span v-html="social.icon" class="w-[18px] h-[18px]" />
              </a>
            </div>
          </div>

          <!-- ===== RIGHT COLUMN ===== -->
          <div ref="rightColRef" class="relative flex items-center justify-center lg:justify-end py-8 sm:py-10">
            <!-- Decorative glowing orbs -->
            <div ref="rightGlow1" class="absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-[80px] opacity-20" style="background: radial-gradient(circle, #6366f1, transparent)" />
            <div ref="rightGlow2" class="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full blur-[60px] opacity-15" style="background: radial-gradient(circle, #0ea5e9, transparent)" />

            <!-- Floating real technology logo chips -->
            <template v-for="(icon, i) in techIcons" :key="icon.name">
              <div
                :ref="el => { if (el) techIconRefs[i] = el }"
                class="absolute z-10"
                :class="icon.pos"
              >
                <div class="animate-float" :style="{ animationDelay: icon.delay + 's' }">
                  <div
                    class="tech-chip w-9 h-9 sm:w-10 sm:h-10 rounded-full glass flex items-center justify-center"
                    :style="{ '--chip-glow': icon.glow, '--chip-glow-border': icon.border }"
                    :title="icon.name"
                  >
                    <svg viewBox="0 0 24 24" class="w-[52%] h-[52%]" fill="currentColor" :style="{ color: icon.color }">
                      <path :d="icon.path" />
                    </svg>
                  </div>
                </div>
              </div>
            </template>

            <!-- Animated Personal Logo -->
            <div ref="logoFloatRef" class="absolute -top-2 -right-2 sm:top-4 sm:right-6 z-20">
              <div ref="logoSpinRef" class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl glass flex items-center justify-center border border-primary-500/20 shadow-lg shadow-primary-500/10">
                <svg viewBox="0 0 40 40" class="w-7 h-7 sm:w-8 sm:h-8">
                  <defs>
                    <linearGradient id="heroLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#6366f1" />
                      <stop offset="100%" stop-color="#0ea5e9" />
                    </linearGradient>
                  </defs>
                  <circle cx="20" cy="20" r="18" fill="none" stroke="url(#heroLogoGrad)" stroke-width="1.5" opacity="0.4" />
                  <text x="20" y="26" font-family="'Space Grotesk', sans-serif" font-size="14" font-weight="700" fill="url(#heroLogoGrad)" text-anchor="middle">AW</text>
                </svg>
              </div>
            </div>

            <!-- Profile Image (premium glass panel) -->
            <ProfileImage ref="profileImageRef" />
          </div>
        </div>
      </div>
    </div>

    <!-- Premium Scroll Indicator -->
    <div ref="scrollIndicatorRef" class="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <span class="text-[9px] font-mono text-dark-muted/30 tracking-[0.25em] uppercase">{{ t('hero.scroll') }}</span>
      <div class="relative w-5 h-8 rounded-full border border-dark-border/60 flex items-start justify-center p-1.5">
        <div ref="scrollDotRef" class="w-1 h-1.5 rounded-full bg-primary-400/60 animate-float" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import ProfileImage from '@/components/ui/ProfileImage.vue'
import { useIsRtl } from '@/composables/useLocale'
import cvUrl from '@/assets/files/cv.docx'

const { t } = useI18n()
const isRtl = useIsRtl()

const heroRef = ref(null)
const threeCanvas = ref(null)
const badgeRef = ref(null)
const headlineRef = ref(null)
const line1Ref = ref(null)
const line2Ref = ref(null)
const line3Ref = ref(null)
const underlineRef = ref(null)
const nameRef = ref(null)
const descRef = ref(null)
const ctaRef = ref(null)
const primaryBtn = ref(null)
const primaryRipple = ref(null)
const secondaryBtn = ref(null)
const secondaryRipple = ref(null)
const outlineBtn = ref(null)
const socialRef = ref(null)
const socialRefs = ref({})
const rightColRef = ref(null)
const rightGlow1 = ref(null)
const rightGlow2 = ref(null)
const techIconRefs = ref({})
const logoFloatRef = ref(null)
const logoSpinRef = ref(null)
const scrollIndicatorRef = ref(null)
const scrollDotRef = ref(null)
const blob1 = ref(null)
const blob2 = ref(null)
const blob3 = ref(null)
const profileImageRef = ref(null)

let gsap = null
let threeScene = null
let animationId = null

const socials = [
  {
    name: 'GitHub',
    url: 'https://github.com/Ali-Waked?tab=repositories',
    icon: '<svg class="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ali-waked-002298275/',
    icon: '<svg class="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  },
  {
    name: 'Email',
    url: 'mailto:ali.i.waked2002@gmail.com',
    icon: '<svg class="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
  },
  {
    name: 'Resume',
    url: cvUrl,
    download: true,
    icon: '<svg class="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>',
  },
]

const techIcons = [
  {
    name: 'Laravel',
    color: '#FF2D20',
    glow: 'rgba(255,45,32,0.35)',
    border: 'rgba(255,45,32,0.3)',
    delay: 0,
    pos: 'top-6 left-2 sm:top-12 sm:left-6',
    path: 'M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.027c-.008.002-.016.008-.024.01a.348.348 0 01-.192 0c-.011-.002-.02-.008-.03-.012-.02-.008-.042-.014-.062-.025L.533 18.755a.376.376 0 01-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 01.023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.037-.027.014-.012.027-.024.041-.034H.53L5.043.05a.375.375 0 01.375 0L9.93 2.647h.002c.015.01.027.021.04.033l.038.027c.013.014.02.03.033.045.008.011.02.021.025.033.01.02.017.038.024.058.003.011.01.021.013.032.01.031.014.064.014.098v9.652l3.76-2.164V5.527c0-.033.004-.066.013-.098.003-.01.01-.02.013-.032a.487.487 0 01.024-.059c.007-.012.018-.02.025-.033.012-.015.021-.03.033-.043.012-.012.025-.02.037-.028.014-.01.026-.023.041-.032h.001l4.513-2.598a.375.375 0 01.375 0l4.513 2.598c.016.01.027.021.042.031.012.01.025.018.036.028.013.014.022.03.034.044.008.012.019.021.024.033.011.02.018.04.024.06.006.01.012.021.015.032zm-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283zm-4.51 7.75v-4.287l-2.147 1.225-6.126 3.498v4.325zM1.093 3.624v14.588l8.273 4.761v-4.325l-4.322-2.445-.002-.003H5.04c-.014-.01-.025-.021-.04-.031-.011-.01-.024-.018-.035-.027l-.001-.002c-.013-.012-.021-.025-.031-.04-.01-.011-.021-.022-.028-.036h-.002c-.008-.014-.013-.031-.02-.047-.006-.016-.014-.027-.018-.043a.49.49 0 01-.008-.057c-.002-.014-.006-.027-.006-.041V5.789l-2.18-1.257zM5.23.81L1.47 2.974l3.76 2.164 3.758-2.164zm1.956 13.505l2.182-1.256V3.624l-1.58.91-2.182 1.255v9.435zm11.581-10.95l-3.76 2.163 3.76 2.163 3.759-2.164zm-.376 4.978L16.21 7.087 14.63 6.18v4.283l2.182 1.256 1.58.908zm-8.65 9.654l5.514-3.148 2.756-1.572-3.757-2.163-4.323 2.489-3.941 2.27z',
  },
  {
    name: 'Vue.js',
    color: '#4FC08D',
    glow: 'rgba(79,192,141,0.35)',
    border: 'rgba(79,192,141,0.3)',
    delay: 0.8,
    pos: 'top-12 right-4 sm:top-20 sm:right-10',
    path: 'M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,14.08,5.16,2.23H9.59L12,6.41l2.41-4.18h4.43Z',
  },
  {
    name: 'PHP',
    color: '#777BB4',
    glow: 'rgba(119,123,180,0.4)',
    border: 'rgba(119,123,180,0.35)',
    delay: 1.6,
    pos: 'right-0 sm:right-4 top-1/2 -mt-[18px] sm:-mt-5',
    path: 'M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .97-.105 1.242-.314.272-.21.455-.559.55-1.049.092-.47.05-.802-.124-.995-.175-.193-.523-.29-1.047-.29zM12 5.688C5.373 5.688 0 8.514 0 12s5.373 6.313 12 6.313S24 15.486 24 12c0-3.486-5.373-6.312-12-6.312zm-3.26 7.451c-.261.25-.575.438-.917.551-.336.108-.765.164-1.285.164H5.357l-.327 1.681H3.652l1.23-6.326h2.65c.797 0 1.378.209 1.744.628.366.418.476 1.002.33 1.752a2.836 2.836 0 01-.305.847c-.143.255-.33.49-.561.703zm4.024.715l.543-2.799c.063-.318.039-.536-.068-.651-.107-.116-.336-.174-.687-.174H11.46l-.704 3.625H9.388l1.23-6.327h1.367l-.327 1.682h1.218c.767 0 1.295.134 1.586.401s.378.7.263 1.299l-.572 2.944h-1.389zm7.597-2.265a2.782 2.782 0 01-.305.847c-.143.255-.33.49-.561.703a2.44 2.44 0 01-.917.551c-.336.108-.765.164-1.286.164h-1.18l-.327 1.682h-1.378l1.23-6.326h2.649c.797 0 1.378.209 1.744.628.366.417.477 1.001.331 1.751zM17.766 10.207h-.943l-.516 2.648h.838c.557 0 .971-.105 1.242-.314.272-.21.455-.559.551-1.049.092-.47.049-.802-.125-.995s-.524-.29-1.047-.29z',
  },
  {
    name: 'JavaScript',
    color: '#F7DF1E',
    glow: 'rgba(247,223,30,0.4)',
    border: 'rgba(247,223,30,0.35)',
    delay: 0.4,
    pos: 'bottom-8 right-4 sm:bottom-12 sm:right-8',
    path: 'M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z',
  },
  {
    name: 'Tailwind CSS',
    color: '#06B6D4',
    glow: 'rgba(6,182,212,0.35)',
    border: 'rgba(6,182,212,0.3)',
    delay: 1.2,
    pos: 'bottom-16 left-3 sm:bottom-24 sm:left-8',
    path: 'M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z',
  },
  {
    name: 'Docker',
    color: '#2496ED',
    glow: 'rgba(36,150,237,0.35)',
    border: 'rgba(36,150,237,0.3)',
    delay: 2,
    pos: 'left-0 sm:left-4 top-1/2 -mt-[18px] sm:-mt-5',
    path: 'M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z',
  },
  {
    name: 'Git',
    color: '#F03C2E',
    glow: 'rgba(240,60,46,0.35)',
    border: 'rgba(240,60,46,0.3)',
    delay: 2.4,
    pos: 'top-[34%] -left-1 sm:left-2',
    path: 'M13.09 23.549a1.54 1.54 0 01-2.18 0L.451 13.089a1.54 1.54 0 010-2.179l7.191-7.19 2.733 2.733a1.85 1.85 0 00.964 2.326v6.66a1.849 1.849 0 101.54 0V8.957l2.508 2.508a1.85 1.85 0 101.09-1.09l-2.634-2.634a1.85 1.85 0 00-2.378-2.377L8.73 2.63 10.91.451a1.54 1.54 0 012.179 0l10.459 10.46a1.54 1.54 0 010 2.179z',
  },
  {
    name: 'MySQL',
    color: '#4479A1',
    glow: 'rgba(68,121,161,0.4)',
    border: 'rgba(68,121,161,0.35)',
    delay: 2.8,
    pos: 'bottom-3 right-1 sm:bottom-6 sm:right-4',
    path: 'M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.772.36-.622zM15.5 17.588c-.225-.36-.337-.94-.337-1.736 0-1.393.424-2.09 1.27-2.09.443 0 .77.167.977.5.224.362.336.936.336 1.723 0 1.404-.424 2.108-1.27 2.108-.445 0-.77-.167-.978-.5zm-1.658-.425c0 .47-.172.856-.516 1.156-.344.3-.803.45-1.384.45-.543 0-1.064-.172-1.573-.515l.237-.476c.438.22.833.328 1.19.328.332 0 .593-.073.783-.22a.754.754 0 00.3-.615c0-.33-.23-.61-.648-.845-.388-.213-1.163-.657-1.163-.657-.422-.307-.632-.636-.632-1.177 0-.45.157-.81.47-1.085.315-.278.72-.415 1.22-.415.512 0 .98.136 1.4.41l-.213.476a2.726 2.726 0 00-1.064-.23c-.283 0-.502.068-.654.206a.685.685 0 00-.248.524c0 .328.234.61.666.85.393.215 1.187.67 1.187.67.433.305.648.63.648 1.168zm9.382-5.852c-.535-.014-.95.04-1.297.188-.1.04-.26.04-.274.167.055.053.063.14.11.214.08.134.218.313.346.407.14.11.28.216.427.31.26.16.555.255.81.416.145.094.293.213.44.313.073.05.12.14.214.172v-.02c-.046-.06-.06-.147-.105-.214-.067-.067-.134-.127-.2-.193a3.223 3.223 0 00-.695-.675c-.214-.146-.682-.35-.77-.595l-.013-.014c.146-.013.32-.066.46-.106.227-.06.435-.047.67-.106.106-.027.213-.06.32-.094v-.06c-.12-.12-.21-.283-.334-.395a8.867 8.867 0 00-1.104-.823c-.21-.134-.476-.22-.697-.334-.08-.04-.214-.06-.26-.127-.12-.146-.19-.34-.275-.514a17.69 17.69 0 01-.547-1.163c-.12-.262-.193-.523-.34-.763-.69-1.137-1.437-1.826-2.586-2.5-.247-.14-.543-.2-.856-.274-.167-.008-.334-.02-.5-.027-.11-.047-.216-.174-.31-.235-.38-.24-1.364-.76-1.644-.072-.18.434.267.862.422 1.082.115.153.26.328.34.5.047.116.06.235.107.356.106.294.207.622.347.897.073.14.153.287.247.413.054.073.146.107.167.227-.094.136-.1.334-.154.5-.24.757-.146 1.693.194 2.25.107.166.362.534.703.393.3-.12.234-.5.32-.835.02-.08.007-.133.048-.187v.015c.094.188.188.367.274.555.206.328.566.668.867.895.16.12.287.328.487.402v-.02h-.015c-.043-.058-.1-.086-.154-.133a3.445 3.445 0 01-.35-.4 8.76 8.76 0 01-.747-1.218c-.11-.21-.202-.436-.29-.643-.04-.08-.04-.2-.107-.24-.1.146-.247.273-.32.453-.127.288-.14.642-.188 1.01-.027.007-.014 0-.027.014-.214-.052-.287-.274-.367-.46-.2-.475-.233-1.238-.06-1.785.047-.14.247-.582.167-.716-.042-.127-.174-.2-.247-.303a2.478 2.478 0 01-.24-.427c-.16-.374-.24-.788-.414-1.162-.08-.173-.22-.354-.334-.513-.127-.18-.267-.307-.368-.52-.033-.073-.08-.194-.027-.274.014-.054.042-.075.094-.09.088-.072.335.022.422.062.247.1.455.194.662.334.094.066.195.193.315.226h.14c.214.047.455.014.655.073.355.114.675.28.962.46a5.953 5.953 0 012.085 2.286c.08.154.115.295.188.455.14.33.313.663.455.982.14.315.275.636.476.897.1.14.502.213.682.286.133.06.34.115.46.188.23.14.454.3.67.454.11.076.443.243.463.378z',
  },
]

onMounted(async () => {
  const module = await import('gsap')
  gsap = module.default

  initThreeBackground()
  animateEntrance()

  // Magnetic effect for buttons
  setupMagnetic(primaryBtn.value)
  setupMagnetic(secondaryBtn.value)
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  if (threeScene) {
    threeScene.scene.traverse((child) => {
      if (child.geometry) child.geometry.dispose()
      if (child.material) child.material.dispose()
    })
    threeScene.renderer.dispose()
  }
})

function setupMagnetic(el) {
  if (!el) return
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    if (gsap) gsap.to(el, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: 'power2.out' })
  })
  el.addEventListener('mouseleave', () => {
    if (gsap) gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
  })
}

async function initThreeBackground() {
  const { Scene, PerspectiveCamera, WebGLRenderer, Points, PointsMaterial, BufferGeometry, Float32BufferAttribute, AdditiveBlending } = await import('three')

  const canvas = threeCanvas.value
  if (!canvas) return

  const scene = new Scene()
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const starsGeometry = new BufferGeometry()
  const colors = []
  const vertices = []
  for (let i = 0; i < 1500; i++) {
    const x = (Math.random() - 0.5) * 2000
    const y = (Math.random() - 0.5) * 2000
    const z = (Math.random() - 0.5) * 2000
    vertices.push(x, y, z)
    colors.push(0.4 + Math.random() * 0.3, 0.4 + Math.random() * 0.3, 0.9 + Math.random() * 0.1)
  }
  starsGeometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))
  starsGeometry.setAttribute('color', new Float32BufferAttribute(colors, 3))

  const starsMaterial = new PointsMaterial({
    size: 0.4,
    transparent: true,
    opacity: 0.6,
    vertexColors: true,
    blending: AdditiveBlending,
  })

  const stars = new Points(starsGeometry, starsMaterial)
  scene.add(stars)
  camera.position.z = 500

  threeScene = { scene, camera, renderer, stars }

  function animate() {
    if (threeScene) {
      threeScene.stars.rotation.y += 0.00015
      threeScene.stars.rotation.x += 0.00005
      threeScene.renderer.render(threeScene.scene, threeScene.camera)
    }
    animationId = requestAnimationFrame(animate)
  }

  animate()

  window.addEventListener('resize', () => {
    if (!threeScene) return
    threeScene.camera.aspect = window.innerWidth / window.innerHeight
    threeScene.camera.updateProjectionMatrix()
    threeScene.renderer.setSize(window.innerWidth, window.innerHeight)
  })
}

function animateEntrance() {
  if (!gsap) return

  const tl = gsap.timeline()

  tl.fromTo(blob1.value, { opacity: 0, scale: 0.8 }, { opacity: 0.1, scale: 1, duration: 1.5, ease: 'power3.out' })
    .fromTo(blob2.value, { opacity: 0, scale: 0.8 }, { opacity: 0.1, scale: 1, duration: 1.5, ease: 'power3.out' }, '-=1.2')
    .fromTo(blob3.value, { opacity: 0 }, { opacity: 0.05, duration: 1.5, ease: 'power2.out' }, '-=1')

    // Badge
    .fromTo(badgeRef.value, { opacity: 0, y: 15, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' }, '-=0.6')

    // Headline lines
    .fromTo(line1Ref.value, { opacity: 0, y: 30, rotateX: -15 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
    .fromTo(line2Ref.value, { opacity: 0, y: 30, rotateX: -15 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
    .fromTo(line3Ref.value, { opacity: 0, y: 30, rotateX: -15 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
    .fromTo(underlineRef.value, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power3.inOut', transformOrigin: isRtl.value ? 'right center' : 'left center' }, '-=0.3')

    // Name
    .fromTo(nameRef.value, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')

    // Description
    .fromTo(descRef.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')

    // CTAs
    .fromTo(ctaRef.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.1')

    // Social icons staggered
    .fromTo(
      Object.values(socialRefs.value).filter(Boolean),
      { opacity: 0, y: 15, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.3, stagger: 0.08, ease: 'back.out(2)' },
      '-=0.1'
    )

    // Right column
    .fromTo(rightColRef.value, { opacity: 0, x: isRtl.value ? -60 : 60 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }, '-=0.6')
    .fromTo(rightGlow1.value, { opacity: 0, scale: 0.5 }, { opacity: 0.2, scale: 1, duration: 1, ease: 'power2.out' }, '-=0.8')
    .fromTo(rightGlow2.value, { opacity: 0, scale: 0.5 }, { opacity: 0.15, scale: 1, duration: 1, ease: 'power2.out' }, '-=0.7')

    // Tech icon chips staggered
    .fromTo(
      Object.values(techIconRefs.value).filter(Boolean),
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(3)' },
      '-=0.6'
    )

    // Logo
    .fromTo(logoFloatRef.value, { opacity: 0, scale: 0.5, rotation: -180 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' }, '-=0.4')

    // Scroll indicator
    .fromTo(scrollIndicatorRef.value, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.1')
}

function scrollToSection(href) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>
