import { ref, onMounted, onUnmounted } from 'vue'

export function useMousePosition() {
  const x = ref(0)
  const y = ref(0)
  const normalizedX = ref(0)
  const normalizedY = ref(0)

  function update(e) {
    x.value = e.clientX
    y.value = e.clientY
    normalizedX.value = (e.clientX / window.innerWidth) * 2 - 1
    normalizedY.value = (e.clientY / window.innerHeight) * 2 - 1
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y, normalizedX, normalizedY }
}
