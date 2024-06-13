<script setup>
import { ref } from "vue";
import { useCounterStore } from "@/stores/counter.js";
import SideMenu from "@/components/layout/SideMenu.vue";
import TopBanner from "@/components/layout/TopBanner.vue";
import TopNav from "@/components/layout/TopNav.vue";
import {watch} from "vue";
import { onMounted } from "vue";

//store
const store = useCounterStore()
const width = ref('200px')

//check width
const checkWidth = () => {
  switch (store.collapse) {
    case true:
      width.value = '64px'
          break;
    case false:
      width.value = '200px'
          break;
  }
}

//watch
watch(() => store.collapse, () => {
  checkWidth()
})

//change color
const value = ref([])
const colors = [
  {
    value: '#E63415',
    label: '烈焰红',
  },
  {
    value: '#FF6600',
    label: '秋日橘',
  },
  {
    value: '#FFDE0A',
    label: '柠檬黄',
  },
  {
    value: '#1EC79D',
    label: '梦幻绿',
  },
  {
    value: '#14CCCC',
    label: '靛青色',
  },
  {
    value: '#4167F0',
    label: '标准蓝',
  },
  {
    value: '#6222C9',
    label: '极客紫',
  },
]
colors.forEach((color) => {
  value.value.push(color.value)
})
const colorChange = (color) => {
  const el = document.documentElement;
  //计算属性
  getComputedStyle(el).getPropertyValue('--el-color-primary')
  el.style.setProperty('--el-color-primary', color)
  localStorage.setItem('primary_color', color)
}

//init color
const initColor = () => {
  const color = localStorage.getItem('primary_color')
  const el = document.documentElement;
  getComputedStyle(el).getPropertyValue('--el-color-primary')
  el.style.setProperty('--el-color-primary', color)
}
//om
onMounted(() => {
  initColor()
})
</script>

<template>
  <!-- layout page -->
  <div class="w-screen h-screen relative block overflow-hidden">
    <!-- el-container -->
    <el-container class="w-full h-full">
      <!-- side menu -->
      <el-aside
          style="transition: all 0.3s ease-in-out;overflow: hidden;padding: 0"
          :width="width"
      >
        <SideMenu />
      </el-aside>
      <!-- children app container -->
      <el-main style="padding: 0;background-color: #F0F2F5">
        <div class="w-full h-full relative block">
          <!-- top banner-->
          <TopBanner />
          <!-- top nav -->
          <TopNav />
          <!-- app container -->
          <div style="height: calc(100% - 112px)" class="w-full relative block p-4">
            <RouterView />
          </div>
        </div>
      </el-main>
    </el-container>
    <!-- layout setting drawer -->
    <el-drawer
        v-model="store.drawer"
    >
      <template #header>
        <span class="w-auto h-auto relative block mx-auto my-auto font-bold text-black">布局设置</span>
      </template>
      <!-- body -->
      <div class="w-full h-auto relative block">
        <!-- 色彩切换 -->
        <div class="w-full h-14 relative flex justify-start">
          <el-form label-width="auto">
            <el-form-item label="主题色">
              <el-select
                  v-model="value"
                  placeholder="请选择主题色"
                  style="width: 240px"
                  @change="colorChange"
              >
                <el-option
                    v-for="item in colors"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                  <div class="flex items-center">
                    <el-tag :color="item.value" style="margin-right: 8px" size="small" />
                    <span :style="{ color: item.value }">{{ item.label }}</span>
                  </div>
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<style scoped>
.el-tag {
  border: none;
  aspect-ratio: 1;
}
</style>