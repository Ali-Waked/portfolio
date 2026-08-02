<template>
  <!-- Invisible layout container: transparent, no border, no shadow -->
  <div
    ref="containerRef"
    class="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 mx-auto"
  >
    <!-- Soft radial blue/purple glow behind the circle -->
    <div
      ref="glowRef"
      class="absolute inset-[-14%] rounded-full blur-[70px] opacity-0"
      style="background: radial-gradient(circle at 50% 42%, rgba(99,102,241,0.42), rgba(14,165,233,0.2) 46%, rgba(139,92,246,0.15) 66%, transparent 78%)"
    />

    <!-- Animated gradient rings (visible around the outside of the circle) -->
    <div ref="ringWrapper1" class="absolute -inset-4 pointer-events-none">
      <svg viewBox="0 0 100 100" class="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="heroRingA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#6366f1" stop-opacity="0.9" />
            <stop offset="50%" stop-color="#0ea5e9" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.9" />
          </linearGradient>
          <linearGradient id="heroRingB" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.8" />
            <stop offset="50%" stop-color="#0ea5e9" stop-opacity="0.8" />
            <stop offset="100%" stop-color="#6366f1" stop-opacity="0.8" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="none" stroke="url(#heroRingA)" stroke-width="0.5" opacity="0.45" />
        <circle cx="50" cy="50" r="46" fill="none" stroke="url(#heroRingB)" stroke-width="0.35" opacity="0.3" />
      </svg>
    </div>

    <div ref="ringWrapper2" class="absolute -inset-8 pointer-events-none">
      <svg viewBox="0 0 100 100" class="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="heroRingC" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#6366f1" stop-opacity="0.9" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="50" fill="none" stroke="url(#heroRingC)" stroke-width="0.5" stroke-dasharray="1.5 2.5" stroke-linecap="round" opacity="0.45" />
      </svg>
    </div>

    <!-- Orbiting accent dots on the rings -->
    <div ref="dotOrbit1" class="absolute -inset-4 pointer-events-none">
      <span class="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary-400/80 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
    </div>
    <div ref="dotOrbit2" class="absolute -inset-8 pointer-events-none" style="transform: rotate(140deg)">
      <span class="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-400/70 shadow-[0_0_6px_rgba(14,165,233,0.5)]" />
    </div>

    <!-- Subtle lighting: soft top-left light source -->
    <div class="absolute -top-6 left-[8%] w-40 h-40 rounded-full bg-white/[0.07] blur-3xl pointer-events-none" />
    <div class="absolute -bottom-8 right-[4%] w-32 h-32 rounded-full bg-accent-500/[0.08] blur-3xl pointer-events-none" />

    <!-- Soft floor shadow (circle appears to hover above it) -->
    <div
      ref="shadowRef"
      class="absolute -bottom-9 left-1/2 -translate-x-1/2 w-[78%] h-11 rounded-[50%] bg-black/45 blur-2xl pointer-events-none"
    />

    <!-- Circular image frame (equal width/height, clips the image) -->
    <div
      ref="circleRef"
      class="absolute inset-0 rounded-full overflow-hidden will-change-transform bg-white/[0.03] shadow-[0_35px_80px_-20px_rgba(0,0,0,0.55),0_16px_40px_-12px_rgba(99,102,241,0.18)]"
    >
      <img
        ref="avatarRef"
        :src="avatar"
        alt="Ali Abu Waked"
        class="w-full h-full object-cover object-[50%_18%] opacity-0"
        style="filter: drop-shadow(0 12px 28px rgba(0, 0, 0, 0.35)); transform: scale(1.15)"
        loading="eager"
        draggable="false"
      />

      <!-- Circular inner edge highlight -->
      <div class="absolute inset-0 rounded-full ring-1 ring-inset ring-white/[0.09] pointer-events-none" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useMousePosition } from '@/composables/useMousePosition'
import avatar from '@/assets/images/avatar.png'

const containerRef = ref(null)
const glowRef = ref(null)
const ringWrapper1 = ref(null)
const ringWrapper2 = ref(null)
const dotOrbit1 = ref(null)
const dotOrbit2 = ref(null)
const shadowRef = ref(null)
const circleRef = ref(null)
const avatarRef = ref(null)

const { normalizedX, normalizedY } = useMousePosition()

let gsap = null
let tweens = []

onMounted(async () => {
  const module = await import('gsap')
  gsap = module.default

  animateEntrance()
  startLoopingAnimations()
  startMouseParallax()
})

onUnmounted(() => {
  if (gsap) {
    tweens.forEach((t) => t.kill())
    tweens = []
  }
})

function animateEntrance() {
  if (!gsap) return

  const tl = gsap.timeline()

  tl.fromTo(glowRef.value,
    { opacity: 0, scale: 0.6 },
    { opacity: 1, scale: 1, duration: 1.6, ease: 'power3.out' }
  )
  .fromTo(containerRef.value,
    { scale: 0.4, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.2, ease: 'elastic.out(1, 0.4)' },
    '-=1.2'
  )
  .fromTo(circleRef.value,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
    '-=0.7'
  )
  .fromTo(avatarRef.value,
    { scale: 1.32, opacity: 0 },
    { scale: 1.15, opacity: 1, duration: 1.4, ease: 'power3.out' },
    '-=0.8'
  )
  .fromTo(ringWrapper1.value,
    { opacity: 0, rotation: -120 },
    { opacity: 1, rotation: 0, duration: 1.6, ease: 'power2.out' },
    '-=1'
  )
  .fromTo(ringWrapper2.value,
    { opacity: 0, rotation: 120 },
    { opacity: 1, rotation: 0, duration: 1.6, ease: 'power2.out' },
    '-=1.3'
  )
  .fromTo([dotOrbit1.value, dotOrbit2.value],
    { opacity: 0 },
    { opacity: 1, duration: 0.8 },
    '-=0.5'
  )
  .fromTo(shadowRef.value,
    { opacity: 0, scale: 0.7 },
    { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' },
    '-=0.7'
  )
}

function startLoopingAnimations() {
  if (!gsap) return

  tweens.push(gsap.to(circleRef.value, {
    y: -7,
    duration: 3.4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  }))

  tweens.push(gsap.to(ringWrapper1.value, {
    rotation: 360,
    transformOrigin: 'center',
    duration: 30,
    repeat: -1,
    ease: 'none',
  }))

  tweens.push(gsap.to(ringWrapper2.value, {
    rotation: -360,
    transformOrigin: 'center',
    duration: 22,
    repeat: -1,
    ease: 'none',
  }))

  tweens.push(gsap.to(dotOrbit1.value, {
    rotation: 360,
    transformOrigin: 'center',
    duration: 30,
    repeat: -1,
    ease: 'none',
  }))

  tweens.push(gsap.to(dotOrbit2.value, {
    rotation: 360,
    transformOrigin: 'center',
    duration: 22,
    repeat: -1,
    ease: 'none',
  }))

  tweens.push(gsap.to(glowRef.value, {
    scale: 1.08,
    opacity: 0.85,
    duration: 4.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  }))

  tweens.push(gsap.to(shadowRef.value, {
    scaleX: 1.1,
    opacity: 0.7,
    duration: 3.4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  }))
}

function startMouseParallax() {
  if (!gsap || !containerRef.value) return

  const onMove = () => {
    if (!gsap || !circleRef.value) return
    const rotateY = normalizedX.value * 7
    const rotateX = -normalizedY.value * 7
    gsap.to(circleRef.value, { rotateX, rotateY, duration: 0.8, ease: 'power2.out' })
  }

  window.addEventListener('mousemove', onMove)
}
</script>
