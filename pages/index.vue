<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStyleStore } from '../stores/style'
import { useTemplateStore } from '../stores/template'
import MarkdownIt from 'markdown-it'
import html2canvas from 'html2canvas'

const styleStore = useStyleStore()
const templateStore = useTemplateStore()

// Use storeToRefs for reactive store properties
const { color, font, textSize, gradientStart, gradientEnd } = storeToRefs(styleStore)

const title = ref('')
const content = ref('')
const imageUrl = ref('')
const avatar = ref('')
const qrCode = ref('')

// SSR-safe timestamp initialization
const timestamp = ref('')
onMounted(() => {
  timestamp.value = new Date().toLocaleString()
})

const md = new MarkdownIt()
const parsedContent = computed(() => {
  return content.value ? md.render(content.value) : ''
})
const charCount = computed(() => content.value?.length || 0)

const previewStyles = computed(() => ({
  fontFamily: font.value,
  color: color.value,
  fontSize: `${textSize.value}px`,
  background: `linear-gradient(to bottom right, ${gradientStart.value}, ${gradientEnd.value})`
}))

// Color control with immediate update
watch(color, (newColor) => {
  styleStore.updateColor(newColor)
}, { immediate: true })

// Font size control
watch(textSize, (newSize) => {
  styleStore.updateTextSize(Number(newSize))
}, { immediate: true })

watch(gradientStart, (newColor) => {
  styleStore.updateGradientStart(newColor)
}, { immediate: true })

watch(gradientEnd, (newColor) => {
  styleStore.updateGradientEnd(newColor)
}, { immediate: true })

const selectTemplate = (name: string) => {
  templateStore.setTemplate(name)
}

// Debug log
console.log('Store state:', {
  color: color.value,
  font: font.value,
  textSize: textSize.value,
  gradientStart: gradientStart.value,
  gradientEnd: gradientEnd.value
})

const defaultAvatar = '/image.png'

const defaultImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsBAMAAAB9SEr+AAAAIVBMVEWbm5sAAACJiYl/f3+ZmZmZmZmVlZWVlZWYmJicnJyZmZlacyf7AAAACnRSTlMaAB0gjsZWDhQJmkpueQAABEpJREFUWMOdmD1TIkEQhlsTMNNIya5GJTB0hcAQ0IBQ0WBDVAIijKzLMPMyie7iO9ZgfuV19zbb80Hh7rxVfi37TL/d0+7MDhxtVeftA1Afb6vtn2/Ffi+hUvtnTazDkAOu6mB/INKv77EFbFErwmKqDgcRVYuDkKrHwe5qxHWJsWPYqdcA0/kKFc9fjH3CNzoIMLVY1ybUqKJWM8ZOoIbeI2xZB2srpsEahAMN1iQc1C6jFlOxRV2s5WIdqK2VYm6D1GsV0II0KQpoQZoUBdRjE5egHpu4BPXYwCVjh82wPcEWzbCWYNBQjMWp7Rvj/I6K/w0gTs2wFEL9CJODKDUjUirkWowFDl8saW1YzyPSbcAR1gmC2VJMXcgfaz+/FWInfrCui42t6K8X7h2xQx/DW9XkfIMVHE5rAkEfc4hiNpsydo7Aw8NDbu3UDXeA2NIPxvcSxCJ7xpxZe+dibcQgxLp0L4sjZ9mlyRFzXCLkF1Lu5czE5VOW9a0deHOwguMgmO8SgfvsxYbYK5zEHdKlQoiwptlYCuvMABxGwUyWW1dP+HXnY3seVlKnOLyre8z1khvTwT79YDhjp33r6St7fp4Zkk4cLFyqm1MuPeqSUSnqEDJdDFys5WA0rah/7LHIWFcWNZxbqaViSw3WzRm7QoimC0Uj5PaLMTvVcG3FpHHz4bW1tzRdHIyYoldId/+oMCcYfjSZch2HGIKwa8R7FLk/sn47K3bBA3I663mZXG6LdZ/SzS7HGBhdhuK2neKksdURRmSPEzus2rlQTIOdUeMjxgX5IpdkF6eaXWZkhl3G2IA98vjkso9u0WGf60Op30UYPm64XykCoS8Y4lrM5naNJk1OycWpiUe8B789lr2IA3A9nxCbx9g+DsZYj2sxfnxCo2iwR+VA9p6ffoXO3FKxO8TQ44yFBSWfFDtje+ZcsbZiXJEz6wiREpsjwJ8pttiBDRH4Knts6mEtxtTkuUsVWA3GLnMEfOwzyk2DEcYdcjbxczuAQ6+SJmONEWFxJQ2LJ1awPcUwDcEoF8H6WE191DrYiWA8LehSsCzjKNxR+mDfYO9wLBhVYyDhcFzKiJRTCBb3rGCv0NlgxopLbuFNQnOuvax1ZoOt4Egwvj5gl3jr0FkE1ptg6wqrFipZzKbIvdANlfLSe1d+lk1SLYtyhx3NHuTZrS7t5PYm5xVVsINqEWYfzpLrhmPJWNUiXM2ArvADhXQwNi71R0xLKZxSynHaKN1gHLmrzSgvJjMlhLuxxaMxiunmCcOFiq5V/e9u1WIq5tyt2jFsC6cXw2Dw6m1DfWrHRX/Tux+Oy4ovtoIt9n5M6UUNthdu6F0q5vwNPWrp3wKB/KHaiS8ria9GaS9iia99iS+Zaa+0iS/Qaa/riYcDaUcRiQcfaccsiYc6iUdI6QdW6cdj6Ydx6Ud/6QeNquUOKvkQNf3INv2AOP04OvHw+z+pzcSYE0yz8AAAAABJRU5ErkJggg=='

