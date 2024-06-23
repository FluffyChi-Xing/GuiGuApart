<script setup>
import { reactive,ref } from "vue";
import CopyRight from "@/components/common/CopyRight.vue";
import PaginationComponent from "@/components/common/PaginationComponent.vue";

//pagination
const pagination = reactive({
  hide: true,
  total: 0,
  size: 5,
})
</script>

<template>
  <div class="w-full h-full relative block overflow-hidden">
    <!-- page body -->
    <div style="height: calc(100% - 100px)" class="w-full relative block mb-4 overflow-hidden">
      <!-- control banner -->
      <div class="w-full h-14 relative flex bg-red-950">

      </div>
      <!-- table body -->
      <div style="height: calc(100% - 112px)" class="w-full relative block">

      </div>
      <!-- pagination -->
      <div class="w-full h-14 relative flex justify-center">
        <PaginationComponent
            :total="pagination.total"
            :hide="pagination.hide"
            :size="pagination.size"
        />
      </div>
    </div>
    <!-- copy right -->
    <CopyRight />
    <!-- dialog -->
  </div>
</template>

<style scoped>

</style>