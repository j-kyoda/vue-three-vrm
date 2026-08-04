<script setup>
import { onMounted, ref, watch } from 'vue'

import * as THREE from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { GltfModel } from '@/components/GltfModel.js'

const emits = defineEmits(['loading', 'loaded', 'error'])

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
  },
  scale: {
    type: [Object, null],
    default: null
  },
  position: {
    type: [Object, null],
    default: null
  },
  rotation: {
    type: [Object, null],
    default: null
  },
  wrap: {
    type: [Object, null],
    default: null
  },
  repeat: {
    type: [Object, null],
    default: null
  }
})

const WRAP_MODES = {
  'REPEAT': THREE.RepeatWrapping,
  'CLAMP_TO_EDGE': THREE.ClampToEdgeWrapping,
  'MIRRORED_REPEAT': THREE.MirroredRepeatWrapping,
}

const gltfModel = ref(null)
gltfModel.value = new GltfModel()

const getWrapMode = (mode) => {
  if (typeof mode == 'number') {
    return mode
  }
  if (mode in WRAP_MODES) {
    return WRAP_MODES[mode]
  }
  emits('error', `Unknown wrap mode ${mode}`)
}

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
    // scale
    if (props.scale) {
      gltfModel.value.setScale(props.scale)
    } else {
      gltfModel.value.setScale({'x': 1, 'y': 1, 'z': 1})
    }
    // position
    if (props.position) {
      gltfModel.value.setPosition(props.position)
    } else {
      gltfModel.value.setPosition({'x': 0, 'y': 0, 'z': 0})
    }
    // rotation
    if (props.rotation) {
      gltfModel.value.setRotation(props.rotation)
    } else {
      gltfModel.value.setRotation({'x': 0, 'y': 0, 'z': 0})
    }
    // texture
    const wrap = {'s': '', 't': ''}
    if (props.wrap) {
      wrap.s = getWrapMode(props.wrap.s)
      wrap.t = getWrapMode(props.wrap.t)
    } else {
      wrap.s = getWrapMode('CLAMP_TO_EDGE')
      wrap.t = getWrapMode('CLAMP_TO_EDGE')
    }
    const repeat = {'u': 0, 'v': 0}
    if (props.repeat) {
      repeat.u = props.repeat.u
      repeat.v = props.repeat.v
    }
    gltfModel.value.setTexture(wrap, repeat)
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

watch(() => props.scale, () => {
  if (gltfModel.value) {
    gltfModel.value.setScale(props.scale)
  }
})

watch(() => props.position, () => {
  if (gltfModel.value) {
    gltfModel.value.setPosition(props.position)
  }
})

watch(() => props.rotation, () => {
  if (gltfModel.value) {
    gltfModel.value.setRotation(props.rotation)
  }
})
</script>

<template>
</template>

<style scoped>
</style>
