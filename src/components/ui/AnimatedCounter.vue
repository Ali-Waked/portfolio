<template>
  <div ref="containerRef" class="text-center">
    <div class="text-4xl md:text-5xl font-bold font-display gradient-text">
      <span ref="counterRef">0</span>
      <span v-if="suffix" class="text-2xl md:text-3xl">{{ suffix }}</span>
    </div>
    <div class="text-sm text-dark-muted mt-1 font-medium tracking-wide uppercase">
      {{ label }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  value: { type: [Number, String], required: true },
  label: { type: String, required: true },
  suffix: { type: String, default: '' },
  duration: { type: Number, default: 2 },
})

const containerRef = ref(null)
const counterRef = ref(null)

let gsap = null
let ScrollTrigger = null
let animated = false

onMounted(async () => {
  if (typeof props.value === 'string') {
    counterRef.value.textContent = props.value
    return
  }

  const module = await import('gsap')
  gsap = module.default
  const { ScrollTrigger: ST } = await import('gsap/ScrollTrigger')
  ScrollTrigger = ST
  gsap.registerPlugin(ScrollTrigger)

  ScrollTrigger.create({
    trigger: containerRef.value,
    start: 'top 85%',
    onEnter: () => animateCounter(),
  })
})

function animateCounter() {
  if (animated) return
  animated = true

  if (!gsap || !counterRef.value) return

  const obj = { val: 0 }
  gsap.to(obj, {
    val: props.value,
    duration: props.duration,
    ease: 'power3.out',
    onUpdate: () => {
      counterRef.value.textContent = Math.floor(obj.val)
    },
  })
}
</script>
