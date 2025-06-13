<script setup>
import { getCurrentInstance, onMounted, useTemplateRef, watch } from 'vue'

import * as THREE from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const emit = defineEmits(['init', 'animate'])

const props = defineProps({
  animation: {
    type: Boolean,
    default: false
  },
  useOrbitControls: {
    type: Boolean,
    default: false
  },
  useGridHelper: {
    type: Boolean,
    default: false
  },
  useAxesHelper: {
    type: Boolean,
    default: false
  },
  useDefaultLight: {
    type: Boolean,
    default: false
  }
})

const dom_id = 'dom' + getCurrentInstance().uid
const mydom = useTemplateRef(dom_id)

let animationFrameId = null
let scene = null
let camera = null
let renderer = null
let controls = null


const animate = () => {
  const context = {
    scene,
    camera,
    renderer,
    controls,
  }
  emit('animate', context)

  if (animationFrameId != null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
  if (props.animation) {
    animationFrameId = requestAnimationFrame(animate)
  }

  renderer.render(scene, camera)
}

const begin_animation = () => {
  if (animationFrameId != null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
  animationFrameId = requestAnimationFrame(animate)
}

const end_animation = () => {
  if (animationFrameId != null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
}

watch(() => props.animation, (value) => {
  if (value == true) {
    begin_animation()
  } else {
    end_animation()
  }
})

const init = () => {
  // get render area
  const el = mydom.value
  const el_width = el.clientWidth
  const el_height = el.clientHeight

  // create renderer
  const renderer_option = {
    antialias: true,
    alpha: false
  }
  THREE.ColorManagement.enabled = false

  renderer = new THREE.WebGLRenderer(renderer_option)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(el_width, el_height)
  renderer.setClearColor(0x7fbfff, 1.0)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  el.appendChild(renderer.domElement)

  // create scene
  scene = new THREE.Scene()

  // create camera
  camera = new THREE.PerspectiveCamera(45,
                                       el_width / el_height,
                                       0.1,
                                       1000)
  camera.position.set(0, 1.25, 1.0)

  if (props.useOrbitControls) {
    // Add OrbitControls
    controls = new OrbitControls(camera, el)
    controls.screenSpacePanning = true
    controls.target.set(0.0, 1.25, 0.0)
    controls.update()
  }

  if (props.useGridHelper) {
    // Add gridhelper
    const gridHelper = new THREE.GridHelper(10, 10)
    scene.add(gridHelper)
    gridHelper.visible = true
  }

  if (props.useAxesHelper) {
    // Add axeshelper
    const axesHelper = new THREE.AxesHelper( 5 )
    scene.add( axesHelper )
  }

  if (props.useDefaultLight) {
    // Add directionallight
    const light = new THREE.DirectionalLight(0xffffff)
    light.intensity = 3
    light.position.set(1, 1, 1).normalize()
    scene.add(light)

    // Add ambientlight
    const ambient = new THREE.AmbientLight(0x404040)
    scene.add(ambient)
  }

  const context = {
    scene,
    camera,
    renderer,
    controls,
  }
  emit('init', context)
}


onMounted(async () => {
  if (!WebGL.isWebGL2Available()) {
    const warning = WebGL.getWebGLErrorMessage()
    console.error(warning)
    return
  }
  // Set Resize Handler
  const getDimensions = () => {
    const el = mydom.value
    const el_width = el.clientWidth
    const el_height = el.clientHeight

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(el_width, el_height)

    // Set aspect rate
    camera.aspect = el_width / el_height
    camera.updateProjectionMatrix()
  }
  window.addEventListener('resize', getDimensions)

  init()
})
</script>

<template>
<div
  :ref="dom_id"
  class="box">
</div>
</template>

<style scoped>
.box {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
