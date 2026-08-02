<template>
  <button
    ref="btnRef"
    class="magnetic-btn relative overflow-hidden rounded-full px-6 py-3 font-medium text-sm transition-all duration-300"
    :class="[
      variant === 'primary'
        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25'
        : variant === 'secondary'
          ? 'glass glass-hover text-dark-text'
          : variant === 'ghost'
            ? 'text-dark-muted hover:text-dark-text hover:bg-white/5'
            : 'glass glass-hover text-dark-text',
      { 'pointer-events-none opacity-50': disabled },
    ]"
    :disabled="disabled"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @mousemove="onMouseMove"
    @click="$emit('click')"
  >
    <span ref="textRef" class="relative z-10 flex items-center gap-2">
      <slot />
    </span>
    <div
      ref="glowRef"
      class="absolute inset-0 opacity-0 transition-opacity duration-300 rounded-full"
      :class="variant === 'primary' ? 'bg-white/10' : 'bg-primary-500/10'"
    />
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  variant: { type: String, default: 'primary' },
  disabled: { type: Boolean, default: false },
})

defineEmits(['click'])

const btnRef = ref(null)
const textRef = ref(null)
const glowRef = ref(null)

let gsap = null

onMounted(async () => {
  const module = await import('gsap')
  gsap = module.default
})

function onMouseEnter(e) {
  if (!gsap) return
  gsap.to(btnRef.value, { scale: 1.05, duration: 0.3, ease: 'power2.out' })
  gsap.to(glowRef.value, { opacity: 1, duration: 0.3 })
}

function onMouseLeave(e) {
  if (!gsap) return
  gsap.to(btnRef.value, { scale: 1, x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
  gsap.to(glowRef.value, { opacity: 0, duration: 0.3 })
}

function onMouseMove(e) {
  if (!gsap || !btnRef.value) return
  const rect = btnRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  gsap.to(btnRef.value, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' })
  gsap.to(glowRef.value, {
    left: `${(e.clientX - rect.left) / rect.width * 100}%`,
    top: `${(e.clientY - rect.top) / rect.height * 100}%`,
    duration: 0.3,
    ease: 'power2.out',
  })
}
</script>
