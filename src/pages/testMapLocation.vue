<template>
  <n-button @click="test">try</n-button>
  <n-button @click="show">show all</n-button>
  <n-space vertical>
    <div id="beiyou" style="width: 500px; height: 300px"></div>
    <div id="map" style="width: 500px; height: 300px"></div>
  </n-space>
</template>

<script setup lang="ts">
// Import the module
import apiClient from '@/services/mapapi'
import { ref } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import ApiService from '@/services/api'

// Call the function with the required parameters
const address = '北京邮电大学'
const output = 'JSON' // You can change this to 'JSON' if needed
const key = '59f324c8ebad9ff7d473e47155703e64'

const getresult = ref(0)
var dest = ''
var destName = ''
var map: any
var mapBUPT: any
var marker: any
var all_destName: string[]
var markers: any[] = []

AMapLoader.load({
  key: 'f0527bcd65c73955f985b03d6437b401',
  version: '2.0',
  plugins: ['AMap.Geolocation']
}).then((AMap) => {
  mapBUPT = new AMap.Map('beiyou', {
    zoom: 13,
    center: [116.397428, 39.90923],
    mapStyle: 'amap://styles/whitesmoke',
    viewMode: '3D'
  })
  map = new AMap.Map('map', {
    zoom: 5,
    center: [116.397428, 39.90923],
    mapStyle: 'amap://styles/whitesmoke',
    viewMode: '3D'
  })
})

const test = () => {
  apiClient
    .getLocation(address, output, key)
    .then((response) => {
      dest = response.data.geocodes[0].location
      destName = response.data.geocodes[0].formatted_address
      console.log(dest)
      console.log(destName)
      getresult.value = 1
      var coordinates = dest.split(',').map(parseFloat) // 将字符串分割为数组并转换为数字

      // 创建 AMap.LngLat 对象
      var position = new AMap.LngLat(coordinates[0], coordinates[1])

      // 简写 var position = [116, 39];
      mapBUPT.setCenter(position)

      marker = new AMap.Marker({
        position: position, //经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: destName
      })

      marker.on('click', function () {
        alert(destName)
      })
      //将创建的点标记添加到已有的地图实例：
      mapBUPT.add(marker)
    })
    .catch((error) => {
      console.error(error)
    })
}

const show = () => {
  ApiService.getDisasters()
    .then((response) => {
      all_destName = response.data.map((item: any) => item.location)
      console.log(all_destName)
      for (var item of all_destName) {
        apiClient.getLocation(item, output, key).then((response) => {
          var tempdest = response.data.geocodes[0].location
          var tmepdestName = response.data.geocodes[0].formatted_address

          var coordinates = tempdest.split(',').map(parseFloat)

          var position = new AMap.LngLat(coordinates[0], coordinates[1])
          map.setCenter(position)

          var tempmarker = new AMap.Marker({
            position: position, //经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: tmepdestName
          })
          markers.push(tempmarker)

          map.add(markers)

          map.setZoom(4)
        })
      }
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>
