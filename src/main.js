import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initI18n } from './i18n'
import { revealDirective } from './directives/reveal'
import './assets/styles/main.css'

async function bootstrap() {
  const i18n = await initI18n()
  const app = createApp(App)
  app.use(i18n)
  app.use(router)
  app.directive('reveal', revealDirective)
  app.mount('#app')
}

bootstrap()
