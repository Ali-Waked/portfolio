import { onMounted, onUnmounted } from 'vue'

export function useGsap() {
  let gsap = null
  let ScrollTrigger = null
  let ctx = null

  onMounted(async () => {
    const module = await import('gsap')
    gsap = module.default
    const { ScrollTrigger: ST } = await import('gsap/ScrollTrigger')
    ScrollTrigger = ST
    gsap.registerPlugin(ScrollTrigger)
  })

  onUnmounted(() => {
    if (ctx) {
      ctx.revert()
    }
  })

  async function getGsap() {
    if (!gsap) {
      const module = await import('gsap')
      gsap = module.default
      const { ScrollTrigger: ST } = await import('gsap/ScrollTrigger')
      ScrollTrigger = ST
      gsap.registerPlugin(ScrollTrigger)
    }
    return { gsap, ScrollTrigger }
  }

  return { getGsap }
}
