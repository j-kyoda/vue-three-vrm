<script setup>
import { onMounted, watch } from 'vue'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { VRMLoaderPlugin } from '@pixiv/three-vrm'
import { VRMUtils } from '@pixiv/three-vrm'

const emits = defineEmits(['loading', 'loaded'])

const props = defineProps({
  url: {
    type: String
  },
  data: {
    type: [Object, null],
    default: null
  },
  name: {
    type: String
  },
  command: {
    type: String
  }
})


const _loadVrm =  async (url) => {
  const loader = new GLTFLoader()
  // here we are installing VRMLoaderPlugin
  loader.register((parser) => new VRMLoaderPlugin(parser))
  return await loader.loadAsync(url).then((gltf) => {
    // `VRM` is loaded inside `gltf.userData.vrm`
    const vrm_ = gltf.userData.vrm
    // rotate the vrm around y axis if the vrm is VRM0.0
    VRMUtils.rotateVRM0(vrm_)
    return vrm_
  })
}

const loadVrm = async (url) => {
  if (!url) {
    return
  }
  emits('loading', props.name, props.command)

  const data = await _loadVrm(url)
  let is_ok = false
  if (data) {
    is_ok = true
  }
  emits('loaded', props.name, props.command, is_ok, data)
}

const setVrm = (data) => {
  emits('loading', props.name, props.command)
  let is_ok = false
  if (data) {
    is_ok = true
  }
  emits('loaded', props.name, props.command, is_ok, data)
}

onMounted(async () => {
  if (props.data != null) {
    setVrm(props.data)
  } else {
    loadVrm(props.url)
  }
})

watch(() => props.data, () => {
  if (props.data != null) {
    setVrm(props.data)
  }
})

watch(() => props.url, () => {
  if (props.url) {
    loadVrm(props.url)
  }
})
</script>

<template>
</template>

<style scoped>
</style>
