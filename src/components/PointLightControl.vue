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
  },
  position: {
    type: [Object, null],
    default: null
  },
  distance: {
    type: [Number, null],
    default: null
  },
  decay: {
    type: [Number, null],
    default: null
  },
})

const lightModel = ref(null)
lightModel.value = new LightModel()

onMounted(() => {
  emits('loading', props.name)
  if (!lightModel.value.getModel()) {
    const model = new THREE.PointLight()
    lightModel.value.setModel(model)
  }
  const model = lightModel.value.getModel()
  if (props.color) {
    const color = new THREE.Color(props.color)
    lightModel.value.setColor(color)
  }
  lightModel.value.setIntensity(props.intensity)
  lightModel.value.setPosition(props.position)
  if (props.distance) {
    model.distance = props.distance
  }
  if (props.decay) {
    model.decay = props.decay
  }
  emits('loaded', props.name, lightModel.value)
})

watch(() => props.color, () => {
  const color = new THREE.Color(props.color)
  lightModel.value.setColor(color)
})

watch(() => props.intensity, () => {
  lightModel.value.setIntensity(props.intensity)
})

watch(() => props.position, () => {
  lightModel.value.setPosition(props.position)
})

watch(() => props.distance, () => {
  const model = lightModel.value.getModel()
  model.distance = props.distance
})

watch(() => props.decay, () => {
  const model = lightModel.value.getModel()
  model.decay = props.decay
})
</script>

<template>
</template>

<style scoped>
</style>
