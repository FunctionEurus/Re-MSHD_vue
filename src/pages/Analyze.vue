<template>
  <n-space vertical style="width: 600px">
    <n-radio-group v-model:value="choice" name="radiobuttongroup">
      <n-radio-button
        v-for="field in fields"
        :key="field.value"
        :value="field.value"
        :label="field.label"
      />
    </n-radio-group>
    <!--<div id="locationchart" style="width: 600px; height: 300px"></div>-->
    <!--<div id="sourcechart" style="margin-top: 5%; width: 600px; height: 300px"></div>-->
    <div id="chartContainer" style="width: 600px; height: 500px"></div>
  </n-space>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import * as echarts from 'echarts'
import ApiService from '@/services/api'

const fields = [
  {
    value: 'location',
    label: '地理信息'
  },
  {
    value: 'source',
    label: '来源'
  },
  {
    value: 'carrier',
    label: '载体'
  },
]

const choice = ref('')

onMounted(() => {
  watchEffect(() => {
    let chartInstance = echarts.init(document.getElementById('chartContainer'))

    if (choice.value === 'location') {
      ApiService.getDisasters().then((response) => {
        const locationMiddleData = response.data.map((item: { location: string }) => ({
          name: item.location
        }))
        let locationTransformedData: { name: string; value: number }[] = []
        for (let item of locationMiddleData) {
          let flag = 1
          for (let transformedItem of locationTransformedData) {
            if (transformedItem.name === item.name) {
              transformedItem.value += 1
              flag = 0
            }
          }
          if (flag === 1) {
            locationTransformedData.push({
              name: item.name,
              value: 1
            })
          }
        }
        let locationOption = {
          legend: {
            orient: 'horizontal',
            right: 10,
            top: 'bottom',
            type: 'scroll'
          },
          title: {
            text: '区域统计'
          },
          series: [
            {
              type: 'pie',
              data: locationTransformedData,
              roseType: 'area'
            }
          ]
        }
        chartInstance.setOption(locationOption)
      })
    } else if (choice.value === 'source') {
      ApiService.getDisasters().then((response) => {
        const sourceMiddleData = response.data.map((item: { source: string }) => ({
          name: item.source
        }))
        let sourceTransformedData: { name: string; value: number }[] = []
        for (let item of sourceMiddleData) {
          let flag = 1
          for (let transformedItem of sourceTransformedData) {
            if (transformedItem.name === item.name) {
              transformedItem.value += 1
              flag = 0
            }
          }
          if (flag === 1) {
            sourceTransformedData.push({
              name: item.name,
              value: 1
            })
          }
        }
        let sourceOption = {
          legend: {
            orient: 'center',
            right: 10,
            top: 'bottom',
            type: 'scroll'
          },
          title: {
            text: '来源统计'
          },
          series: [
            {
              type: 'pie',
              data: sourceTransformedData
            }
          ]
        }
        chartInstance.setOption(sourceOption)
      })
    } else if (choice.value === 'carrier') {
      ApiService.getDisasters().then((response) => {
        const carrierMiddleData = response.data.map((item: { carrier: string }) => ({
          name: item.carrier
        }))
        let carrierTransformedData: { name: string; value: number }[] = []
        for (let item of carrierMiddleData) {
          let flag = 1
          for (let transformedItem of carrierTransformedData) {
            if (transformedItem.name === item.name) {
              transformedItem.value += 1
              flag = 0
            }
          }
          if (flag === 1) {
            carrierTransformedData.push({
              name: item.name,
              value: 1
            })
          }
        }
        let carrierOption = {
          xAxis: {
            data: carrierTransformedData.map((item: { name: string }) => item.name)
          },
          yAxis: {},
          series: [
            {
              type: 'bar',
              data: carrierTransformedData.map((item: { value: number }) => ({
                value: item.value
              })),
              barWidth: '20%'
            }
          ],
          title: {
            text: '载体统计'
          }
        }
        chartInstance.setOption(carrierOption)
      })
    }
  })
})
</script>
