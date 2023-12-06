<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import ApiService from '@/services/api'
import AMapLoader from '@amap/amap-jsapi-loader'
import L from 'leaflet'

export default {
  setup() {
    const map = ref(null)
    const geocoder = ref(null)
    const dataLoaded = ref(false)

    const loadDisasters = async () => {
      try {
        const response = await ApiService.getDisasters()
        const disasters = response.data

        disasters.forEach((rowData) => {
          const { location, time } = rowData
          geocodeLocation(location, (coordinates) => {
            if (coordinates) {
              const marker = L.marker(coordinates).addTo(map.value)
              marker.bindPopup(`Time: ${time}<br>Location: ${location}`)
            }
          })
        })
      } catch (error) {
        console.error('Error loading disasters:', error)
      }
    }

    const initializeMap = () => {
      // 初始化 Leaflet 地图
      map.value = L.map('map').setView([39.968578, 116.367583], 15)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map.value)
    }

    const initializeGeocoder = () => {
      // 初始化 AMap.Geocoder
      AMapLoader.load({
        key: '182ce91d8135726f58018d45bc120fdb', // 替换成你的高德地图 API Key
        version: '2.0',
        plugins: ['AMap.Geocoder']
      }).then((AMap) => {
        geocoder.value = new AMap.Geocoder({
          city: '010' // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
        })
      })
    }

    const geocodeLocation = (address, callback) => {
      geocoder.value.getLocation(address, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          const coordinates = result.geocodes[0].location
          callback(coordinates)
        } else {
          console.error('Geocoding failed:', status, result)
          callback(null)
        }
      })
    }

    onMounted(async () => {
      if (!dataLoaded.value) {
        initializeMap()
        initializeGeocoder()
        await loadDisasters()
        dataLoaded.value = true
      }
    })

    return {
      map
    }
  }
}
</script>

<style>
#map {
  height: 400px;
}
</style>
