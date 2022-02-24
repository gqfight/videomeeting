<template>
  <div class="main">
    <main-panel></main-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import mainPanel from './cnps/main-panel.vue'
export default defineComponent({
  components: {
    mainPanel
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
