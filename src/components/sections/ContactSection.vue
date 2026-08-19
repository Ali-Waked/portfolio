<template>
  <section id="contact" class="relative py-8 md:py-12 overflow-hidden">
    <!-- Background gradient -->
    <div class="absolute inset-0 bg-gradient-to-b from-dark-bg via-primary-500/5 to-dark-bg pointer-events-none" />

    <div class="section-container relative z-10">
      <div v-reveal="'fade-up'" class="mb-16 md:mb-20">
        <p class="text-xs font-mono text-primary-400 tracking-[0.3em] uppercase mb-4">{{ t('contact.kicker') }}</p>
        <h2 class="section-title">
          {{ t('contact.title1') }} <span class="gradient-text">{{ t('contact.title2') }}</span>
        </h2>
        <div class="w-16 h-[2px] bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mt-4" />
      </div>

      <div class="grid lg:grid-cols-2 gap-12 lg:gap-20">
        <!-- Left - Info -->
        <div v-reveal="{ variant: 'fade-left', delay: 80 }" class="space-y-8">
          <p class="text-lg text-dark-muted leading-relaxed">
            {{ t('contact.intro') }}
          </p>

          <!-- Contact details -->
          <div class="space-y-4">
            <a
              :href="`mailto:${profile.email}`"
              class="flex items-center gap-4 p-4 glass rounded-xl hover:border-primary-500/30 transition-all duration-300 group"
            >
              <div class="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                <svg class="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p class="text-xs text-dark-muted">{{ t('contact.email') }}</p>
                <p class="text-sm text-dark-text font-medium">{{ profile.email }}</p>
              </div>
            </a>

            <a
              :href="profile.social.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-4 p-4 glass rounded-xl hover:border-primary-500/30 transition-all duration-300 group"
            >
              <div class="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                <svg class="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </div>
              <div>
                <p class="text-xs text-dark-muted">{{ t('contact.linkedin') }}</p>
                <p class="text-sm text-dark-text font-medium">{{ t('contact.linkedinSub') }}</p>
              </div>
            </a>

            <a
              :href="profile.social.github"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-4 p-4 glass rounded-xl hover:border-primary-500/30 transition-all duration-300 group"
            >
              <div class="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                <svg class="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </div>
              <div>
                <p class="text-xs text-dark-muted">{{ t('contact.github') }}</p>
                <p class="text-sm text-dark-text font-medium">{{ t('contact.githubSub') }}</p>
              </div>
            </a>

            <a
              :href="cvUrl"
              download
              class="flex items-center gap-4 p-4 glass rounded-xl hover:border-primary-500/30 transition-all duration-300 group"
            >
              <div class="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                <svg class="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p class="text-xs text-dark-muted">{{ t('contact.downloadCv') }}</p>
                <p class="text-sm text-dark-text font-medium">{{ t('contact.downloadCvSub') }}</p>
              </div>
            </a>

            <div class="flex items-center gap-4 p-4 glass rounded-xl">
              <div class="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                <svg class="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p class="text-xs text-dark-muted">{{ t('contact.location') }}</p>
                <p class="text-sm text-dark-text font-medium">{{ profile.location }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right - Contact Form -->
        <div v-reveal="{ variant: 'fade-right', delay: 100 }">
          <form
            novalidate
            class="glass rounded-2xl p-6 md:p-8 space-y-5"
            @submit.prevent="handleSubmit"
          >
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label for="contact-name" class="block text-xs font-medium text-dark-muted mb-1.5">{{ t('contact.form.name') }}</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  ref="nameInput"
                  v-model="form.name"
                  autocomplete="name"
                  required
                  :disabled="sending"
                  :aria-invalid="fieldErrors.name ? 'true' : 'false'"
                  :aria-describedby="fieldErrors.name ? 'contact-name-error' : undefined"
                  :class="inputClass(!!fieldErrors.name)"
                  :placeholder="t('contact.form.namePlaceholder')"
                  @input="validateField('name')"
                />
                <p v-if="fieldErrors.name" id="contact-name-error" role="alert" class="mt-1.5 text-xs text-rose-400">
                  {{ t(`contact.fieldErrors.${fieldErrors.name}`) }}
                </p>
              </div>
              <div>
                <label for="contact-email" class="block text-xs font-medium text-dark-muted mb-1.5">{{ t('contact.form.email') }}</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  v-model="form.email"
                  autocomplete="email"
                  required
                  :disabled="sending"
                  :aria-invalid="fieldErrors.email ? 'true' : 'false'"
                  :aria-describedby="fieldErrors.email ? 'contact-email-error' : undefined"
                  :class="inputClass(!!fieldErrors.email)"
                  :placeholder="t('contact.form.emailPlaceholder')"
                  @input="validateField('email')"
                />
                <p v-if="fieldErrors.email" id="contact-email-error" role="alert" class="mt-1.5 text-xs text-rose-400">
                  {{ t(`contact.fieldErrors.${fieldErrors.email}`) }}
                </p>
              </div>
            </div>
            <div>
              <label for="contact-subject" class="block text-xs font-medium text-dark-muted mb-1.5">{{ t('contact.form.subject') }}</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                v-model="form.subject"
                autocomplete="off"
                required
                :disabled="sending"
                :aria-invalid="fieldErrors.subject ? 'true' : 'false'"
                :aria-describedby="fieldErrors.subject ? 'contact-subject-error' : undefined"
                :class="inputClass(!!fieldErrors.subject)"
                :placeholder="t('contact.form.subjectPlaceholder')"
                @input="validateField('subject')"
              />
              <p v-if="fieldErrors.subject" id="contact-subject-error" role="alert" class="mt-1.5 text-xs text-rose-400">
                {{ t(`contact.fieldErrors.${fieldErrors.subject}`) }}
              </p>
            </div>
            <div>
              <label for="contact-message" class="block text-xs font-medium text-dark-muted mb-1.5">{{ t('contact.form.message') }}</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                v-model="form.message"
                required
                :disabled="sending"
                :aria-invalid="fieldErrors.message ? 'true' : 'false'"
                :aria-describedby="fieldErrors.message ? 'contact-message-error' : undefined"
                :class="[inputClass(!!fieldErrors.message), 'resize-none']"
                :placeholder="t('contact.form.messagePlaceholder')"
                @input="validateField('message')"
              ></textarea>
              <p v-if="fieldErrors.message" id="contact-message-error" role="alert" class="mt-1.5 text-xs text-rose-400">
                {{ t(`contact.fieldErrors.${fieldErrors.message}`) }}
              </p>
            </div>

            <!-- Honeypot spam trap — hidden from humans and screen readers -->
            <div class="sr-only" aria-hidden="true">
              <label for="contact-website">{{ t('contact.honeypot.label') }}</label>
              <input
                id="contact-website"
                type="text"
                name="website"
                v-model="honeypot"
                tabindex="-1"
                autocomplete="off"
              />
            </div>

            <p v-if="formError" id="contact-form-error" role="alert" class="text-xs text-rose-400">
              {{ formError }}
            </p>

            <MagneticButton variant="primary" type="submit" :disabled="sending" :aria-busy="sending ? 'true' : 'false'">
              <template v-if="sending">
                <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {{ t('contact.form.sending') }}
              </template>
              <template v-else>
                {{ t('contact.form.send') }}
                <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </template>
            </MagneticButton>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { profile } from '@/data/profile'
import MagneticButton from '@/components/ui/MagneticButton.vue'
import cvUrl from '@/assets/files/Ali_Abu_Waked_Resume.pdf'
import { useEmail, validateContactForm, isCooldownActive } from '@/composables/useEmail'
import { useToast } from '@/composables/useToast'

const { t } = useI18n()
const { sending, send } = useEmail()
const { showToast } = useToast()

const form = reactive({ name: '', email: '', subject: '', message: '' })
const fieldErrors = ref({})
const formError = ref('')
const honeypot = ref('')
const nameInput = ref(null)

function inputClass(hasError) {
  return [
    'w-full px-4 py-2.5 rounded-xl bg-dark-surface border text-sm text-dark-text placeholder-dark-muted/40 focus:outline-none focus:ring-1 transition-all duration-300',
    hasError
      ? 'border-rose-400/50 focus:border-rose-400/60 focus:ring-rose-400/20'
      : 'border-dark-border focus:border-primary-500/50 focus:ring-primary-500/20',
  ]
}

function validateField(field) {
  const { errors } = validateContactForm(form)
  fieldErrors.value[field] = errors[field]
  if (!errors[field]) formError.value = ''
  return !errors[field]
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
  fieldErrors.value = {}
  formError.value = ''
  nameInput.value?.focus()
}

async function handleSubmit() {
  if (sending.value) return

  // Honeypot filled → treat as a bot and silently "succeed" without sending.
  if (honeypot.value) {
    resetForm()
    showToast({
      type: 'success',
      title: t('contact.toast.successTitle'),
      message: t('contact.toast.success'),
    })
    return
  }

  const { valid, errors } = validateContactForm(form)
  fieldErrors.value = errors
  if (!valid) return

  // Minimum delay between submissions (spam protection).
  if (isCooldownActive()) {
    formError.value = t('contact.fieldErrors.cooldown')
    return
  }

  const result = await send({ ...form })

  if (result.ok) {
    resetForm()
    showToast({
      type: 'success',
      title: t('contact.toast.successTitle'),
      message: t('contact.toast.success'),
    })
  } else {
    showToast({
      type: 'error',
      title: t('contact.toast.errorTitle'),
      message: t('contact.toast.error'),
    })
  }
}
</script>
