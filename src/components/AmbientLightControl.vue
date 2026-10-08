<script setup>
import { onMounted, ref, watch } from 'vue'

import * as THREE from 'three'

import { LightModel } from '@/components/LightModel.js'

const emits = defineEmits(['loading', 'loaded', 'error'])

const props = defineProps({
  name: {
    type: String,
    default: null
  },
  color: {
    type: [String, Number, null],
    default: null
  },
  intensity: {
    type: [Number, null],
    default: null
  }
})

const lightModel = ref(null)
lightModel.value = new LightModel()

onMounted(() => {
  emits('loading', props.name)
  if (!lightModel.value.getModel()) {
    const model = new THREE.AmbientLight()
    lightModel.value.setModel(model)
  }
  if (props.color) {
    const color = new THREE.Color(props.color)
    lightModel.value.setColor(color)
  }
  lightModel.value.setIntensity(props.intensity)
  emits('loaded', props.name, lightModel.value)
})

watch(() => props.color, () => {
  const color = new THREE.Color(props.color)
  lightModel.value.setColor(color)
})

watch(() => props.intensity, () => {
  lightModel.value.setIntensity(props.intensity)
})
</script>

<template>
</template>

<style scoped>
</style>
