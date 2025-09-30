<script setup>
import { ref } from 'vue'

import VroidExpression from '@/components/VroidExpression.vue'
import VroidPose from '@/components/VroidPose.vue'
import VroidVrm from '@/components/VroidVrm.vue'
import VroidVrma from '@/components/VroidVrma.vue'

const emit = defineEmits(['loading', 'loaded'])

const props = defineProps({
  name: {
    type: String
  },
  expression_name: {
    type: String
  },
  expression_url: {
    type: String
  },
  expression_data: {
    type: [Object, null],
    default: null
  },
  pose_name: {
    type: String
  },
  pose_url: {
    type: String
  },
  pose_data: {
    type: [Object, null],
    default: null
  },
  vrm_name: {
    type: String
  },
  vrm_url: {
    type: String
  },
  vrm_data: {
    type: [Object, null],
    default: null
  },
  vrma_name: {
    type: String
  },
  vrma_url: {
    type: String
  },
  vrma_data: {
    type: [Object, null],
    default: null
  },
})

const tasks = {}
const done_tasks = {}

const _expression_data = ref(null)  // expression
const _pose_data = ref(null)        // pose
const _vrm_data = ref(null)         // vrm
const _vrma_data = ref(null)        // vrma


const callback_loading = (name, command) => {
  const before = Object.keys(tasks).length
  tasks[name] = command
  const after = Object.keys(tasks).length

  if (before == 0 && after) {
    emit('loading', props.name)
  }
}

const callback_loaded = (name, command, is_ok, data) =>{
  const before = Object.keys(tasks).length

  if (is_ok) {
    if (command == 'load_expression') {
      _expression_data.value = data
    }
    if (command == 'load_pose') {
      _pose_data.value = data
    }
    if (command == 'load_vrm') {
      _vrm_data.value = data
    }
    if (command == 'load_vrma') {
      _vrma_data.value = data
    }
    done_tasks[name] = command
  }
  delete tasks[name]

  const after = Object.keys(tasks).length

  if (before && after == 0) {
    const data = {}
    for (const name in done_tasks) {
      const command = done_tasks[name]
      if (command == 'load_expression') {
        data['expression'] = _expression_data.value
      }
      if (command == 'load_pose') {
        data['pose'] = _pose_data.value
      }
      if (command == 'load_vrm') {
        data['vrm'] = _vrm_data.value
      }
      if (command == 'load_vrma') {
        data['vrma'] = _vrma_data.value
      }
    }
    emit('loaded', props.name, data)

    // clear finished tasks
    const names = Object.keys(done_tasks)
    for (const name of names) {
      delete done_tasks[name]
    }
  }
}
</script>

<template>
<VroidExpression
  command="load_expression"
  :name="props.expression_name"
  :url="props.expression_url"
  :data="props.expression_data"
  v-on:loading="callback_loading"
  v-on:loaded="callback_loaded" />
<VroidPose
  command="load_pose"
  :name="props.pose_name"
  :url="props.pose_url"
  :data="props.pose_data"
  v-on:loading="callback_loading"
  v-on:loaded="callback_loaded" />
<VroidVrm
  command="load_vrm"
  :name="props.vrm_name"
  :url="props.vrm_url"
  :data="props.vrm_data"
  v-on:loading="callback_loading"
  v-on:loaded="callback_loaded" />
<VroidVrma
  command="load_vrma"
  :name="props.vrma_name"
  :url="props.vrma_url"
  :data="props.vrma_data"
  v-on:loading="callback_loading"
  v-on:loaded="callback_loaded" />
</template>

<style scoped>
</style>
