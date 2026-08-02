import { reactive } from 'vue'

// ------------------------------------------------------------------
// Minimal, app-wide toast state. Module-scoped reactive state means a
// single <Toast /> mounted in App.vue can be triggered from anywhere.
// ------------------------------------------------------------------

const state = reactive({
  visible: false,
  type: 'success',
  title: '',
  message: '',
})

let timeoutId = null

export function useToast() {
  /**
   * Show a toast notification that auto-dismisses after `duration` ms.
   * Calling again while visible replaces the current toast and restarts
   * the auto-dismiss timer.
   */
  function showToast({ type = 'success', title = '', message = '', duration = 5000 } = {}) {
    if (timeoutId) clearTimeout(timeoutId)
    state.type = type
    state.title = title
    state.message = message
    state.visible = true
    timeoutId = setTimeout(() => {
      state.visible = false
      timeoutId = null
    }, duration)
  }

  /** Immediately hide the toast (e.g. via its close button). */
  function hideToast() {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = null
    state.visible = false
  }

  return { toast: state, showToast, hideToast }
}
