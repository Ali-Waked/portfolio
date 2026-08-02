<template>
  <div
    ref="loaderRef"
    class="fixed inset-0 z-[100] flex h-screen w-screen items-center justify-center bg-dark-bg"
  >
    <!-- Background particles -->
    <canvas ref="particleCanvas" class="absolute inset-0 pointer-events-none" />

    <!-- Central content -->
    <div ref="contentRef" class="relative z-10 flex w-full max-w-md flex-col items-center px-6 text-center">
      <!-- Animated Logo -->
      <div ref="logoContainerRef" class="mb-8">
        <svg
          viewBox="0 0 120 40"
          class="h-24 w-auto md:h-32 select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="loaderLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#6366f1" />
              <stop offset="50%" stop-color="#0ea5e9" />
              <stop offset="100%" stop-color="#8b5cf6" />
            </linearGradient>
            <filter id="loaderLogoGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <!-- Faint base ring -->
          <circle
            ref="logoCircle"
            cx="60"
            cy="20"
            r="18"
            fill="none"
            stroke="url(#loaderLogoGrad)"
            stroke-width="1.5"
            opacity="0.3"
          />

          <!-- Rotating ring -->
          <circle
            ref="ringRef"
            class="loader-ring"
            cx="60"
            cy="20"
            r="18"
            fill="none"
            stroke="url(#loaderLogoGrad)"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-dasharray="97 16"
            opacity="0.55"
          />

          <!-- Initials -->
          <text
            ref="logoText"
            x="60"
            y="26"
            font-family="'Space Grotesk', sans-serif"
            font-size="16"
            font-weight="700"
            fill="url(#loaderLogoGrad)"
            text-anchor="middle"
            filter="url(#loaderLogoGlow)"
          >AW</text>

          <!-- Live pulse dot (top-right) -->
          <circle ref="logoDot1" class="loader-dot" cx="76" cy="6" r="2" fill="#6366f1" />
          <circle ref="logoDot2" cx="82" cy="12" r="1.2" fill="#0ea5e9" opacity="0.3" />
        </svg>
      </div>

      <!-- Percentage -->
      <p ref="percentRef" class="mb-3 font-mono text-4xl md:text-5xl font-bold tracking-tight gradient-text">
        0%
      </p>

      <!-- Loading bar -->
      <div
        ref="progressContainerRef"
        class="w-56 md:w-64 h-[3px] rounded-full overflow-hidden bg-dark-border"
      >
        <div ref="progressBarRef" class="loader-bar-fill h-full w-full rounded-full bg-gradient-to-r from-primary-500 via-accent-500 to-purple-500" />
      </div>

      <!-- Loading text -->
      <p ref="loadingTextRef" class="mt-4 text-xs font-mono text-dark-muted tracking-widest uppercase">
        {{ t('loading.status') }}
      </p>
    </div>

    <!-- Decorative bottom text -->
    <div ref="bottomRef" class="absolute bottom-8 text-[10px] font-mono text-dark-muted/30 tracking-[0.3em] uppercase">
      {{ t('brand.name') }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import avatarImage from '@/assets/images/avatar.png'
import organickImage from '@/assets/images/organick.png'

const { t } = useI18n()

const emit = defineEmits(['loaded'])

const loaderRef = ref(null)
const contentRef = ref(null)
const ringRef = ref(null)
const logoText = ref(null)
const logoDot1 = ref(null)
const progressBarRef = ref(null)
const loadingTextRef = ref(null)
const percentRef = ref(null)
const bottomRef = ref(null)
const particleCanvas = ref(null)

const MIN_LOAD_MS = 1000

let gsap = null
let progressRaf = null
let particleRaf = null
let exitStarted = false

onMounted(async () => {
  const module = await import('gsap')
  gsap = module.default

  initParticles()
  playIntro()
  runProgress()
})

onBeforeUnmount(() => {
  if (progressRaf) cancelAnimationFrame(progressRaf)
  if (particleRaf) cancelAnimationFrame(particleRaf)
})

function initParticles() {
  const canvas = particleCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const particles = []
  const count = 30

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.6,
      alpha: Math.random() * 0.25,
    })
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (const p of particles) {
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(99, 102, 241, ${p.alpha})`
      ctx.fill()
    }
    particleRaf = requestAnimationFrame(draw)
  }

  draw()
}

function playIntro() {
  if (!gsap || !contentRef.value) return
  const tl = gsap.timeline()
  tl.fromTo(
    contentRef.value,
    { opacity: 0, y: 18 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
  )
    .fromTo(
      logoText.value,
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
      '-=0.45'
    )
    .fromTo(
      logoDot1.value,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' },
      '-=0.3'
    )
}

function runProgress() {
  const startTime = performance.now()
  let completed = 0

  const tasks = [
    () => preloadImage(avatarImage),
    () => preloadImage(organickImage),
    () => loadFont('700 20px "Space Grotesk"'),
    () => loadFont('400 20px "Inter"'),
    () => loadFont('600 20px "Inter"'),
    () => loadFont('400 20px "JetBrains Mono"'),
    () => loadFont('400 20px "Cairo"'),
    () => loadFont('700 20px "Cairo"'),
    () => document.fonts.ready,
  ]
  const total = tasks.length

  tasks.forEach((task) => {
    withTimeout(task(), 3000)
      .catch(() => {})
      .then(() => { completed++ })
  })

  let displayed = 0
  let target = 0

  function frame() {
    const elapsed = performance.now() - startTime
    const resourceRatio = completed / total
    const timeRatio = Math.min(elapsed / MIN_LOAD_MS, 1) * 0.92
    target = Math.max(resourceRatio, timeRatio)

    displayed += (target - displayed) * 0.09
    if (Math.abs(target - displayed) < 0.0004) displayed = target
    const clamped = Math.min(Math.max(displayed, 0), 1)
    setProgress(clamped)

    const allLoaded = completed >= total
    if (clamped >= 1 && allLoaded && elapsed >= MIN_LOAD_MS) {
      setProgress(1)
      if (loadingTextRef.value) loadingTextRef.value.textContent = t('loading.ready')
      setTimeout(exitLoader, 300)
      return
    }
    progressRaf = requestAnimationFrame(frame)
  }

  setProgress(0)
  progressRaf = requestAnimationFrame(frame)
}

function setProgress(p) {
  if (progressBarRef.value) {
    progressBarRef.value.style.transform = `scaleX(${p})`
  }
  if (percentRef.value) {
    const percent = Math.round(p * 100)
    if (percentRef.value.dataset.value !== String(percent)) {
      percentRef.value.dataset.value = String(percent)
      percentRef.value.textContent = `${percent}%`
    }
  }
}

function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = resolve
    img.onerror = resolve
    img.src = src
  })
}

function loadFont(spec) {
  if (!document.fonts || typeof document.fonts.load !== 'function') {
    return Promise.resolve()
  }
  return document.fonts.load(spec)
}

function withTimeout(promise, ms) {
  return new Promise((resolve) => {
    const timer = setTimeout(resolve, ms)
    Promise.resolve(promise)
      .then(() => { clearTimeout(timer); resolve() })
      .catch(() => { clearTimeout(timer); resolve() })
  })
}

function exitLoader() {
  if (exitStarted) return
  exitStarted = true

  if (progressRaf) cancelAnimationFrame(progressRaf)
  if (particleRaf) cancelAnimationFrame(particleRaf)

  if (!gsap || !loaderRef.value) {
    emit('loaded')
    return
  }

  gsap.to(contentRef.value, { opacity: 0, y: -24, duration: 0.4, ease: 'power2.in' })
  gsap.to(bottomRef.value, { opacity: 0, duration: 0.3 })
  gsap.to(particleCanvas.value, { opacity: 0, duration: 0.3 })

  gsap.to(loaderRef.value, {
    y: '-100%',
    duration: 0.9,
    ease: 'power4.inOut',
    onComplete: () => emit('loaded'),
  })
}
</script>

<style scoped>
.loader-ring {
  transform-box: fill-box;
  transform-origin: center;
  animation: loader-ring-spin 3.6s linear infinite;
  will-change: transform;
}

.loader-dot {
  transform-box: fill-box;
  transform-origin: center;
  filter: drop-shadow(0 0 6px rgba(99, 102, 241, 0.9));
  animation: loader-dot-pulse 2.2s ease-in-out infinite;
  will-change: transform, opacity;
}

.loader-bar-fill {
  transform: scaleX(0);
  transform-origin: left center;
  box-shadow: 0 0 12px rgba(99, 102, 241, 0.55);
  will-change: transform;
}

@keyframes loader-ring-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes loader-dot-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.9);
    opacity: 0.45;
  }
}

@media (prefers-reduced-motion: reduce) {
  .loader-ring,
  .loader-dot {
    animation: none;
  }
}
</style>
