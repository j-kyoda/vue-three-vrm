<script setup>
import { onMounted, watch } from 'vue'

import { ResourceLoader } from '@/components/ResourceLoader.js'

const emits = defineEmits(['loading', 'loaded'])

const props = defineProps({
  command: {
    type: String
  },
  name: {
    type: String
  },
  url: {
    type: String
  },
  data: {
    type: [Object, null],
    default: null
  },
})


const loadPose = async (url) => {
  if (!url) {
    return
  }
  emits('loading', props.name, props.command)
  const loader = new ResourceLoader()
  const data = await loader.fetchPose(url)
  let is_ok = false
  if (data) {
    is_ok = true
  }
  emits('loaded', props.name, props.command, is_ok, data)
}

const setPose = (data) => {
  emits('loading', props.name, props.command)
  let is_ok = false
  if (data) {
    is_ok = true
  }
  emits('loaded', props.name, props.command, is_ok, data)
}

onMounted(async () => {
  if (props.data != null) {
    setPose(props.data)
  } else {
    loadPose(props.url)
  }
})

watch(() => props.data, () => {
  if (props.data != null) {
    setPose(props.data)
  }
})

watch(() => props.url, () => {
  if (props.url) {
    loadPose(props.url)
  }
})
</script>

<template>
</template>

<style scoped>
</style>
