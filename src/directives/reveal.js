// ------------------------------------------------------------------
// v-reveal — lightweight scroll-reveal directive (Vue 3)
// ------------------------------------------------------------------
// Zero-dependency reveal system built on IntersectionObserver.
//
// Usage:
//   v-reveal                                  -> fade-up, no delay
//   v-reveal="'zoom-in'"                      -> variant by name
//   v-reveal="{ variant: 'fade-left', delay: 150 }"
//   v-reveal="{ variant: 'fade-up', delay: 80, duration: 600, distance: 20 }"
//
// Variants (AOS-style naming — "fade-right" slides in from the right):
//   fade-up, fade-down, fade-left, fade-right, zoom-in, fade
//
// Behavior:
//   - Triggers once when the element enters the viewport.
//   - Uses only opacity + transform, so no layout shift / CLS.
//   - Initial hidden state is applied inline in `mounted`, so content
//     stays visible when JS is disabled (no FOUC of invisible content).
//   - Respects prefers-reduced-motion: elements are simply shown.
// ------------------------------------------------------------------

const DEFAULT_VARIANT = 'fade-up'
const DEFAULT_DURATION = 700
const DEFAULT_DISTANCE = 28
const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)'

// distance -> initial transform (elements slide in toward their final spot)
const VARIANTS = {
  'fade-up': (d) => `translateY(${d}px)`,
  'fade-down': (d) => `translateY(${-d}px)`,
  'fade-left': (d) => `translateX(${-d}px)`,
  'fade-right': (d) => `translateX(${d}px)`,
  'zoom-in': () => 'scale(0.92)',
  'fade': () => 'none',
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function parseBinding(binding) {
  const raw = binding.value
  const config = typeof raw === 'string' ? { variant: raw } : { ...raw }
  return {
    variant: config.variant || DEFAULT_VARIANT,
    delay: Number(config.delay) || 0,
    duration: Number(config.duration) || DEFAULT_DURATION,
    distance: Number(config.distance) || DEFAULT_DISTANCE,
  }
}

export const revealDirective = {
  mounted(el, binding) {
    if (prefersReducedMotion()) return

    const { variant, delay, duration, distance } = parseBinding(binding)
    const initialTransform = (VARIANTS[variant] || VARIANTS[DEFAULT_VARIANT])(distance)

    // Apply the hidden state before paint — layout is untouched.
    el.style.opacity = '0'
    el.style.transform = initialTransform
    el.style.willChange = 'opacity, transform'

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry.isIntersecting) return

        observer.disconnect()
        el._revealObserver = null

        // Replacing the hidden state in the next frame animates the change.
        requestAnimationFrame(() => {
          el.style.transition =
            `opacity ${duration}ms ${EASE_OUT} ${delay}ms, ` +
            `transform ${duration}ms ${EASE_OUT} ${delay}ms`
          el.style.opacity = '1'
          el.style.transform = 'none'

          const cleanup = () => {
            el.style.transition = ''
            el.style.willChange = ''
            el.style.opacity = ''
            el.style.transform = ''
            el.removeEventListener('transitionend', cleanup)
          }
          el.addEventListener('transitionend', cleanup, { once: true })
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    )

    observer.observe(el)
    el._revealObserver = observer
  },
  unmounted(el) {
    if (el._revealObserver) {
      el._revealObserver.disconnect()
      el._revealObserver = null
    }
  },
}
