<script setup>
const setting = defineProps({
  total: Number,
  pageSize: Number,
  pageCount: Number,
  background: Boolean,
  small: Boolean,
  hide: Boolean,
  disabled: Boolean,
  size: Number,
  //function
  currentChange: function () {},
})
</script>

<template>
  <div class="w-auto h-auto relative block">
    <el-pagination
        layout="prev, pager, next"
        :total="setting.total"
        :page-size="setting.pageSize"
        :page-count="setting.pageCount"
        :background="setting.background"
        :small="setting.small"
        :hide-on-single-page="setting.hide"
        :disabled="setting.disabled"
        :default-page-size="setting.size"
        @current-change="setting.currentChange"
    />
  </div>
</template>

<style scoped>

</style>