<template>
  <n-breadcrumb>
    <n-breadcrumb-item href="#/">Home</n-breadcrumb-item>
    <n-breadcrumb-item href="#/login&register">Login&Register</n-breadcrumb-item>
    <n-breadcrumb-item href="#/input">Input</n-breadcrumb-item>
    <n-breadcrumb-item href="#/uploadfiles">UploadFiles</n-breadcrumb-item>
    <n-breadcrumb-item href="#/query">Query</n-breadcrumb-item>
    <n-breadcrumb-item href="#/delete">Delete</n-breadcrumb-item>
    <n-breadcrumb-item href="#/update">Update</n-breadcrumb-item>
    <n-breadcrumb-item href="#/analyze">Analyze</n-breadcrumb-item>
    <n-breadcrumb-item href="#/location">Location</n-breadcrumb-item>
    <n-breadcrumb-item href="#/non-existent-path">404</n-breadcrumb-item>
  </n-breadcrumb>
  <div style="display: flex; flex-direction: row;">
    <Menu style="margin-right: 1em; width: fit-content;"/>
    <component :is="currentView" />
  </div>
  <n-back-top :right="100" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Home from './pages/Home.vue'
import Login_Register from './pages/Login&Register.vue'
import Input from './pages/Input.vue'
import Query from '@/pages/Query.vue'
import Delete from '@/pages/Delete.vue'
import Upload from '@/pages/Upload.vue'
import Update from '@/pages/Update.vue'
import Analyze from '@/pages/Analyze.vue'
import NotFound from './pages/NotFound.vue'
import MapLocation from '@/pages/MapLocation.vue'
import Menu from '@/components/Menu.vue'

const routes: any = {
  '/': Home,
  '/login&register': Login_Register,
  '/input': Input,
  '/query': Query,
  '/delete': Delete,
  '/uploadfiles': Upload,
  '/update': Update,
  '/analyze': Analyze,
  '/location': MapLocation
}
const currentPath = ref(window.location.hash)
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})
const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<style scoped></style>
