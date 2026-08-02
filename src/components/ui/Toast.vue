<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0 translate-y-4 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-4 scale-95"
    >
      <div
        v-if="toast.visible"
        :role="toast.type === 'error' ? 'alert' : 'status'"
        :aria-live="toast.type === 'error' ? 'assertive' : 'polite'"
        class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md"
      >
        <div class="glass rounded-2xl p-4 relative shadow-2xl shadow-black/40" :class="borderClass">
          <div class="flex items-start gap-3">
            <span class="shrink-0 w-9 h-9 rounded-full flex items-center justify-center" :class="iconBgClass">
              <!-- Success check -->
              <svg v-if="toast.type === 'success'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
              <!-- Error alert -->
              <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4m0 4h.01" />
              </svg>
            </span>
            <div class="min-w-0 pt-0.5">
              <p class="text-sm font-semibold text-dark-text">{{ toast.title }}</p>
              <p class="text-sm text-dark-muted mt-0.5 leading-relaxed">{{ toast.message }}</p>
            </div>
          </div>

          <button
            type="button"
            class="absolute end-3 top-3 w-8 h-8 rounded-full flex items-center justify-center text-dark-muted/60 hover:text-dark-text hover:bg-white/5 transition-colors duration-300"
            :aria-label="t('contact.toast.close')"
            @click="hideToast"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from '@/composables/useToast'

const { t } = useI18n()
const { toast, hideToast } = useToast()

const borderClass = computed(() =>
  toast.type === 'success'
    ? 'border-emerald-400/20'
    : 'border-rose-400/25'
)

const iconBgClass = computed(() =>
  toast.type === 'success'
    ? 'bg-emerald-400/10 text-emerald-400'
    : 'bg-rose-400/10 text-rose-400'
)
</script>
