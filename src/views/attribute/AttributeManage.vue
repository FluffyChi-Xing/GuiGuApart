<script setup>
import { ref } from "vue";
import CopyRight from "@/components/common/CopyRight.vue";
import {Warning} from "@element-plus/icons-vue";

//apartment tags
const apart = ref([
  '靠近地铁',
  '靠近公交站',
  '靠近商圈',
  '靠近医院'
])
//close
const close_1 = (aparts) => {
  apart.value = apart.value.filter((item) => item !== aparts )
}
//rooms tags
const rooms = ref([
    '朝南',
    '阳光好',
    '有车位',
    '落地窗',
    'LOFT',
    '单身公寓'
])
//close
const close_2 = (room) => {
  rooms.value = rooms.value.filter((item) => item !== room )
}
</script>

<template>
  <div class="w-full h-full relative block overflow-y-scroll flow">
    <!-- 配套属性管理 -->
    <div class="w-full h-auto relative block mb-4">
      <el-card class="hov-shadow">
        <div class="w-full h-[100px] relative block">
          <!-- 公寓配套 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">公寓标签</span>
            <div style="width: calc(100% - 200px)" class="h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in apart"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="close_1(item)"
              >
                {{ item }}
              </el-tag>
            </div>
            <div class="w-[100px] h-full relative flex justify-center">
              <el-button type="primary" icon="Plus" class="my-auto">添加</el-button>
            </div>
          </div>
          <!-- 房间配套 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">房间标签</span>
            <div style="width: calc(100% - 200px)" class="h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in rooms"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="close_2(item)"
              >
                {{ item }}
              </el-tag>
            </div>
            <div class="w-[100px] h-full relative flex justify-center">
              <el-button type="primary" icon="Plus" class="my-auto">添加</el-button>
            </div>
          </div>
        </div>
        <template #header>
          <span class="text-black font-bold text-[15px]">配套属性管理</span>
        </template>
      </el-card>
    </div>
    <!-- 房间基本信息管理 -->
    <div class="w-full h-auto relative block mb-4">
      <el-card class="hov-shadow">
        <div class="w-full h-auto relative block">
          <!-- 户型 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">
              户型
              <el-icon class="my-auto"><Warning /></el-icon>
            </span>
            <div style="width: calc(100% - 200px)" class="h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in rooms"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="close_2(item)"
              >
                {{ item }}
              </el-tag>
            </div>
            <div class="w-[100px] h-full relative flex justify-center">
              <el-button type="primary" icon="Plus" class="my-auto">添加</el-button>
            </div>
          </div>
          <!-- 面积 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">
              面积
              <el-icon class="my-auto"><Warning /></el-icon>
            </span>
            <div style="width: calc(100% - 200px)" class="h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in rooms"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="close_2(item)"
              >
                {{ item }}
              </el-tag>
            </div>
            <div class="w-[100px] h-full relative flex justify-center">
              <el-button type="primary" icon="Plus" class="my-auto">添加</el-button>
            </div>
          </div>
          <!-- 朝向 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">
              朝向
              <el-icon class="my-auto"><Warning /></el-icon>
            </span>
            <div style="width: calc(100% - 200px)" class="h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in rooms"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="close_2(item)"
              >
                {{ item }}
              </el-tag>
            </div>
            <div class="w-[100px] h-full relative flex justify-center">
              <el-button type="primary" icon="Plus" class="my-auto">添加</el-button>
            </div>
          </div>
          <!-- 采光 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">
              采光
              <el-icon class="my-auto"><Warning /></el-icon>
            </span>
            <div style="width: calc(100% - 200px)" class="h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in rooms"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="close_2(item)"
              >
                {{ item }}
              </el-tag>
            </div>
            <div class="w-[100px] h-full relative flex justify-center">
              <el-button type="primary" icon="Plus" class="my-auto">添加</el-button>
            </div>
          </div>
          <!-- 卫生 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">
              卫生
              <el-icon class="my-auto"><Warning /></el-icon>
            </span>
            <div style="width: calc(100% - 200px)" class="h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in rooms"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="close_2(item)"
              >
                {{ item }}
              </el-tag>
            </div>
            <div class="w-[100px] h-full relative flex justify-center">
              <el-button type="primary" icon="Plus" class="my-auto">添加</el-button>
            </div>
          </div>
        </div>
        <template #header>
          <span class="text-black font-bold text-[15px]">房间基本信息管理</span>
        </template>
      </el-card>
    </div>
    <!-- 杂费信息管理 -->
    <div class="w-full h-auto relative block mb-4">
      <el-card class="hov-shadow">
        <div class="w-full h-auto relative block">
          <!-- 房租 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">
              房租
              <el-icon class="my-auto"><Warning /></el-icon>
            </span>
            <div style="width: calc(100% - 200px)" class="h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in rooms"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="close_2(item)"
              >
                {{ item }}
              </el-tag>
            </div>
            <div class="w-[100px] h-full relative flex justify-center">
              <el-button type="primary" icon="Plus" class="my-auto">添加</el-button>
            </div>
          </div>
          <!-- 水费 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">
              水费
              <el-icon class="my-auto"><Warning /></el-icon>
            </span>
            <div style="width: calc(100% - 200px)" class="h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in rooms"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="close_2(item)"
              >
                {{ item }}
              </el-tag>
            </div>
            <div class="w-[100px] h-full relative flex justify-center">
              <el-button type="primary" icon="Plus" class="my-auto">添加</el-button>
            </div>
          </div>
          <!-- 电费 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">
              电费
              <el-icon class="my-auto"><Warning /></el-icon>
            </span>
            <div style="width: calc(100% - 200px)" class="h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in rooms"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="close_2(item)"
              >
                {{ item }}
              </el-tag>
            </div>
            <div class="w-[100px] h-full relative flex justify-center">
              <el-button type="primary" icon="Plus" class="my-auto">添加</el-button>
            </div>
          </div>
          <!-- 采暖费 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">
              采暖费
              <el-icon class="my-auto"><Warning /></el-icon>
            </span>
            <div style="width: calc(100% - 200px)" class="h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in rooms"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="close_2(item)"
              >
                {{ item }}
              </el-tag>
            </div>
            <div class="w-[100px] h-full relative flex justify-center">
              <el-button type="primary" icon="Plus" class="my-auto">添加</el-button>
            </div>
          </div>
          <!-- 网费 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">
              网费
              <el-icon class="my-auto"><Warning /></el-icon>
            </span>
            <div style="width: calc(100% - 200px)" class="h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in rooms"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="close_2(item)"
              >
                {{ item }}
              </el-tag>
            </div>
            <div class="w-[100px] h-full relative flex justify-center">
              <el-button type="primary" icon="Plus" class="my-auto">添加</el-button>
            </div>
          </div>
        </div>
        <template #header>
          <span class="text-black font-bold text-[15px]">杂费信息管理</span>
        </template>
      </el-card>
    </div>
    <!-- copy right -->
    <CopyRight />
  </div>
</template>

<style scoped>
.flow {
  scrollbar-width: thin;
}
.hov-shadow {
  box-shadow: none;
}
.hov-shadow:hover {
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
}
.message-card {
  border: 1px solid #e1dede;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
}
.message-card:hover {
  transition: all 0.2s ease-in-out;
  border-color: #c0c6cc;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
}
</style>