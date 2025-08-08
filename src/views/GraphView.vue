<template>
  <div style="width: 100%; height: calc(100vh - 120px);">
    <GraphEditor/>
  </div>
</template>

<script>
import GraphEditor from '@/components/GraphEditor.vue'

export default {
  name: "GraphView",
  components: {
    GraphEditor
  }
};
</script>
