<script setup>

import CopyRight from "@/components/common/CopyRight.vue";
</script>

<template>
  <div class="w-full h-full relative block overflow-y-scroll flow">
    <!-- 配套属性管理 -->
    <div class="w-full h-auto relative block mb-4">
      <el-card class="hov-shadow">
        <div class="w-full h-[100px] relative block">
          <!-- 公寓配套 -->
          <div class="w-full h-[44px] relative block bg-red-950 mb-4">

          </div>
          <!-- 房间配套 -->
          <div class="w-full h-[44px] relative block bg-red-950 mb-4">

          </div>
        </div>
        <template #header>
          <span class="text-black font-bold text-[15px]">配套属性管理</span>
        </template>
      </el-card>
    </div>
    <!-- 标签信息管理 -->
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
</style>