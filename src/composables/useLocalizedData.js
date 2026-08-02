import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { projects } from '@/data/projects'
import { skillCategories } from '@/data/skills'
import { services } from '@/data/services'
import { experience } from '@/data/experience'
import { certificates } from '@/data/certificates'
import { useLocalizedTech, useLocalizedMessages } from './useLocale'

export function useProjects() {
  const { t } = useI18n()
  const localizeTech = useLocalizedTech()
  const messages = useLocalizedMessages()

  return computed(() =>
    projects.map((p) => {
      const loc = messages.value.projects?.[p.slug] || {}
      return {
        ...p,
        title: t(`projects.${p.slug}.title`),
        category: t(`projects.${p.slug}.category`),
        description: t(`projects.${p.slug}.description`),
        overview: loc.overview ?? p.overview,
        highlights: loc.highlights ?? p.highlights,
        metrics: loc.metrics ?? p.metrics,
        features: loc.features ?? p.features,
        statusLabel: t(`status.${p.status === 'Completed' ? 'completed' : 'portfolio'}`),
        technologies: p.technologies.map((name) => localizeTech(name)),
      }
    })
  )
}

export function useSkillCategories() {
  const { t } = useI18n()
  const localizeTech = useLocalizedTech()

  return computed(() =>
    skillCategories.map((cat) => ({
      ...cat,
      name: t(`skills.categories.${cat.key}.title`),
      description: t(`skills.categories.${cat.key}.description`),
      skills: cat.skills.map((s) => ({ ...s, name: localizeTech(s.name) })),
    }))
  )
}

export function useServices() {
  const { t } = useI18n()
  return computed(() =>
    services.map((s) => ({
      ...s,
      title: t(`services.${s.id}.title`),
      description: t(`services.${s.id}.description`),
    }))
  )
}

export function useExperience() {
  const { t } = useI18n()
  const localizeTech = useLocalizedTech()
  const messages = useLocalizedMessages()

  return computed(() =>
    experience.map((exp) => ({
      ...exp,
      role: t(`experience.${exp.id}.role`),
      period: t(`experience.${exp.id}.period`),
      description: t(`experience.${exp.id}.description`),
      achievements: exp.achievements
        ? messages.value.experience?.[exp.id]?.achievements
        : undefined,
      technologies: exp.technologies
        ? exp.technologies.map((name) => localizeTech(name))
        : undefined,
    }))
  )
}

export function useCertificates() {
  const { t } = useI18n()
  return computed(() =>
    certificates.map((c) => ({
      ...c,
      title: t(`certificates.${c.id}.title`),
      issuer: t(`certificates.${c.id}.issuer`),
      description: t(`certificates.${c.id}.description`),
    }))
  )
}

export function projectPath(p) {
  const slug = (p.slug || String(p.id)).toLowerCase()
  return `/projects/${slug.charAt(0).toUpperCase()}${slug.slice(1)}`
}

/**
 * Label key for a project's primary repo link. Projects with a separate
 * frontend repo show "Backend Repo"; single-repo projects show a plain
 * "GitHub Repo" label instead.
 */
export function projectRepoLabel(project) {
  return project.githubFrontend ? 'projectDetail.backendRepo' : 'projectDetail.gitHubRepo'
}
