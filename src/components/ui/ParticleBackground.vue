<template>
  <canvas ref="canvasRef" class="fixed inset-0 pointer-events-none z-0" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let animationId = null
let particles = []
let mouse = { x: 0, y: 0 }
let ctx = null
let canvas = null

onMounted(() => {
  canvas = canvasRef.value
  if (!canvas) return
  ctx = canvas.getContext('2d')
  resize()
  initParticles()
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMouseMove)
  animate()
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', onMouseMove)
  cancelAnimationFrame(animationId)
})

function resize() {
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function onMouseMove(e) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

function initParticles() {
  particles = []
  const count = Math.min(Math.floor(window.innerWidth * 0.05), 80)
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.3 + 0.1,
      hue: Math.random() * 60 + 230,
    })
  }
}

function animate() {
  if (!ctx || !canvas) return
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (const p of particles) {
    p.x += p.vx
    p.y += p.vy

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1

    const dx = mouse.x - p.x
    const dy = mouse.y - p.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 150) {
      p.vx -= dx * 0.00005
      p.vy -= dy * 0.00005
    }

    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4)
    grad.addColorStop(0, `hsla(${p.hue}, 70%, 60%, ${p.opacity})`)
    grad.addColorStop(1, `hsla(${p.hue}, 70%, 60%, 0)`)

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2)
    ctx.fillStyle = grad
    ctx.fill()
  }

  drawConnections()
  animationId = requestAnimationFrame(animate)
}

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 120) {
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.strokeStyle = `hsla(240, 30%, 60%, ${0.06 * (1 - dist / 120)})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }
  }
}
</script>