const defaultQrCode = defaultImage

const avatarUrl = computed(() => avatar.value || defaultImage)
const qrCodeUrl = computed(() => qrCode.value || defaultQrCode)

const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement
  target.src = defaultImage
}

const cardRef = ref<HTMLElement | null>(null)

const shareCard = async () => {
  if (!cardRef.value) return
  
  try {
    const canvas = await html2canvas(cardRef.value)
    
    // Convert canvas to blob
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob as Blob)
      }, 'image/png')
    })

    // Create shareable file
    const file = new File([blob], 'card.png', { type: 'image/png' })

    if (navigator.share) {
      await navigator.share({
        title: title.value || '分享卡片',
        text: content.value,
        files: [file]
      })
    } else {
      // Fallback to download
      const imageUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.download = `${title.value || 'card'}.png`
      link.href = imageUrl
      link.click()
      URL.revokeObjectURL(imageUrl)
    }
  } catch (err) {
    console.error('Share failed:', err)
    // Fallback to download on share error
    try {
      const canvas = await html2canvas(cardRef.value)
      const imageUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = `${title.value || 'card'}.png`
      link.href = imageUrl
      link.click()
    } catch (downloadErr) {
      console.error('Download failed:', downloadErr)
    }
  }
}

const copyCardContent = async () => {
  try {
    await navigator.clipboard.writeText(content.value)
    alert('内容已复制到剪贴板')
  } catch (err) {
    console.error('Copy failed:', err)
  }
}
</script>

<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Left Sidebar -->
    <div class="w-1/5 bg-white p-6 border-r border-gray-200">
      <h2 class="text-xl font-bold mb-6 text-gray-800">卡片模板</h2>
      <div class="space-y-4">
        <button 
          v-for="(template, name) in templateStore.templates" 
          :key="name"
          @click="selectTemplate(name)"
          class="w-full p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          :class="{'ring-2 ring-blue-500': templateStore.currentTemplate === name}"
        >
          <div 
            class="h-24 rounded mb-2"
            :style="{background: `linear-gradient(to bottom right, ${template.gradientStart}, ${template.gradientEnd})`}"
          ></div>
          <span class="font-medium text-gray-700">{{ name }}</span>
        </button>
      </div>
    </div>

    <!-- Center Content -->
    <div class="flex-1 p-6 overflow-auto">
      <div ref="cardRef" class="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden" :style="previewStyles">
        <!-- Card Header -->
        <header class="p-6 border-b border-gray-200 flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <img 
              :src="avatarUrl" 
              class="w-12 h-12 rounded-full object-cover border-2"
              :alt="title || 'Avatar'"
              @error="handleImageError"
            />
            <h2 class="text-xl font-semibold">{{ title }}</h2>
          </div>
          <time class="text-sm text-gray-500">{{ timestamp }}</time>
        </header>

        <!-- Card Content -->
        <main class="p-6 prose max-w-none">
          <div v-html="parsedContent"></div>
        </main>

        <!-- Card Footer -->
        <footer class="p-6 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <img 
                :src="qrCodeUrl" 
                class="w-16 h-16 rounded"
                :alt="title"
                @error="handleImageError"
              />
              <span class="font-medium">{{ charCount }} 字</span>
            </div>
            <div class="flex space-x-2">
              <button 
                @click="copyCardContent"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                复制内容
              </button>
              <button 
                @click="shareCard"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                分享卡片
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>

    <!-- Right Sidebar -->
    <div class="w-1/4 bg-white p-6 border-l border-gray-200 overflow-y-auto">
      <div class="space-y-6">
        <!-- Text Editor Section -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">标题</label>
          <input 
            v-model="title"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="输入标题..."
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            内容 (支持 Markdown)
            <span class="text-gray-500 text-xs ml-2">{{ charCount }} 字</span>
          </label>
          <textarea
            v-model="content"
            rows="8"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 font-mono"
            placeholder="支持 Markdown 语法..."
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">头像 URL</label>
          <input 
            v-model="avatar"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="输入头像链接..."
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">二维码 URL</label>
          <input 
            v-model="qrCode"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="输入二维码链接..."
          />
        </div>

        <!-- Style Controls -->
        <div class="pt-6 border-t">
          <h3 class="text-lg font-medium text-gray-900 mb-4">样式设置</h3>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">渐变开始</label>
            <input 
              type="color" 
              v-model="gradientStart"
              class="w-full h-10 rounded border border-gray-300"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">渐变结束</label>
            <input 
              type="color" 
              v-model="gradientEnd"
              class="w-full h-10 rounded border border-gray-300"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.prose {
  @apply text-gray-900;
}
.prose h1, .prose h2, .prose h3 {
  @apply font-bold mb-4;
}
.prose p {
  @apply mb-4;
}
.prose ul, .prose ol {
  @apply ml-4 mb-4;
}
</style>
