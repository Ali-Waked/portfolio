<template>
  <div
    ref="cardRef"
    class="glass glass-hover rounded-2xl p-6 md:p-8 transition-all duration-500"
    :class="{ 'cursor-pointer': interactive }"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
    @mousemove="onMove"
  >
    <div ref="contentRef" class="relative z-10">
      <slot />
    </div>
    <div
      v-if="glow"
      ref="glowRef"
      class="absolute -inset-0.5 rounded-2xl opacity-0 blur-xl transition-opacity duration-500"
      :class="glowColor"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  interactive: { type: Boolean, default: false },
  glow: { type: Boolean, default: true },
  glowColor: { type: String, default: 'bg-primary-500/20' },
})

const cardRef = ref(null)
const contentRef = ref(null)
const glowRef = ref(null)

let gsap = null

onMounted(async () => {
  const module = await import('gsap')
  gsap = module.default
})

function onEnter(e) {
  if (!gsap || !props.interactive) return
  gsap.to(cardRef.value, { scale: 1.02, duration: 0.4, ease: 'power2.out' })
  if (glowRef.value) {
    gsap.to(glowRef.value, { opacity: 1, duration: 0.4 })
  }
}

function onLeave(e) {
  if (!gsap || !props.interactive) return
  gsap.to(cardRef.value, { scale: 1, rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power2.out' })
  if (glowRef.value) {
    gsap.to(glowRef.value, { opacity: 0, duration: 0.4 })
  }
}

function onMove(e) {
  if (!gsap || !props.interactive || !cardRef.value) return
  const rect = cardRef.value.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  gsap.to(cardRef.value, {
    rotateX: -y * 10,
    rotateY: x * 10,
    duration: 0.3,
    ease: 'power2.out',
  })
}
</script>
