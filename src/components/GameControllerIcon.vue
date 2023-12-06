<template>
  <div class="icons">
    <n-icon size="40">
      <game-controller-outline />
    </n-icon>
    <n-icon size="40" color="#0e7a0d">
      <game-controller />
    </n-icon>
    <n-icon size="40" :component="GameController" />
  </div>
    <h2 class="title">MSHD-2.0</h2>
  </template>
  
  <script lang="ts">
  import { GameControllerOutline, GameController } from '@vicons/ionicons5'
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    components: {
      GameController,
      GameControllerOutline
    },
    setup () {
      return {
        GameController
      }
    }
  })
  </script>

<style scoped>
/* .title {
  position: center;
}

.icons {
  position: center;
} */
</style>