<template>
  <n-space vertical>
    <n-space justify="center">
      <n-form-item ignore-path-change :show-label="false" style="width: auto">
        <n-dynamic-input v-model:value="value" placeholder="请输入编码"
      /></n-form-item>
      <n-button @click="submit" style="width: auto">提交</n-button>
    </n-space>
    <!--<pre>{{ JSON.stringify(value, null, 1) }}</pre>-->
    <n-card
      title="插入结果:"
      style="margin-top: 5%"
      v-if="dbid === '' && result != ''"
      :segmented="{
        content: true,
        footer: 'soft'
      }"
    >
      <template #footer>
        {{ result }}
      </template>
    </n-card>
    <n-card
      title="插入结果:"
      style="margin-top: 5%"
      v-if="dbid != ''"
      :segmented="{
        content: true,
        footer: 'soft'
      }"
    >
      {{ result }}<br />
      <template #footer>
        记录编号: {{ dbid }}<br />
        地理信息: {{ location }}<br />
        发生时间: {{ time }}<br />
        来源: {{ source }}<br />
        载体: {{ carrier }}<br />
        灾情: {{ disaster }}<br />
      </template>
    </n-card>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref } from 'vue'
import ApiService from '@/services/api'

export default defineComponent({
  methods: {
    submit() {
      // console.log(this.value[0])
      if (this.value[0].length != 36) {
        this.result = '输入数据有误，请重新输入！'
      }
      ApiService.createDisaster(this.value[0]).then((response) => {
        this.result = '插入成功。'
        this.dbid = response.data.id
        this.location = response.data.location
        this.time = response.data.time
        this.source = response.data.source
        this.carrier = response.data.carrier
        this.disaster = response.data.disaster
      })
      .catch((response)=>{
        this.result = '插入失败。请检查编码。'
      })
    }
  },
  setup() {
    return {
      value: ref(['']),
      result: ref(''),
      decode: ref(''),
      dbid: ref(''),
      location: ref(''),
      time: ref(''),
      source: ref(''),
      carrier: ref(''),
      disaster: ref('')
    }
  }
})
</script>
