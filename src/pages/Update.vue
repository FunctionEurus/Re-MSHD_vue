<template>
  <div>
    <n-space style="width: 110%">
      <h3>请输入要修改的数据id:</h3>
      <n-input-number v-model:value="id" clearable />
      <n-button @click="findone">查询</n-button>
    </n-space>
    <p v-if="updateresult === 'success'">更新成功！</p>
    <h3 v-if="dbid != ''" style="margin-top: 5%">请选择要修改的字段:</h3>
    <n-radio-group
      v-model:value="choice"
      name="radiobuttongroup1"
      style="margin-top: 5%"
      v-if="dbid != ''"
    >
      <n-radio-button
        v-for="field in fields"
        :key="field.value"
        :value="field.value"
        :label="field.label"
      />
    </n-radio-group>
    <!--<h3 style="margin-top: 5%">你选择了: {{ choice }}</h3>-->
    <n-space style="margin-top: 5%">
      <n-input-number v-model:value="updatevalue" clearable v-if="dbid != ''" />
      <n-button @click="update" v-if="dbid != ''">修改</n-button>
    </n-space>
    <div style="display: flex">
      <div>
        <n-card
          class="card"
          title="查询结果:"
          :segmented="{
            content: true,
            footer: 'soft'
          }"
          v-if="dbid != ''"
          style="margin-top: 5%"
        >
          <template #footer>
            记录编号: {{ dbid }}<br />
            <span :style="{ color: choice === 'location' ? '#1BA657' : 'black' }"
              >地理信息: {{ location }} <br
            /></span>
            <span :style="{ color: choice === 'time' ? '#1BA657' : 'black' }"
              >发生时间: {{ time }}<br
            /></span>
            <span :style="{ color: choice === 'source' ? '#1BA657' : 'black' }"
              >来源: {{ source }} <br
            /></span>
            <span :style="{ color: choice === 'carrier' ? '#1BA657' : 'black' }"
              >载体:{{ carrier }}<br
            /></span>
            <span :style="{ color: choice === 'disaster' ? '#1BA657' : 'black' }"
              >灾情: {{ disaster }}<br
            /></span>
            编码: {{ code }}
          </template>
        </n-card>
        <n-card
          class="card"
          title="查询结果:"
          :segmented="{
            content: true,
            footer: 'soft'
          }"
          v-if="dbid === '' && one != ''"
          style="margin-top: 5%"
        >
          <template #footer>{{ one }}</template>
        </n-card>
      </div>
    </div>
  </div>
  <div class="codecard" style="align-items: center; display: flex">
    <n-card title="来源码" style="margin-top: 5%; width: 350px" v-if="choice === 'source'">
      <n-tabs default-value="business" justify-content="space-evenly" type="line" bar-width="50%">
        <n-tab-pane name="business" tab="业务报送数据">
          <n-list hoverable clickable style="width: auto">
            <n-list-item v-if="choice === 'source'">
              <n-thing content-style="margin-top: 5%;">
                <template #description>
                  <n-space style="margin-top: 4px">
                    <n-tag :bordered="false" type="success" size="large"> 大类代码：1 </n-tag>
                  </n-space>
                </template>
                前方地震应急指挥部 00<br />
                后方地震应急指挥部 01<br />
                应急指挥技术系统 20<br />
                社会服务工程应急救援系统 21<br />
                危险区预评估工作组 40<br />
                地震应急指挥技术协调组 41<br />
                震后政府信息支持工作项目组 42<br />
                灾情快速上报接收处理系统 80<br />
                地方地震局应急信息服务相关技术系统 81<br />
                其他 99<br />
              </n-thing>
            </n-list-item>
          </n-list>
        </n-tab-pane>
        <n-tab-pane name="sense" tab="泛在感知数据">
          <n-list hoverable clickable style="width: auto">
            <n-list-item v-if="choice === 'source'">
              <n-thing content-style="margin-top: 5%;">
                <template #description>
                  <n-space>
                    <n-tag :bordered="false" type="success" size="large"> 大类代码：2 </n-tag>
                  </n-space>
                </template>
                互联网感知 00<br />
                通信网感知 01<br />
                舆情网感知 02<br />
                电力系统感知 03<br />
                交通系统感知 04<br />
                其他 05<br />
              </n-thing>
            </n-list-item>
          </n-list>
        </n-tab-pane>
        <n-tab-pane name="else" tab="其他数据">
          <n-list hoverable clickable style="width: auto">
            <n-list-item v-if="choice === 'source'">
              <n-thing content-style="margin-top: 5%;">
                <template #description>
                  <n-space style="margin-top: 4px">
                    <n-tag :bordered="false" type="success" size="large"> 大类代码：3 </n-tag>
                  </n-space>
                </template>
                无 00
              </n-thing>
            </n-list-item>
          </n-list>
        </n-tab-pane>
      </n-tabs>
    </n-card>
    <n-card title="载体码" style="margin-top: 5%; width: 350px" v-if="choice === 'carrier'">
      <n-list hoverable clickable style="margin-top: 5%; width: 100%">
        <n-list-item>
          <n-thing content-style="margin-top: 5%;">
            <template #description>
              <n-space style="margin-top: 4px">
                <n-tag :bordered="false" type="success" size="large"> 文字：0 </n-tag>
                <n-tag :bordered="false" type="success" size="large"> 图像：1</n-tag>
                <n-tag :bordered="false" type="success" size="large"> 音频：2 </n-tag>
                <n-tag :bordered="false" type="success" size="large"> 视频：3</n-tag>
                <n-tag :bordered="false" type="success" size="large"> 其他：4 </n-tag>
              </n-space>
            </template>
          </n-thing>
        </n-list-item>
      </n-list>
    </n-card>
    <n-card title="灾情码" style="margin-top: 5%; width: 350px" v-if="choice === 'disaster'">
      <n-tabs default-value="father" justify-content="space-evenly" type="line" bar-width="50%">
        <n-tab-pane name="father" tab="大类代码">
          <n-tabs default-value="earthquake" justify-content="space-evenly" type="line">
            <n-tab-pane name="earthquake" tab="1">
              <h3>震情</h3>
              <n-tag :bordered="false" type="success" size="large" style="margin-top: 5%">
                震情信息：01</n-tag
              >
            </n-tab-pane>
            <n-tab-pane name="people" tab="2">
              <h3>人员伤亡及失踪</h3>
              <n-space style="margin-top: 5%">
                <n-tag :bordered="false" type="success" size="large">死亡：01</n-tag>
                <n-tag :bordered="false" type="success" size="large">受伤：02</n-tag>
                <n-tag :bordered="false" type="success" size="large">失踪：03</n-tag>
              </n-space>
            </n-tab-pane>
            <n-tab-pane name="house" tab="3">
              <h3>房屋破坏</h3>
              <n-space style="margin-top: 5%">
                <n-tag :bordered="false" type="success" size="large">土木：01</n-tag>
                <n-tag :bordered="false" type="success" size="large">砖木：02</n-tag>
                <n-tag :bordered="false" type="success" size="large">砖混：03</n-tag>
                <n-tag :bordered="false" type="success" size="large">框架：04</n-tag>
                <n-tag :bordered="false" type="success" size="large">其他：05</n-tag>
              </n-space>
            </n-tab-pane>
            <n-tab-pane name="lifeline" tab="4">
              <h3>生命线工程灾情</h3>
              <n-space style="margin-top: 5%">
                <n-tag :bordered="false" type="success" size="large">交通：01</n-tag>
                <n-tag :bordered="false" type="success" size="large">供水：02</n-tag>
                <n-tag :bordered="false" type="success" size="large">输油：03</n-tag>
                <n-tag :bordered="false" type="success" size="large">燃气：04</n-tag>
                <n-tag :bordered="false" type="success" size="large">电力：05</n-tag>
                <n-tag :bordered="false" type="success" size="large">通信：06</n-tag>
                <n-tag :bordered="false" type="success" size="large">水利：07</n-tag>
              </n-space>
            </n-tab-pane>
            <n-tab-pane name="secondary" tab="5">
              <h3>次生灾害</h3>
              <n-space style="margin-top: 5%">
                <n-tag :bordered="false" type="success" size="large">崩塌：01</n-tag>
                <n-tag :bordered="false" type="success" size="large">滑坡：02</n-tag>
                <n-tag :bordered="false" type="success" size="large">泥石流：03</n-tag>
                <n-tag :bordered="false" type="success" size="large">岩溶塌陷：04</n-tag>
                <n-tag :bordered="false" type="success" size="large">地裂缝：05</n-tag>
                <n-tag :bordered="false" type="success" size="large">地面沉降：06</n-tag>
                <n-tag :bordered="false" type="success" size="large">其他：07</n-tag>
              </n-space>
            </n-tab-pane>
          </n-tabs>
        </n-tab-pane>
        <n-tab-pane name="disasterinfo" tab="灾情指标代码">
          <n-list hoverable clickable style="width: auto">
            <n-list-item>
              <n-thing title="1 地震事件信息" content-style="margin-top: 10px;">
                <template #description>
                  <n-space size="small" style="margin-top: 4px">
                    <n-tag :bordered="false" type="success" size="small"> 地理位置：001 </n-tag>
                    <n-tag :bordered="false" type="success" size="small"> 时间：002 </n-tag>
                    <n-tag :bordered="false" type="success" size="small"> 震级：003 </n-tag>
                    <n-tag :bordered="false" type="success" size="small"> 震源深度：004 </n-tag>
                    <n-tag :bordered="false" type="success" size="small"> 烈度：005 </n-tag>
                  </n-space>
                </template>
              </n-thing>
            </n-list-item>
            <n-list-item>
              <n-thing title="2 人员伤亡及失踪信息" content-style="margin-top: 10px;">
                <template #description>
                  <n-space size="small" style="margin-top: 4px">
                    <n-tag :bordered="false" type="success" size="small"> 受灾人数：001 </n-tag>
                    <n-tag :bordered="false" type="success" size="small"> 受灾程度：002 </n-tag>
                  </n-space>
                </template>
              </n-thing>
            </n-list-item>
            <n-list-item>
              <n-thing title="3 房屋破坏信息" content-style="margin-top: 10px;">
                <template #description>
                  <n-space size="small" style="margin-top: 4px">
                    <n-tag :bordered="false" type="success" size="small"> 一般损坏面积：001 </n-tag>
                    <n-tag :bordered="false" type="success" size="small"> 严重损坏面积：002 </n-tag>
                    <n-tag :bordered="false" type="success" size="small"> 受灾程度：003 </n-tag>
                  </n-space>
                </template>
              </n-thing>
            </n-list-item>
            <n-list-item>
              <n-thing title="4 生命线工程灾情信息" content-style="margin-top: 10px;">
                <template #description>
                  <n-space size="small" style="margin-top: 4px">
                    <n-tag :bordered="false" type="success" size="small"> 受灾设施数：001 </n-tag>
                    <n-tag :bordered="false" type="success" size="small"> 受灾范围：002 </n-tag>
                    <n-tag :bordered="false" type="success" size="small"> 受灾程度：003 </n-tag>
                  </n-space>
                </template>
              </n-thing>
            </n-list-item>
            <n-list-item>
              <n-thing title="5 次生灾害信息" content-style="margin-top: 10px;">
                <template #description>
                  <n-space size="small" style="margin-top: 4px">
                    <n-tag :bordered="false" type="success" size="small"> 灾害损失：001 </n-tag>
                    <n-tag :bordered="false" type="success" size="small"> 灾害范围：002 </n-tag>
                    <n-tag :bordered="false" type="success" size="small"> 受灾程度：003 </n-tag>
                  </n-space>
                </template>
              </n-thing>
            </n-list-item>
          </n-list>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<script lang="ts">
