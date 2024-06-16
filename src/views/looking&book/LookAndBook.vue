<script setup>
import { reactive,ref } from "vue";
import CopyRight from "@/components/common/CopyRight.vue";
import PaginationComponent from "@/components/common/PaginationComponent.vue";
import TableComponent from "@/components/common/TableComponent.vue";

//pagination setting
const pagination = reactive({
  pageCount: 10,
  hide: true,
  total: 50,
})

//table data setting
const data = ref([
  {
    id: 1,
    name: '张三',
    province: '列奥宁',
    phone: 12313131212,
    city: '答利安',
    district: '甘井子',
    apartment: '汤城一品A座1209',
    value: 'noavbisavbsovbsao son sp',
    time: '2024-09-18',
    status: '预约中'
  },
  {
    id: 2,
    name: '张三',
    province: '列奥宁',
    phone: 12313131212,
    city: '答利安',
    district: '甘井子',
    apartment: '汤城一品A座1209',
    value: 'noavbisavbsovbsao son sp',
    time: '2024-09-18',
    status: '预约中'
  },
  {
    id: 3,
    name: '张三',
    province: '列奥宁',
    phone: 12313131212,
    city: '答利安',
    district: '甘井子',
    apartment: '汤城一品A座1209',
    value: 'noavbisavbsovbsao son sp',
    time: '2024-09-18',
    status: '预约中'
  },
  {
    id: 4,
    name: '张三',
    province: '列奥宁',
    phone: 12313131212,
    city: '答利安',
    district: '甘井子',
    apartment: '汤城一品A座1209',
    value: 'noavbisavbsovbsao son sp',
    time: '2024-09-18',
    status: '预约中'
  },
])
const table = reactive({
  label: [
    {
      label: '序号',
      prop: 'id',
      width: '200px'
    },
    {
      label: '姓名',
      prop: 'name',
      width: '200px'
    },
    {
      label: '电话号',
      prop: 'phone',
      width: '200px'
    },
    {
      label: '所处省份',
      prop: 'province',
      width: '200px'
    },
    {
      label: '所处城市',
      prop: 'city',
      width: '200px'
    },
    {
      label: '所处区',
      prop: 'district',
      width: '200px'
    },
    {
      label: '所处公寓',
      prop: 'apartment',
      width: '200px'
    },
    {
      label: '备注',
      prop: 'value',
      width: '200px',
      expand: 'expand',
    },
    {
      label: '预约时间',
      prop: 'time',
      width: '200px'
    },
    {
      label: '预约状态',
      prop: 'status',
      width: '200px'
    }
  ],
  operation: [
    {
      type: 'primary',
      message: '修改',
      size: 'small',
    },
    {
      type: 'danger',
      size: 'small',
      message: '删除',
    },
    {
      type: 'info',
      size: 'small',
      message: '批准',
    },
  ],
  stripe: true,
  border: true,
  width: '200px',
  maxHeight: '300',
  highLight: true,
  multiple: false,
  canEdit: true,
  isFixed: 'right',
})

//search
const value = ref()
</script>

<template>
  <div class="w-full h-full relative block overflow-hidden">
    <!-- page body -->
    <div style="height: calc(100% - 100px)" class="w-full relative block bg-white p-4 mb-4">
      <!-- top banner -->
      <div class="w-full h-14 relative flex overflow-hidden">
        <!-- search input -->
        <div class="w-auto h-full relative flex">
          <el-input
              v-model="value"
              placeholder="请输入姓名"
              clearable
              prefix-icon="User"
              style="width: 240px"
              class="my-auto"
          />
          <el-button type="primary" class="ml-4 my-auto" icon="Search">搜索</el-button>
        </div>
        <!-- refresh -->
        <el-button type="primary" icon="Refresh" class="ml-4 my-auto">刷新</el-button>
      </div>
      <!-- table body -->
      <div style="height: calc(100% - 112px)" class="w-full relative block">
        <TableComponent
            :data="data"
            :table="table.label"
            :stripe="table.stripe"
            :high-light="table.highLight"
            :can-edit="table.canEdit"
            :border="table.border"
            :max-height="table.maxHeight"
            :operate="table.operation"
            :operate-width="table.width"
            :multiple="table.multiple"
            :is-fixed="table.isFixed"
        />
      </div>
      <!-- pagination -->
      <div class="w-full h-14 relative flex justify-center">
        <PaginationComponent
            :total="pagination.total"
            :hide="pagination.hide"
            :page-count="pagination.pageCount"
        />
      </div>
    </div>
    <!-- copyright -->
    <CopyRight />
    <!-- other -->
  </div>
</template>

<style scoped>

</style>