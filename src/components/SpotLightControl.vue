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
  target: {
    type: [Object, null],
    default: null
  },
  distance: {
    type: [Number, null],
    default: null
  },
  angle: {
    type: [Number, null],
    default: null
  },
  penumbra: {
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
    const model = new THREE.SpotLight()
    lightModel.value.setModel(model)
  }
  const model = lightModel.value.getModel()
  if (props.color) {
    const color = new THREE.Color(props.color)
    lightModel.value.setColor(color)
  }
  lightModel.value.setIntensity(props.intensity)
  lightModel.value.setPosition(props.position)
  lightModel.value.setTarget(props.target)
  if (props.distance) {
    model.distance = props.distance
  }
  if (props.angle) {
    model.angle = props.angle
  }
  if (props.penumbra) {
    model.penumbra = props.penumbra
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

watch(() => props.target, () => {
  lightModel.value.setTarget(props.target)
})

watch(() => props.distance, () => {
  const model = lightModel.value.getModel()
  model.distance = props.distance
})

watch(() => props.angle, () => {
  const model = lightModel.value.getModel()
  model.angle = props.angle
})

watch(() => props.penumbra, () => {
  const model = lightModel.value.getModel()
  model.penumbra = props.penumbra
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
