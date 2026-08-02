<template>
  <div
    ref="logoRef"
    class="relative inline-flex items-center justify-center cursor-pointer"
    @mouseenter="onHover(true)"
    @mouseleave="onHover(false)"
  >
    <svg
      viewBox="0 0 120 40"
      class="h-8 md:h-10"
      :class="[size === 'lg' ? 'h-16 md:h-20' : '', size === 'xl' ? 'h-24 md:h-32' : '']"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6366f1" />
          <stop offset="50%" stop-color="#0ea5e9" />
          <stop offset="100%" stop-color="#8b5cf6" />
        </linearGradient>
        <linearGradient id="logoGradHover" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#818cf8" />
          <stop offset="50%" stop-color="#38bdf8" />
          <stop offset="100%" stop-color="#a78bfa" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <!-- Background circle -->
      <circle
        ref="bgCircle"
        cx="20"
        cy="20"
        r="18"
        fill="none"
        stroke="url(#logoGrad)"
        stroke-width="1.5"
        opacity="0.3"
      />

      <!-- Decorative dots -->
      <circle cx="36" cy="6" r="2" fill="#6366f1" opacity="0.4" ref="dot1" />
      <circle cx="42" cy="12" r="1.2" fill="#0ea5e9" opacity="0.3" ref="dot2" />

      <!-- Initials -->
      <text
        ref="textRef"
        x="20"
        y="26"
        font-family="'Space Grotesk', sans-serif"
        font-size="16"
        font-weight="700"
        fill="url(#logoGrad)"
        text-anchor="middle"
        filter="url(#glow)"
      >{{ t('brand.initials') }}</text>

      <!-- Full name -->
      <text
        ref="fullNameRef"
        x="52"
        y="19"
        font-family="'Space Grotesk', 'Cairo', sans-serif"
        font-size="9"
        font-weight="600"
        fill="url(#logoGrad)"
        opacity="0"
      >{{ t('logo.first') }}</text>
      <text
        ref="lastNameRef"
        x="52"
        y="30"
        font-family="'Space Grotesk', 'Cairo', sans-serif"
        font-size="9"
        font-weight="600"
        fill="url(#logoGrad)"
        opacity="0"
      >{{ t('logo.last') }}</text>
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  size: { type: String, default: 'sm' },
  animated: { type: Boolean, default: true },
})

const emit = defineEmits(['loaded'])

const logoRef = ref(null)
const textRef = ref(null)
const bgCircle = ref(null)
const fullNameRef = ref(null)
const lastNameRef = ref(null)
const dot1 = ref(null)
const dot2 = ref(null)

let gsap = null
let mouseMoveHandler = null
let mouseLeaveHandler = null

onMounted(async () => {
  const module = await import('gsap')
  gsap = module.default

  if (props.animated) {
    const tl = gsap.timeline()
    tl.fromTo(bgCircle?.$el || bgCircle?.value,
      { scale: 0, opacity: 0, rotation: -180 },
      { scale: 1, opacity: 0.3, rotation: 0, duration: 1, ease: 'elastic.out(1, 0.5)' }
    )
    .fromTo(textRef?.$el || textRef?.value,
      { opacity: 0, y: 10, scale: 0.5 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.6'
    )
    .fromTo(dot1?.$el || dot1?.value,
      { opacity: 0, scale: 0 },
      { opacity: 0.4, scale: 1, duration: 0.4, ease: 'back.out(3)' },
      '-=0.3'
    )
    .fromTo(dot2?.$el || dot2?.value,
      { opacity: 0, scale: 0 },
      { opacity: 0.3, scale: 1, duration: 0.4, ease: 'back.out(3)' },
      '-=0.2'
    )
  }

  emit('loaded')
})

function onHover(entering) {
  if (!gsap) return
  if (entering) {
    gsap.to(textRef?.$el || textRef?.value, { scale: 1.1, duration: 0.3, ease: 'power2.out' })
    gsap.to(bgCircle?.$el || bgCircle?.value, { opacity: 0.6, duration: 0.3, ease: 'power2.out' })
  } else {
    gsap.to(textRef?.$el || textRef?.value, { scale: 1, duration: 0.3, ease: 'power2.out' })
    gsap.to(bgCircle?.$el || bgCircle?.value, { opacity: 0.3, duration: 0.3, ease: 'power2.out' })
  }
}
</script>
