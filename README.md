# @j-kyoda/vue-three-vrm

A Vue 3 component designed to render and display VRM models on your web pages.

## Installation

Package is available on NPM: https://www.npmjs.com/package/@j-kyoda/vue-three-vrm

```sh
npm install @j-kyoda/vue-three-vrm three @pixiv/three-vrm @pixiv/three-vrm-animation
```

---

## Usage

```vue
<script setup>
import { ref } from 'vue'

import { VroidControl, ThreeFrame } from '@j-kyoda/vue-three-vrm'


const context_ready = ref(false)
const render_context = ref(null)
const animation = ref(false)

// toDo: Please enter your model name here.
const model_name = 'chico_hoodie'
// toDo: Please enter your pose URL here.
const pose_url = 'poses/chico_pose_goodjob_202506.json'
// toDo: Please enter your VRM model URL here.
const vrm_url = 'models/chico_hoodie.vrm'
// toDo: Please enter your VRMA file URL here.(OPTION)
const vrma_url = 'models/sample.vrma'

let _vrm_model = null


const context_initialized = async (context) => {
  render_context.value = context  // save context
  context_ready.value = true  // Begin model loading.
}

const model_loaded = (name, vrm_model) => {
  const context = render_context.value

  // save
  _vrm_model = vrm_model

  // add model to scene
  const model = vrm_model.scene
  model.name = name
  vrm_model.setPosition({ x: 0, y: 0, z: 0 })
  context.scene.add(model)

  animation.value = true  // Starting animation.
}

const cb_animate = (context) => {
  const { deltaTime } = context
  if (_vrm_model != null) {
    // animate
    _vrm_model.updateAnimation(deltaTime)
  }
}
</script>

<template>
<div class="frame">
  <ThreeFrame
    :animation="animation"
    :useOrbitControls="true"
    :useGridHelper="true"
    :useAxesHelper="false"
    :useDefaultLight="true"
    v-on:initialized="context_initialized"
    v-on:animate="cb_animate"
    />
</div>
<div v-if="context_ready">
  <VroidControl
    :model_name="model_name"
    :pose_url="pose_url"
    :vrm_url="vrm_url"
    :vrma_url="vrma_url"
    v-on:loaded="model_loaded"
    />
</div>
</template>

<style scoped>
.frame {
  display: block;
  width: 400px;
  height: 400px;
  margin: 0 auto;
  padding: 0;
}
</style>
```

---

## ThreeFrame

### Props

| ID               | Type     | Default | Description                            |
| :--------------- | :------- | :------ | :------------------------------------- |
| animation        | Boolean  | false   | Controls animation loop execution.     |
| clearAlpha       | Number   | 1.0     | Clear Alpha value. Ranges from 0 to 1. |
| clearColor       | String   | #7fbfff | Clear color value.                     |
| useOrbitControls | Boolean  | false   | Enables/disables `OrbitControls`.      |
| useGridHelper    | Boolean  | false   | Shows/hides the grid.                  |
| useAxesHelper    | Boolean  | false   | Shows/hides the 3D axis arrows.        |
| useDefaultLight  | Boolean  | false   | Sets up default lighting.              |

### Events (Emits)

| Event        | Description                                            | Payload        |
| :----------- | :----------------------------------------------------- | :------------- |
| initialized  | Occurs when the renderer setup is complete.            | ContextObject  |
| animate      | Occurs before the rendering process in animation loop. | ContextObject  |

## ContextObject

```
{
  GLTFLoader,
  THREE,
  VRMExpressionPresetName,
  VRMHumanBoneName,
  VRMUtils,
  camera,    // Instance of THREE.PerspectiveCamera
  controls,  // Instance of OrbitControls
  deltaTime, //
  renderer,  // Instance of THREE.WebGLRenderer
  scene      // Instance of THREE.Scene
}
```

## VroidControl

### Props

| ID              | Type   | default      | Description                                             |
| :-------------- | :----- | :----------- | :------------------------------------------------------ |
| model_name      | String | ''           | The name of the VRoid model to display. **Required**.   |
| expression_name | String | 'expression' | The name of the expression model.                       |
| expression_url  | String | ''           | The URL of the expression model.                        |
| expression_data | Object | null         | The object for the expression model.                    |
| pose_name       | String | 'pose'       | The name of the pose model.                             |
| pose_url        | String | ''           | The URL of the pose model.                              |
| pose_data       | Object | null         | The object for the pose model.                          |
| vrm_name        | String | 'vrm'        | The name of the VRM model.                              |
| vrm_url         | String | ''           | The URL of the VRM model.                               |
| vrm_data        | Object | null         | The object for the VRM model.                           |
| vrma_name       | String | ''           | The name of the VRMA model.                             |
| vrma_url        | String | null         | The URL of the VRMA model.                              |
| vrma_data       | Object | null         | The object for the VRMA model.                          |

### Events (Emits)

| Event      | Description                                       | Payload                              |
| :--------- | :------------------------------------------------ | :----------------------------------- |
| loading    | Occurs while the VRoid model is loading.          | VRoid model name                     |
| loaded     | Occurs when the VRoid model has finished loading. | VRoid model name, VRMModel instance  |

## GltfControl

### Props

| ID              | Type   | default      | Description                                             |
| :-------------- | :----- | :----------- | :------------------------------------------------------ |
| name            | String | ''           | The name of the GLTF model.                             |
| url             | String | ''           | The URL of the GLTF model.                              |
| data            | Object | null         | The object for the GLTF model.                          |

### Events (Emits)

| Event      | Description                                       | Payload                              |
| :--------- | :------------------------------------------------ | :----------------------------------- |
| loading    | Occurs while the GLTF model is loading.           | GLTF model name                      |
| loaded     | Occurs when the GLTF model has finished loading.  | GLTF model name, GltfModel instance  |



## License

This project is licensed under the MIT License. For more details, please refer to the LICENSE file located at the root of the project.
