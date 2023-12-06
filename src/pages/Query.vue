<template>
  <n-space vertical>
    <n-space vertical>
      <h3># 查询单条记录</h3>
      <n-space>
        <n-input-number v-model:value="id" clearable />
        <n-button @click="findone">查询</n-button>
      </n-space>
      <h3># 查询所有记录</h3>
      <n-card
        class="card"
        title="查询结果:"
        :segmented="{
          content: true,
          footer: 'soft'
        }"
        v-if="dbid != ''"
        style="width: auto"
      >
        <template #footer>
          记录编号: {{ dbid }}<br />
          地理信息: {{ location }} <br />
          发生时间: {{ time }}<br />
          来源: {{ source }} <br />
          载体:{{ carrier }}<br />
          灾情: {{ disaster }}<br />
          编码: {{ code }}
        </template>
      </n-card>
      <n-card
        style="width: auto"
        class="card"
        title="查询结果:"
        :segmented="{
          content: true,
          footer: 'soft'
        }"
        v-if="dbid === '' && one != ''"
      >
        <template #footer>{{ one }}</template>
      </n-card>
      <n-space vertical>
        <h3><em>喜欢表格还是卡片？</em></h3>
        <n-space>
          <h3>卡片</h3>
          <n-switch v-model:value="tableorcard" />
          <h3>表格</h3>
          <n-button @click="findall">查询全部</n-button>
        </n-space>
      </n-space>
      <n-data-table
        pagination-behavior-on-filter="first"
        :columns="columns"
        :data="data"
        :pagination="pagination"
        v-if="tableorcard"
      />
      <n-space>
        <n-card
          v-for="(item, index) in alls"
          :key="index"
          class="card"
          :title="`第${index + 1}条记录`"
          :segmented="{
            content: true,
            footer: 'soft'
          }"
          style="width: auto"
          v-if="all === '查询到数据。' && !tableorcard"
        >
          <template #footer>
            记录编号: {{ item.id }}<br />
            地理信息: {{ item.location }} <br />
            发生时间: {{ item.time }}<br />
            来源: {{ item.source }} <br />
            载体: {{ item.carrier }}<br />
            灾情: {{ item.disaster }}<br />
            编码: {{ item.code }}
          </template>
        </n-card>
      </n-space>
    </n-space>
  </n-space>
</template>

<script lang="ts">
import ApiService from '@/services/api'
import type { DataTableColumns } from 'naive-ui'
import { defineComponent, ref } from 'vue'

type RowData = {
  id: string
  location: string
  location_code: string
  time: string
  time_code: string
  source: string
  source_code: string
  carrier: string
  carrier_code: string
  disaster: string
  disaster_code: string
  code: string
}

let alls: RowData[] = []
let data: RowData[] = []
let ids: string[] = []
let locations: string[] = []
let times: string[] = []
let sources: string[] = []
let carriers: string[] = []
let disasters: string[] = []
let codes: string[] = []

const columns: DataTableColumns<RowData> = [
  {
    title: '编号',
    key: 'id'
  },
  {
    title: '地理位置',
    key: 'location'
  },
  {
    title: '时间',
    key: 'time'
  },
  {
    title: '来源',
    key: 'source'
  },
  {
    title: '载体',
    key: 'carrier'
  },
  {
    title: '灾情',
    key: 'disaster'
  },
  {
    title: '编码',
    key: 'code'
  }
]

export default defineComponent({
  methods: {
    findall() {
      ApiService.getDisasters().then((response) => {
        if (response.data === '') {
          this.all = '未查询到数据。'
        } else {
          this.all = '查询到数据。'
        }
        this.ids = response.data.map((item: RowData) => item.id)
        this.locations = response.data.map((item: RowData) => item.location)
        this.times = response.data.map((item: RowData) => item.time)
        this.sources = response.data.map((item: RowData) => item.source)
        this.carriers = response.data.map((item: RowData) => item.carrier)
        this.disasters = response.data.map((item: RowData) => item.disaster)
        this.codes = response.data.map(
          (item: RowData) =>
            item.location_code +
            item.time_code +
            item.source_code +
            item.carrier_code +
            item.disaster_code
        )
        for (let index = 0; index < this.ids.length; index++) {
          let newitem: RowData = {
            id: this.ids[index],
            location: this.locations[index],
            time: this.times[index],
            source: this.sources[index],
            carrier: this.carriers[index],
            disaster: this.disasters[index],
            code: this.codes[index]
          }
          this.alls.push(newitem)
        }
        this.alls.sort((a: RowData, b: RowData) => parseInt(a.id) - parseInt(b.id))
        this.data = this.alls
      })
    },
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
    }
  },
  setup() {
    return {
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
      ids,
      locations,
      times,
      sources,
      carriers,
      disasters,
      codes,
      alls: ref([]),
      page: ref(2),
      data,
      columns,
      pagination: { pageSize: 3 },
      tableorcard: ref(false)
    }
  }
})
</script>

<style scoped>
.card {
  width: 80%;
}
</style>
