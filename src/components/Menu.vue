<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <n-space vertical>
    <div class="iconsandtitle">
      <div class="icons">
        <n-icon size="40">
          <game-controller-outline />
        </n-icon>
        <n-icon size="40" color="#0e7a0d" v-if="!collapsed">
          <game-controller />
        </n-icon>
        <n-icon size="40" :component="GameController" v-if="!collapsed" />
      </div>
      <div>
        <h2 class="title" v-if="collapsed">MSHD</h2>
        <h2 class="title" v-if="!collapsed">多源异构灾情数据</h2>
        <div v-if="!collapsed">
          <h2>一体化编码管理</h2>
        </div>
        <div v-if="!collapsed">
          <h2>MSHD-2.0</h2>
        </div>
      </div>
    </div>
    <n-layout has-sider>
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :value="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <n-menu
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          key-field="whateverKey"
          label-field="whateverLabel"
          children-field="whateverChildren"
        />
      </n-layout-sider>
      
    </n-layout>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, h, ref, type Component } from 'vue'
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import {
  Bulb as BulbIcon,
  Person as PersonIcon,
  BarChart as AnalyzeIcon,
  PersonCircleOutline as PersonCircleIcon,
  CloudUpload as UploadIcon,
  Bookmarks as ViewIcon,
  Build as ModifyIcon,
  GameControllerOutline,
  GameController
} from '@vicons/ionicons5'
import { RouterLink } from 'vue-router'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    whateverLabel: '数据中心',
    whateverKey: 'data-center',
    icon: renderIcon(BulbIcon),
    whateverChildren: [
      {
        whateverLabel: '数据上传',
        whateverKey: 'data-update',
        icon: renderIcon(UploadIcon),
        to: '/#/upload'
      },
      {
        whateverLabel: '查看数据',
        whateverKey: 'view-data',
        icon: renderIcon(ViewIcon)
      }
    ]
  },
  {
    type: 'divider'
  },
  {
    whateverLabel: '分析展示',
    whateverKey: 'analyse-and-visualize',
    icon: renderIcon(AnalyzeIcon)
  },
  {
    type: 'divider'
  },
  {
    whateverLabel: '个人中心',
    whateverKey: 'user-center',
    icon: renderIcon(PersonCircleIcon),
    whateverChildren: [
      {
        whateverLabel: '查看信息',
        whateverKey: 'view-info',
        icon: renderIcon(PersonIcon)
      },
      {
        whateverLabel: '修改信息',
        whateverKey: 'modify-info',
        icon: renderIcon(ModifyIcon)
      }
    ]
  }
]

export default defineComponent({
  components: {
    GameController,
    GameControllerOutline
  },
  setup() {
    return {
      collapsed: ref(false),
      menuOptions,
      GameController
    }
  }
})
</script>

<style scoped>
.iconsandtitle {
  position: relative;
  left: 5%;
}
</style>
