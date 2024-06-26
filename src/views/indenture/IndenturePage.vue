<script setup>
import { reactive,ref } from "vue";
import CopyRight from "@/components/common/CopyRight.vue";
import PaginationComponent from "@/components/common/PaginationComponent.vue";

//pagination
const pagination = reactive({
  hide: true,
  total: 5,
  pageSize: 5,
})

//search value
const value = ref()
</script>

<template>
  <div class="w-full h-full relative block overflow-hidden">
    <!-- indenture page body -->
    <div style="height: calc(100% - 100px)" class="w-full relative block p-4 mb-4 bg-white overflow-hidden">
      <!-- top banner -->
      <div class="w-full h-14 relative flex">
        <!-- search banner -->
        <div class="w-auto h-full relative flex">
          <el-input
              v-model="value"
              clearable
              placeholder="请输入租约Id"
              prefix-icon="Management"
              style="width: 240px"
              class="my-auto h-8 mr-4"
          />
          <el-button type="primary" icon="Search" class="my-auto">搜索</el-button>
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
            :hide="pagination.hide"
            :page-size="pagination.pageSize"
        />
      </div>
    </div>
    <!-- copy right -->
    <CopyRight />
  </div>
</template>

<style scoped>

</style>