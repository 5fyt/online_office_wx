<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view>{{ number }}</view>
    <button @tap="countStores.add()">加一</button>
    <uni-card title="基础卡片" extra="额外信息">
      <text
        >这是一个基础卡片示例，此示例展示了一个标题加标题额外信息的标准卡片。</text
      >
    </uni-card>
  </view>
  
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import countStore from '@/stores/modules/count'
const title = ref('Hello')
const countStores = countStore()
const { number } = storeToRefs(countStores)
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
