<template>
  <n-button @click="show">show</n-button>
  <n-space vertical>
    <div id="map" style="width: 1000px; height: 650px"></div>
  </n-space>
</template>

<script setup lang="ts">
import apiClient from '@/services/mapapi'
import AMapLoader from '@amap/amap-jsapi-loader'
import ApiService from '@/services/api'

const output = 'JSON'
const key = 'b864b540905c39c51d6fdcf69856ac5e'

let map: any
let all_destName: string[]
let alls: RowData[] = []
let markers: any[] = []
let ids: string[] = []
let locations: string[] = []
let times: string[] = []
let sources: string[] = []
let carriers: string[] = []
let disasters: string[] = []
let codes: string[] = []

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

AMapLoader.load({
  key: '60404195b9013002afaa98686b98a695',
  version: '2.0',
  plugins: ['AMap.Geolocation']
}).then((AMap) => {
  map = new AMap.Map('map', {
    zoom: 7,
    center: [116.397428, 39.90923],
    mapStyle: 'amap://styles/whitesmoke',
    viewMode: '3D'
  })
})

const show = () => {
  ApiService.getDisasters()
    .then((response) => {
      all_destName = response.data.map((item: any) => item.location)
      ids = response.data.map((item: RowData) => item.id)
      locations = response.data.map((item: RowData) => item.location)
      times = response.data.map((item: RowData) => item.time)
      sources = response.data.map((item: RowData) => item.source)
      carriers = response.data.map((item: RowData) => item.carrier)
      disasters = response.data.map((item: RowData) => item.disaster)
      codes = response.data.map(
        (item: RowData) =>
          item.location_code +
          item.time_code +
          item.source_code +
          item.carrier_code +
          item.disaster_code
      )
      for (let index = 0; index < ids.length; index++) {
        let newitem: RowData = {
          id: ids[index],
          location: locations[index],
          time: times[index],
          source: sources[index],
          carrier: carriers[index],
          disaster: disasters[index],
          code: codes[index],
          location_code: '',
          time_code: '',
          source_code: '',
          carrier_code: '',
          disaster_code: ''
        }
        alls.push(newitem)
      }
      alls.sort((a: RowData, b: RowData) => parseInt(a.id) - parseInt(b.id))

      for (const [index, item] of all_destName.entries()) {
        apiClient.getLocation(item, output, key).then((response) => {
          let tempdest = response.data.geocodes[0].location
          let tmepdestName = response.data.geocodes[0].formatted_address

          let coordinates = tempdest.split(',').map(parseFloat)

          let position = new AMap.LngLat(coordinates[0], coordinates[1])
          map.setCenter(position)

          let tempmarker = new AMap.Marker({
            position: position, //经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: tmepdestName
          })
          tempmarker.on('click', function () {
            let info: string =
              'id为：' +
              ids[index] +
              '，\n时间为：' +
              times[index] +
              '，\n来源为：' +
              sources[index] +
              '，\n载体为：' +
              carriers[index] +
              '，\n灾情为：' +
              disasters[index]
            alert(info)
          })
          markers.push(tempmarker)

          map.add(markers)

          map.setZoom(5)
        })
      }
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>
