<template>
  <n-space vertical style="margin-top: 5%">
    <h3>在此处上传文件：<br /></h3>
    <h4>（数据格式支持json，媒体格式支持MP3、mp4、jpg等）</h4>
    <n-card title="文件列表" style="width: 350px; margin-top: 5%">
      <n-upload
        multiple
        directory-dnd
        :default-file-list="fileList"
        action="http://localhost:4000/upload"
        @finish="handleUploadSuccess"
      >
        <n-upload-dragger v-if="fileList.length === 0">
          <div style="margin-bottom: 12px">
            <n-icon size="40" color="#0e7a0d">
              <UploadIcon />
            </n-icon>
          </div>
          <n-text style="font-size: 16px">点击或拖动文件到该区域来上传</n-text>
          <n-p depth="3" style="margin: 8px 0 0 0">请不要上传敏感数据</n-p>
        </n-upload-dragger>
      </n-upload>
    </n-card>
    <p v-if="json_result !== ''">"{{ json_result }}"</p>
    <n-button @click="viewAllUploads">查看已上传文件</n-button>
    <n-card title="已上传文件列表" v-if="existedFiles.length != 0">
      <div v-for="file in existedFiles" :key="file" style="margin-top: 2%">
        <n-space>
          <p>{{ file }}</p>
          <n-button @click="openFile(file)">下载</n-button>
        </n-space>
      </div>
    </n-card>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, h, ref, watch, type Component } from 'vue'
import type { UploadFileInfo } from 'naive-ui'
import ApiService from '@/services/api'
import { NIcon } from 'naive-ui'
import { ColorWandOutline, CloudUpload as UploadIcon } from '@vicons/ionicons5'

interface CustomFileInfo extends UploadFileInfo {
  response?: {
    success: boolean
    message: string
    fileInfo?: {
      filename: string
      originalname: string
      size: number
      mimetype: string
    }
  }
}

export default defineComponent({
  setup() {
    const fileListRef = ref<CustomFileInfo[]>([])
    var json_result = ''
    var existedFiles = ref<string[]>([])
    return { fileList: fileListRef, json_result, UploadIcon, existedFiles }
  },
  methods: {
    handleUploadSuccess(response: any, file: any, fileList: any) {
      // console.log(response)
      const address = response.file.file.name
      if (response.file.file.name.split('.')[1] == 'json') {
        console.log('这是个json格式文件。')
        fetch(`http://localhost:4000/download/${address}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            if (Array.isArray(data)) {
              // 如果是数组，遍历每个对象
              for (let item of data) {
                // 处理每个对象
                const code =
                  item.location_code +
                  item.time_code +
                  item.source_code +
                  item.carrier_code +
                  item.disaster_code

                if (code.length === 36) {
                  ApiService.createDisaster(code)
                    .then(() => {
                      this.json_result = '插入成功。'
                    })
                    .catch(() => {
                      this.json_result = '插入失败。'
                    })
                }
              }
            } else {
              // 如果是单个对象，直接处理它
              const code =
                data.location_code +
                data.time_code +
                data.source_code +
                data.carrier_code +
                data.disaster_code
              console.log(code)

              if (code.length === 36) {
                ApiService.createDisaster(code)
                  .then((response) => {
                    console.log(response)
                    this.json_result = '插入成功。'
                    console.log('插入成功。')
                  })
                  .catch((response) => {
                    console.log(response)
                    this.json_result = '插入失败。'
                    console.log('插入失败。')
                  })
              } else {
                this.json_result = '插入失败，请检查编码。'
                console.log('插入失败，请检查编码。')
              }
            }
          })
      } else if (response.file.file.type == 'audio/mpeg' || 'image/png' || 'image/jpeg') {
        console.log(response)
        if (response.file.file.name.split('.')[0].length == 36) {
          ApiService.createDisaster(response.file.file.name.split('.')[0])
            .then((response) => {
              console.log(response)
              this.json_result = '插入成功。'
              console.log('插入成功。')
            })
            .catch((response) => {
              console.log(response)
              this.json_result = '插入失败。'
              console.log('插入失败。')
            })
        } else {
          console.log('请检查文件名。')
        }
      } else {
        // console.log(response)
      }
    },
    viewAllUploads() {
      fetch('http://localhost:4000/files')
        .then((response) => response.json())
        .then((data) => {
          // console.log(data.files)
          // Object.values(data.files).forEach(console.log);
          this.existedFiles = Object.values(data.files)
        })
        .catch((error) => console.error('Error:', error))
    },
    openFile(filename: string) {
      const url = 'http://localhost:4000/download/' + filename
      const a = document.createElement('a')
      a.href = url
      a.download = filename // 设置文件名

      // 将 <a> 元素添加到 DOM，模拟用户点击
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  },
  components: {
    UploadIcon
  }
})
</script>
