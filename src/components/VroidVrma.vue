<script setup>
import { onMounted, watch } from 'vue'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { VRMAnimationLoaderPlugin } from '@pixiv/three-vrm-animation'

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


const loadVrma = async (url) => {
  if (!url) {
    return
  }
  emits('loading', props.name, props.command)

  const loader = new GLTFLoader()
  loader.crossOrigin = 'anonymous'
  loader.register( ( parser ) => {

    return new VRMAnimationLoaderPlugin( parser )

  } )
  const gltfVrma = await loader.loadAsync( url )
  const data = gltfVrma.userData.vrmAnimations[ 0 ]
  let is_ok = false
  if (data) {
    is_ok = true
  }
  emits('loaded', props.name, props.command, is_ok, data)
}

const setVrma = (data) => {
  emits('loading', props.name, props.command)
  let is_ok = false
  if (data) {
    is_ok = true
  }
  emits('loaded', props.name, props.command, is_ok, data)
}

onMounted(async () => {
  if (props.data != null) {
    setVrma(props.data)
  } else {
    loadVrma(props.url)
  }
})

watch(() => props.data, () => {
  if (props.data != null) {
    setVrma(props.data)
  }
})

watch(() => props.url, () => {
  if (props.url) {
    loadVrma(props.url)
  }
})
</script>

<template>
</template>

<style scoped>
</style>
