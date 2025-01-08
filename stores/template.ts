import { defineStore } from 'pinia'
import { useStyleStore } from './style'

interface TemplateStyle {
  gradientStart: string
  gradientEnd: string
  font: string
  color: string
  textSize: number
}

type TemplateName = 'modern' | 'classic'

export const useTemplateStore = defineStore('template', {
  state: () => ({
    currentTemplate: 'modern' as TemplateName,
    templates: {
      modern: {
        gradientStart: '#ffffff',
        gradientEnd: '#f3f4f6',
        font: 'sans',
        color: '#1f2937',
        textSize: 16
      },
      classic: {
        gradientStart: '#fef3c7',
        gradientEnd: '#fde68a', // Added missing gradientEnd
        font: 'serif',
        color: '#292524',
        textSize: 18
      }
    } as Record<TemplateName, TemplateStyle>
  }),
  
  actions: {
    setTemplate(name: TemplateName) {
      this.currentTemplate = name
      const template = this.templates[name]
      const styleStore = useStyleStore()
      // Update all style properties
      styleStore.updateFont(template.font)
      styleStore.updateColor(template.color)
      styleStore.updateTextSize(template.textSize)
      styleStore.updateGradientStart(template.gradientStart)
      styleStore.updateGradientEnd(template.gradientEnd)
    }
  }
})
