<template>
  <div class="relative">
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
    <ExperienceSection />
    <ServicesSection />
    <CertificatesSection />
    <ContactSection />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import CertificatesSection from '@/components/sections/CertificatesSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'

const SkillsSection = defineAsyncComponent(() => import('@/components/sections/SkillsSection.vue'))
</script>
