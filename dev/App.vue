<script setup>
import { ref } from 'vue'

import * as THREE from 'three'
import { VRMHumanBoneName } from '@pixiv/three-vrm'

import VroidControl from '@/components/VroidControl.vue'
import ThreeFrame from '@/components/ThreeFrame.vue'

// callback unit list
const cb_funcs = []

// property for ThreeFrame
const render_context = ref(null)
const render_ready = ref(false)
const animation = ref(false)

// property for VroidControl
const model_name = 'chico_hoodie'
const expression_name = 'chico_surprised'
const expression_url = 'expressions/chico_expression_goodjob_202506.json'
const pose_name = 'chico_pose_s'
const pose_url = 'poses/chico_pose_goodjob_202506.json'
const vrm_name = 'chico_hoodie'
const vrm_url = 'models/chico_hoodie.vrm'


const cb_regist = (cbModule) => {
  // register callback
  cb_funcs.push(cbModule)
}

const cb_exec = (cbType, ...args) => {
  // execute callback
  for (const cbModule of cb_funcs) {
    if (cbType in cbModule) {
      if (cbModule[cbType] instanceof Function) {
        cbModule[cbType](...args)
      }
    }
  }
}

const cb_init = async (context) => {
  // save context
  render_context.value = context
  // callback for 'init'
  cb_exec('init', context)
}

const cb_animate = (context) => {
  // callback for 'animate'
  cb_exec('animate', context)
}

const cb_loading = (name) => {
  // callback for 'loading'
  const context = render_context.value
  cb_exec('loading', context, name)
}

const cb_loaded = (name, vrm_model) => {
  // callback for 'loaded'
  const context = render_context.value
  cb_exec('loaded', context, name, vrm_model)
}

cb_regist({
  'init': (context) => {
    render_ready.value = true
    animation.value = true
  },
  'loaded': (context, name, vrm_model) => {
    // remove model from scene if exists
    const current = context.scene.getObjectByName(name)
    if (current) {
      context.scene.remove(current)
    }
    // add model to scene
    const model = vrm_model.scene
    model.name = name
    vrm_model.setPosition({
      x: 0.0,
      y: 0.0,
      z: 0.0,
    })
    context.scene.add(model)

    // move camera
    const node = vrm_model.getBoneNode(VRMHumanBoneName.Head)
    if (node) {
      const bonePos = new THREE.Vector3()
      node.getWorldPosition(bonePos)
      context.camera.position.set(bonePos.x,
                                  bonePos.y,
                                  1.0)
      context.controls.target.set(bonePos.x,
                                  bonePos.y,
                                  bonePos.z)
      context.controls.update()
    }
  }
})
</script>

<template>
<div class="frame">
  <ThreeFrame
    :animation="animation"
    :useOrbitControls="true"
    :useGridHelper="true"
    :useAxesHelper="false"
    :useDefaultLight="true"
    v-on:init="cb_init"
    v-on:animate="cb_animate"
    />
</div>
<div v-if="render_ready">
  <VroidControl
    :model_name="model_name"
    :expression_name="expression_name"
    :expression_url="expression_url"
    :pose_name="pose_name"
    :pose_url="pose_url"
    :vrm_name="vrm_name"
    :vrm_url="vrm_url"
    v-on:loading="cb_loading"
    v-on:loaded="cb_loaded"
    />
</div>
</template>

<style scoped>
.frame {
  padding-left: 0;
  padding-right: 0;
  margin-left: auto;
  margin-right: auto;
  display: block;
  width: 320px;
  height: 320px;
}
</style>