import ApiService from '@/services/api'
import { defineComponent, ref } from 'vue'
import Tabs from '@/components/Tabs.vue'

export default defineComponent({
  methods: {
    findone() {
      ApiService.getDisasterById(this.id.toString()).then((response) => {
        if (response.data === '') {
          this.one = `未查询到id为${this.id}的数据。`
          this.dbid = ''
          this.location = ''
          this.time = ''
          this.source = ''
          this.carrier = ''
          this.disaster = ''
          this.code = ''
        } else {
          this.one = '查询成功。'
          this.dbid = response.data.id
          this.location = response.data.location
          this.time = response.data.time
          this.source = response.data.source
          this.carrier = response.data.carrier
          this.disaster = response.data.disaster
          this.code =
            response.data.location_code +
            response.data.time_code +
            response.data.source_code +
            response.data.carrier_code +
            response.data.disaster_code
        }
      })
    },
    update() {
      let newcode = ''
      if (this.choice === 'location') {
        newcode = this.updatevalue + this.code.substring(12, this.code.length + 1)
      } else if (this.choice === 'time') {
        newcode =
          this.code.substring(0, 12) +
          this.updatevalue +
          this.code.substring(26, this.code.length + 1)
      } else if (this.choice === 'source') {
        newcode =
          this.code.substring(0, 26) +
          this.updatevalue +
          this.code.substring(29, this.code.length + 1)
      } else if (this.choice === 'carrier') {
        newcode =
          this.code.substring(0, 29) +
          this.updatevalue +
          this.code.substring(30, this.code.length + 1)
      } else if (this.choice === 'disaster') {
        newcode = this.code.substring(0, 30) + this.updatevalue
      }
      ApiService.updateDisaster(this.dbid, newcode).then((response) => {
        if (response.status) {
          this.updateresult = 'success'
        }
      })
    }
  },
  setup() {
    return {
      choice: ref(null),
      all: ref(''),
      one: ref(''),
      id: ref(0),
      dbid: ref(''),
      location: ref(''),
      time: ref(''),
      source: ref(''),
      carrier: ref(''),
      disaster: ref(''),
      code: ref(''),
      updatevalue: ref(''),
      updateresult: ref(''),
      fields: [
        {
          value: 'location',
          label: '地理信息'
        },
        {
          value: 'time',
          label: '发生时间'
        },
        {
          value: 'source',
          label: '来源'
        },
        {
          value: 'carrier',
          label: '载体'
        },
        {
          value: 'disaster',
          label: '灾情'
        }
      ]
    }
  }
})
</script>

<style scoped>
.card {
  width: auto;
  margin-top: 5%;
}
</style>
