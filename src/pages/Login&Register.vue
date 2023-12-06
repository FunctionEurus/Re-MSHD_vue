<template>
  <n-card title=" " style="width: 125%">
    <n-tabs default-value="signin" size="large" justify-content="space-evenly">
      <n-tab-pane name="signin" tab="登录">
        <n-form>
          <n-form-item-row label="用户名">
            <n-input />
          </n-form-item-row>
          <n-form-item-row label="密码">
            <n-input
              type="password"
              show-password-on="mousedown"
              placeholder="Please input"
              :maxlength="8"
            />
          </n-form-item-row>
        </n-form>
        <n-button type="primary" block secondary strong> 登录 </n-button>
      </n-tab-pane>
      <n-tab-pane name="signup" tab="注册">
        <n-form>
          <n-form-item-row label="用户名">
            <n-input />
          </n-form-item-row>
          <n-form-item-row label="密码">
              <n-input
                type="password"
                show-password-on="mousedown"
                placeholder="Please input"
                :maxlength="8" />
          </n-form-item-row>
          <n-form-item-row label="重复密码">
            <n-input
              type="password"
              show-password-on="mousedown"
              placeholder="Please input"
              :maxlength="8"
            />
          </n-form-item-row>
        </n-form>
        <n-button type="primary" block secondary strong> 注册 </n-button>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { GlassesOutline, Glasses } from '@vicons/ionicons5'

export default defineComponent({
  setup() {
    return {
      GlassesOutline,
      Glasses,
    }
  }
})
</script>