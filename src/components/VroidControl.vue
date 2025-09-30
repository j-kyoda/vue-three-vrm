<script setup>
import { ref } from 'vue'

import * as THREE from 'three'
import { createVRMAnimationClip, VRMLookAtQuaternionProxy } from '@pixiv/three-vrm-animation'

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
  vrma_name: {
    type: String,
    default: 'vrma'
  },
  vrma_url: {
    type: String,
    default: ''
  },
  vrma_data: {
    type: [Object, null],
    default: null
  },
  vrma_autoplay: {
    type: [Boolean, null],
    default: true,
  }
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
    // add LookAt Object
    const lookAtQuatProxy = new VRMLookAtQuaternionProxy(
      vrmModel.value.vrm.lookAt)
    lookAtQuatProxy.name = 'lookAtQuaternionProxy'
    vrmModel.value.vrm.scene.add(lookAtQuatProxy)
    // animation mixer
    const mixer = new THREE.AnimationMixer(
      vrmModel.value.vrm.scene)
    vrmModel.value.setMixer(mixer)
  }
  if ('pose' in data) {
    vrmModel.value.resetPose()
    vrmModel.value.setPose(data.pose)
    vrmModel.value.updatePose()
  }
  if ('expression' in data) {
    vrmModel.value.resetExpression()
    vrmModel.value.importExpression(data.expression)
    vrmModel.value.updateExpression()
  }
  if ('vrma' in data) {
    vrmModel.value.setVrma(data.vrma)

    if (props.vrma_autoplay) {
      // create animation clip
      const clip = createVRMAnimationClip(
        vrmModel.value.vrma, vrmModel.value.vrm)
      vrmModel.value.mixer.stopAllAction()
      vrmModel.value.mixer.clipAction(clip).play()
    }
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
  :vrma_name="vrma_name"
  :vrma_url="vrma_url"
  :vrma_data="vrma_data"
  v-on:loading="cb_loading"
  v-on:loaded="cb_loaded"
  />
</template>
