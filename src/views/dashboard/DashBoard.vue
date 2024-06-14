<script setup>
import { ref } from "vue";
import {ArrowRight, Warning} from "@element-plus/icons-vue";
import * as echarts from 'echarts';
import { onMounted } from "vue";
import { useRouter } from "vue-router";

//router
const router = useRouter()


//message card
const messageCard = ref([
  {
    title: '公寓楼总览',
    suffix: '栋',
    number: 10,
    path: '/apartment'
  },
  {
    title: '房间信息总览',
    suffix: '间',
    number: 206,
    path: '/rooms'
  },
  {
    title: '后台用户总览',
    suffix: '个',
    number: 12,
    path: '/users'
  },
  {
    title: '租约信息总览',
    suffix: '条',
    number: 10,
    path: '/bookers'
  },
])
//alert card
const alertCard = ref([
  {
    title: '正在告警',
    suffix: '条',
    number: 10,
  },
  {
    title: '日志总数',
    suffix: '条',
    number: 1003,
  },
])

//quick navigation
const quick = ref([
  {
    name: '用户管理',
    path: '/users'
  },
  {
    name: '仪表盘',
    path: '/'
  },
  {
    name: '公寓管理',
    path: '/apartment'
  },
  {
    name: '预约管理',
    path: '/booking'
  },
])

//echarts
//color
const color = localStorage.getItem('primary_color')
//om
onMounted(() => {
  let charts = echarts.init(document.getElementById('charts'))
  const option = {
    xAxis: {
      type: 'category',
      data: ['A', 'B', 'C']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150],
        type: 'line'
      }
    ],
    grid: {
      top: '10%',
      left: '10%',
      right: '10%',
      bottom: '10%'
    },
    title: {
      text: '预约数量',
      x: 'left',
    },
    color: color,
  };
  charts.setOption(option);
})
//jump function
const jump = (item) => {
  switch (item.path) {
    case '/users':
      router.push(item.path)
          break;
  }
}
const quickJump = (item) => {
  switch (item.path) {
    case '/users':
      router.push(item.path)
          break;
  }
}
</script>

<template>
  <!-- 仪表盘 -->
  <div class="w-full h-full relative grid grid-cols-2 gap-3">
    <!-- cols-1 -->
    <div class="w-full h-full relative grid grid-rows-2 gap-3">
      <!-- resource center -->
      <div class="w-full h-full relative block">
        <el-card
            class="w-full h-full hov-shadow"
        >
          <div class="w-full h-[200px] relative grid grid-cols-4 gap-1 justify-center">
            <!-- card -->
            <div
                v-for="item in messageCard"
                :key="item"
                @click="jump(item)"
                class="w-full h-[100px] relative grid grid-rows-2 gap-1 p-4 bg-[#f7f9fa] message-card rounded-[5px] my-auto"
            >
              <div class="w-full h-full relative flex text-[#333] leading-[31px] text-[13px]">
                {{ item.title }}
                <span class="w-auto h-full leading-[35px] relative block">
                  <el-icon><ArrowRight /></el-icon>
                </span>
              </div>
              <div class="w-full h-full relative flex text-[13px] leading-[31px]">
                <span class="w-auto h-full relative block mr-1 font-bold text-[#000] text-[15px]">
                  {{ item.number }}
                </span>
                {{ item.suffix }}
              </div>
            </div>
          </div>
          <template #header>
            <span class="text-black font-bold">资源概览</span>
          </template>
        </el-card>
      </div>
      <!-- echarts table -->
      <div class="w-full h-full relative block">
        <el-card
            class="w-full h-full hov-shadow"
        >
          <div id="charts" class="w-full h-[230px] relative block" />
        </el-card>
      </div>
    </div>
    <!-- cols-2 -->
    <div class="w-full h-full relative block">
      <!-- alert center -->
      <div class="w-full h-[250px] relative block">
        <el-card
            class="w-full h-full hov-shadow"
        >
          <div class="w-full h-[150px] relative grid grid-cols-3 gap-1">
            <!-- card -->
            <div
                v-for="item in alertCard"
                :key="item"
                class="w-full h-[100px] relative grid grid-rows-2 gap-1 p-4 bg-[#f7f9fa] message-card rounded-[5px] my-auto"
            >
              <div class="w-full h-full relative flex text-[#333] leading-[31px] text-[13px]">
                {{ item.title }}
                <span class="w-auto h-full leading-[35px] relative block">
                  <el-icon><Warning /></el-icon>
                </span>
              </div>
              <div class="w-full h-full relative flex text-[13px] leading-[31px]">
                <span class="w-auto h-full relative block mr-1 font-bold text-[#000] text-[15px]">
                  {{ item.number }}
                </span>
                {{ item.suffix }}
              </div>
            </div>
          </div>
          <template #header>
            <span class="text-black font-bold">监控告警</span>
          </template>
        </el-card>
      </div>
      <!-- quick jump -->
      <div class="w-full h-[200px] relative block mt-4">
        <el-card
            class="w-full h-full hov-shadow"
        >
          <div class="w-full h-[100px] relative flex justify-center overflow-hidden">
            <el-button
                icon="position"
                type="primary"
                class="my-auto mr-4"
                v-for="item in quick"
                :key="item"
                @click="quickJump(item)"
            >
              {{ item.name }}
            </el-button>
          </div>
          <template #header>
            <span class="text-black font-bold">便捷导航</span>
          </template>
        </el-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hov-shadow {
  box-shadow: none;
}
.hov-shadow:hover {
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
}
.message-card {
  border: 1px solid transparent;
  cursor: pointer;
}
.message-card:hover {
  transition: all 0.2s ease-in-out;
  border-color: #c0c6cc;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
}
</style>