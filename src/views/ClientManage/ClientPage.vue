<script setup>
import { reactive,ref } from "vue";
import CopyRight from "@/components/common/CopyRight.vue";
import PaginationComponent from "@/components/common/PaginationComponent.vue";

//pagination
const pagination = reactive({
  total: 5,
  pageSize: 5,
  hide: true,
})

//search value
const value = ref()
</script>

<template>
  <!-- client page -->
  <div class="w-full h-full relative block overflow-hidden">
    <!-- page body -->
    <div style="height: calc(100% - 100px)" class="w-full mb-4 relative bg-white block p-4 overflow-hidden">
      <!-- top banner -->
      <div class="w-full h-14 relative flex">
        <!-- search bundle -->
        <div class="w-auto h-full relative flex">
          <el-input
              v-model="value"
              clearable
              placeholder="请输入客户名"
              prefix-icon="User"
              style="width: 240px;height: 32px"
              class="my-auto mr-4"
          />
          <el-button class="my-auto" type="primary" icon="Search">搜索</el-button>
        </div>
        <!-- refresh -->
        <el-button type="primary" icon="Refresh" class="my-auto ml-4">刷新</el-button>
      </div>
      <!-- table body -->
      <div style="height: calc(100% - 112px)" class="w-full relative block bg-amber-600">

      </div>
      <!-- pagination -->
      <div class="w-full h-14 relative flex justify-center">
        <PaginationComponent
            :total="pagination.total"
            :page-size="pagination.pageSize"
            :hide="pagination.hide"
        />
      </div>
    </div>
    <!-- copy right component -->
    <CopyRight />
  </div>
</template>

<style scoped>

</style>