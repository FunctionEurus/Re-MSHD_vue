<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <p>NotFound page</p>
</template>

<script>
import { onMounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  setup() {
    onMounted(() => {
      AMapLoader.load({
        key: 'cc52ea5362da53a82a78d5328cf6d9eb', // Replace with your AMap key
        securityJsCode: 'cadb659b45299f63b7ac863f99bf8d5d',
        version: '2.0',
        plugins: ['AMap.Geocoder']
      })
        .then((AMap) => {
          const geocoder = new AMap.Geocoder({
            city: '010'
          })

          const address = '北京市海淀区苏州街'

          geocoder.getLocation(address, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              console.log(result)
            } else {
              console.error('Geocoding failed:', status, result)
            }
          })
        })
        .catch((error) => {
          console.error('Error loading AMap:', error)
        })
    })
  }
}
</script>
