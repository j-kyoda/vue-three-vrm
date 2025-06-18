<script setup>
import { inject, onMounted, watch } from 'vue'

import { ResourceLoader } from '@/components/ResourceLoader.js'

const axios = inject('axios')

const emit = defineEmits(['loading', 'loaded'])

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


const loadExpression = async (url) => {
  if (!url) {
    return
  }
  emit('loading', props.name, props.command)
  const loader = new ResourceLoader()
  const data = await loader.loadExpression(axios, url)
  let is_ok = false
  if (data) {
    is_ok = true
  }
  emit('loaded', props.name, props.command, is_ok, data)
}

const setExpression = (data) => {
  emit('loading', props.name, props.command)
  let is_ok = false
  if (data) {
    is_ok = true
  }
  emit('loaded', props.name, props.command, is_ok, data)
}

onMounted(async () => {
  if (props.data != null) {
    setExpression(props.data)
  } else {
    loadExpression(props.url)
  }
})

watch(() => props.data, () => {
  if (props.data != null) {
    setExpression(props.data)
  }
})

watch(() => props.url, () => {
  if (props.url) {
    loadExpression(props.url)
  }
})
</script>

<template>
</template>

<style scoped>
</style>
