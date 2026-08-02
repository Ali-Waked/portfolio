<template>
  <div>
    <!-- Main cursor -->
    <div
      ref="cursorRef"
      class="fixed pointer-events-none z-[999] bg-white rounded-full mix-blend-difference -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-300 ease-out"
      :style="{
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
      }"
    />
    <!-- Ring cursor -->
    <div
      ref="ringRef"
      class="fixed pointer-events-none z-[998] rounded-full -translate-x-1/2 -translate-y-1/2 border transition-all duration-300 ease-out"
      :style="{
        left: `${x}px`,
        top: `${y}px`,
        width: `${ringSize}px`,
        height: `${ringSize}px`,
        borderColor: ringColor,
        opacity: ringOpacity,
      }"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(-100)
const y = ref(-100)
const size = ref(8)
const ringSize = ref(40)
const ringColor = ref('rgba(99, 102, 241, 0.3)')
const ringOpacity = ref(0)

const cursorRef = ref(null)
const ringRef = ref(null)

let gsap = null
let mouseX = -100
let mouseY = -100
let ringX = -100
let ringY = -100

onMounted(async () => {
  const module = await import('gsap')
  gsap = module.default

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseenter', onMouseEnter)
  document.addEventListener('mouseleave', onMouseLeave)

  // Hover elements
  document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
    el.addEventListener('mouseenter', onHoverableEnter)
    el.addEventListener('mouseleave', onHoverableLeave)
  })

  ringOpacity.value = 1
  animate()
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseenter', onMouseEnter)
  document.removeEventListener('mouseleave', onMouseLeave)
})

function onMouseMove(e) {
  mouseX = e.clientX
  mouseY = e.clientY
  x.value = mouseX
  y.value = mouseY
}

function onMouseEnter() {
  ringOpacity.value = 1
}

function onMouseLeave() {
  ringOpacity.value = 0
}

function onHoverableEnter() {
  size.value = 16
  ringSize.value = 60
  ringColor.value = 'rgba(99, 102, 241, 0.5)'
}

function onHoverableLeave() {
  size.value = 8
  ringSize.value = 40
  ringColor.value = 'rgba(99, 102, 241, 0.3)'
}

function animate() {
  ringX += (mouseX - ringX) * 0.1
  ringY += (mouseY - ringY) * 0.1

  if (ringRef.value) {
    ringRef.value.style.left = `${ringX}px`
    ringRef.value.style.top = `${ringY}px`
  }

  requestAnimationFrame(animate)
}
</script>
