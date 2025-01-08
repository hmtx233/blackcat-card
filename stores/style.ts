import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStyleStore = defineStore('style', () => {
  const font = ref('sans')
  const color = ref('#1f2937')
  const textSize = ref(16)
  const gradientStart = ref('#ffffff')
  const gradientEnd = ref('#f3f4f6')

  function updateColor(newColor: string) {
    color.value = newColor
  }

  function updateFont(newFont: string) {
    font.value = newFont
  }

  function updateTextSize(newSize: number) {
    textSize.value = newSize
  }

  function updateGradientStart(newColor: string) {
    gradientStart.value = newColor
  }

  function updateGradientEnd(newColor: string) {
    gradientEnd.value = newColor
  }

  return {
    font,
    color,
    textSize,
    gradientStart,
    gradientEnd,
    updateColor,
    updateFont,
    updateTextSize,
    updateGradientStart,
    updateGradientEnd
  }
})
