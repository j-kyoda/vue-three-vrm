<script setup>
import { ref } from 'vue'

import { VrmModel } from '@/components/VrmModel.js'
import VroidModel from '@/components/VroidModel.vue'

const emit = defineEmits(['loading', 'loaded'])

const props = defineProps({
  model_name: {
    type: String,
    required: true
  },
  expression_name: {
    type: String,
    default: 'expression'
  },
  expression_url: {
    type: String,
    default: ''
  },
  expression_data: {
    type: [Object, null],
    default: null
  },
  pose_name: {
    type: String,
    default: 'pose'
  },
  pose_url: {
    type: String,
    default: ''
  },
  pose_data: {
    type: [Object, null],
    default: null
  },
  vrm_name: {
    type: String,
    default: 'vrm'
  },
  vrm_url: {
    type: String,
    default: ''
  },
  vrm_data: {
    type: [Object, null],
    default: null
  },
})

const vrmModel = ref(null)
vrmModel.value = new VrmModel()


const cb_loading = (name) => {
  //console.log('loading')
  emit('loading', name)
}

const cb_loaded = (name, data) => {
  //console.log('loaded')
  if ('vrm' in data) {
    vrmModel.value.setModel(data.vrm)
  }
  if ('pose' in data) {
    vrmModel.value.setPose(data.pose)
    vrmModel.value.updatePose()
  }
  if ('expression' in data) {
    vrmModel.value.importExpression(data.expression)
    vrmModel.value.updateExpression()
  }
  emit('loaded', name, vrmModel.value)
}
</script>

<template>
<VroidModel
  :name="model_name"
  :expression_name="expression_name"
  :expression_url="expression_url"
  :expression_data="expression_data"
  :pose_name="pose_name"
  :pose_url="pose_url"
  :pose_data="pose_data"
  :vrm_name="vrm_name"
  :vrm_url="vrm_url"
  :vrm_data="vrm_data"
  v-on:loading="cb_loading"
  v-on:loaded="cb_loaded"
  />
</template>
