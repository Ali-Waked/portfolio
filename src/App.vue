<template>
  <div class="relative min-h-screen bg-dark-bg text-dark-text overflow-hidden">
    <LoadingScreen v-if="showLoader" @loaded="onLoaded" />

    <template v-if="!showLoader">
      <AppCursor />
      <AppNav />
      <ParticleBackground />

      <main>
        <router-view v-slot="{ Component }">
          <Transition
            enter-active-class="transition-all duration-700 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
          >
            <component :is="Component" />
          </Transition>
        </router-view>
      </main>

      <AppFooter />

      <Toast />
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import AppCursor from '@/components/layout/AppCursor.vue'
import AppNav from '@/components/layout/AppNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import ParticleBackground from '@/components/ui/ParticleBackground.vue'
import Toast from '@/components/ui/Toast.vue'

const showLoader = ref(true)

function onLoaded() {
  showLoader.value = false
}
</script>
