<template>
  <span ref="textRef" class="split-text inline">
    <span
      v-for="(char, index) in chars"
      :key="index"
      :ref="el => { if (el) charRefs[index] = el }"
      class="inline-block"
    >{{ char === ' ' ? '\u00A0' : char }}</span>
  </span>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  delay: { type: Number, default: 0 },
  stagger: { type: Number, default: 0.02 },
  duration: { type: Number, default: 0.5 },
  once: { type: Boolean, default: true },
})

const emit = defineEmits(['complete'])

const textRef = ref(null)
const charRefs = ref({})
const chars = ref([])

let gsap = null
let animated = false

onMounted(async () => {
  const module = await import('gsap')
  gsap = module.default
  chars.value = props.text.split('')

  await nextTick()

  if (props.once) {
    animateIn()
  }
})

watch(() => props.text, () => {
  chars.value = props.text.split('')
  nextTick(() => {
    if (!animated) animateIn()
  })
})

function animateIn() {
  if (!gsap || animated) return
  animated = true

  const els = Object.values(charRefs.value).filter(Boolean)
  if (els.length === 0) return

  gsap.fromTo(
    els,
    { opacity: 0, y: 30, rotateX: -90 },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: props.duration,
      stagger: props.stagger,
      delay: props.delay,
      ease: 'back.out(1.7)',
      onComplete: () => emit('complete'),
    }
  )
}

defineExpose({ animateIn })
</script>
