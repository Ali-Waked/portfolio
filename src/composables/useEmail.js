import { ref } from 'vue'

// ------------------------------------------------------------------
// EmailJS service + contact-form helpers
// ------------------------------------------------------------------
// Configuration is injected through Vite environment variables so no
// credentials are hardcoded in the source code. Only the EmailJS
// Public Key, Service ID and Template IDs are required — all four are
// safe to ship to the browser (see `.env.example` for where to get them
// from the EmailJS dashboard).
//
// Two templates are used:
//   1. CONTACT  -> notifies the portfolio owner about a new message.
//   2. REPLY    -> auto thank-you reply sent back to the visitor.
// ------------------------------------------------------------------

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || ''
const EMAILJS_CONTACT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || ''
const EMAILJS_REPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_REPLY_TEMPLATE_ID || ''

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_NAME_LENGTH = 2
const MIN_MESSAGE_LENGTH = 10

// Minimum time (ms) that must pass between two real submissions.
const SUBMIT_COOLDOWN_MS = 10_000

let lastSubmitAt = 0

/**
 * Validate the contact form fields.
 * Returns { valid, errors } where each error value is a translation key
 * (nested under `contact.fieldErrors`) so messages stay localized.
 */
export function validateContactForm(form = {}) {
  const name = (form.name || '').trim()
  const email = (form.email || '').trim()
  const subject = (form.subject || '').trim()
  const message = (form.message || '').trim()

  const errors = {}

  if (!name) errors.name = 'nameRequired'
  else if (name.length < MIN_NAME_LENGTH) errors.name = 'nameMin'

  if (!email) errors.email = 'emailRequired'
  else if (!EMAIL_REGEX.test(email)) errors.email = 'emailInvalid'

  if (!subject) errors.subject = 'subjectRequired'

  if (!message) errors.message = 'messageRequired'
  else if (message.length < MIN_MESSAGE_LENGTH) errors.message = 'messageMin'

  return { valid: Object.keys(errors).length === 0, errors }
}

/**
 * True when the user is still inside the minimum delay between
 * submissions (spam protection).
 */
export function isCooldownActive(now = Date.now()) {
  return now - lastSubmitAt < SUBMIT_COOLDOWN_MS
}

/**
 * Reusable email sending logic for the contact form.
 */
export function useEmail() {
  const sending = ref(false)

  /**
   * Send the contact message through EmailJS.
   * The SDK is loaded on demand so it is code-split out of the main bundle.
   *
   * The notification email is the source of truth: if it fails the whole
   * submission fails. The visitor auto-reply is best-effort — a reply
   * failure is logged but never surfaces as a form error, so the visitor
   * always sees a success state once the owner has been notified.
   *
   * @returns {Promise<{ok: boolean, error?: Error}>}
   */
  async function send({ name, email, subject, message }) {
    // Guard against double submissions while a request is in flight.
    if (sending.value) return { ok: false, cancelled: true }

    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_CONTACT_TEMPLATE_ID || !EMAILJS_REPLY_TEMPLATE_ID) {
      return {
        ok: false,
        error: new Error('EmailJS is not configured. Check your .env file.'),
      }
    }

    sending.value = true
    try {
      const emailjs = await import('@emailjs/browser')

      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY })

      // 1) Notify the portfolio owner.
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CONTACT_TEMPLATE_ID, {
        from_name: name,
        from_email: email,
        reply_to: email,
        subject,
        message,
      })

      // 2) Send the visitor an automatic thank-you reply.
      try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_REPLY_TEMPLATE_ID, {
          from_name: name,
          from_email: email,
        })
      } catch (replyError) {
        // Non-fatal: the owner still received the message.
        // eslint-disable-next-line no-console
        console.warn('EmailJS auto-reply failed:', replyError)
      }

      lastSubmitAt = Date.now()
      return { ok: true }
    } catch (error) {
      return { ok: false, error }
    } finally {
      sending.value = false
    }
  }

  return { sending, send }
}
