<script setup>
import { onMounted, ref, watch } from 'vue'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { GltfModel } from '@/components/GltfModel.js'

const emits = defineEmits(['loading', 'loaded'])

const props = defineProps({
  url: {
    type: String,
    default: null
  },
  data: {
    type: [Object, null],
    default: null
  },
  name: {
    type: String,
    default: null
  }
})

const gltfModel = ref(null)
gltfModel.value = new GltfModel()


const _loadGltf = async (url) => {
  const loader = new GLTFLoader()
  return await loader.loadAsync(url).then((gltf) => {
    return gltf
  })
}

const loadGltf = async (url) => {
  if (!url) {
    return
  }

  emits('loading', props.name)

  const data = await _loadGltf(url)
  if (data) {
    gltfModel.value.setModel(data)
    emits('loaded', props.name, gltfModel.value)
  } else {
    emits('loaded', props.name, null)
  }
}

const setGltf = (data) => {
  emits('loading', props.name)
  if (data) {
    gltfModel.value.setModel(data)
    emits('loaded', props.name, gltfModel.value)
  } else {
    emits('loaded', props.name, null)
  }
}

onMounted(() => {
  if (props.data != null) {
    setGltf(props.data)
  } else {
    loadGltf(props.url)
  }
})

watch(() => props.data, () => {
  if (props.data != null) {
    setGltf(props.data)
  }
})

watch(() => props.url, () => {
  if (props.url) {
    loadGltf(props.url)
  }
})
</script>

<template>
</template>

<style scoped>
</style>
