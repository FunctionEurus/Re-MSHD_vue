<template>
  <n-space vertical>
    <n-card title=" " style="width: 125%">
      <n-tabs default-value="signin" size="large" justify-content="space-evenly">
        <n-tab-pane name="signin" tab="登录">
          <n-form>
            <n-form-item-row label="用户名">
              <n-input v-model:value="loginUserName" />
            </n-form-item-row>
            <n-form-item-row label="密码">
              <n-input
                v-model:value="loginPassword"
                type="password"
                show-password-on="mousedown"
                placeholder="Please input"
                :maxlength="12"
              />
            </n-form-item-row>
          </n-form>
          <n-button type="primary" block secondary strong @click="login"> 登录 </n-button>
        </n-tab-pane>
        <n-tab-pane name="signup" tab="注册">
          <n-form>
            <n-form-item-row label="用户名">
              <n-input v-model:value="registerUserName" />
            </n-form-item-row>
            <n-form-item-row label="密码">
              <n-input
                v-model:value="registerPassword"
                type="password"
                show-password-on="mousedown"
                placeholder="Please input"
                :maxlength="12"
              />
            </n-form-item-row>
            <n-form-item-row label="重复密码">
              <n-input
                v-model:value="registerPasswordAgain"
                type="password"
                show-password-on="mousedown"
                placeholder="Please input"
                :maxlength="12"
              />
            </n-form-item-row>
            <n-form-item-row label="邮箱">
              <n-input
                type="email"
                placeholder="Please input"
                :maxlength="25"
                v-model:value="registerEmail"
              />
            </n-form-item-row>
          </n-form>
          <n-button type="primary" block secondary strong @click="register"> 注册 </n-button>
        </n-tab-pane>
      </n-tabs>
    </n-card>
    <p>{{ loginStatus }}</p>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { GlassesOutline, Glasses } from '@vicons/ionicons5'
import ApiService from '@/services/api'

export default defineComponent({
  setup() {
    let loginStatus = ref('')
    return {
      GlassesOutline,
      Glasses,
      loginUserName: ref(''),
      loginPassword: ref(''),
      loginStatus,
      registerUserName: ref(''),
      registerPassword: ref(''),
      registerPasswordAgain: ref(''),
      registerEmail: ref('')
    }
  },
  methods: {
    register() {
      console.log(this.registerEmail)
      console.log(this.registerPassword)
      if (
        this.registerPassword === this.registerPasswordAgain &&
        this.registerPasswordAgain !== ''
      ) {
        const jsonData: any = {
          username: this.registerUserName,
          password: this.registerPassword,
          email: this.registerEmail
        }
        ApiService.createUser(jsonData)
      } else {
        console.log('请检查输入！')
      }
    },
    login() {
      // console.log(this.loginUserName) // 确保使用 this.loginUserName
      // console.log(this.loginPassword)
      ApiService.getHashedPassword(this.loginUserName, this.loginPassword).then((response) => {
        // console.log(response.data)
        if (response.data === true) {
          this.loginStatus = '登陆成功!'
          // console.log('login success')
        } else {
          this.loginStatus = '登陆失败!'
          // console.log('login failed')
        }
      })
    }
  }
})
</script>
