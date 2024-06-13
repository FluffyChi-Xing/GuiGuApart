<script setup>
import { reactive } from "vue";
import TableComponent from "@/components/common/TableComponent.vue";
import PaginationComponent from "@/components/common/PaginationComponent.vue";

//table data
const data = [
  {
    id: 1,
    name: '张三',
    password: 122131321,
    phone: 13144442453,
    email: 'sqbdiwd@gmail.com',
    value: '这个错误提示是因为在 instanceof 检查中，函数的原型是 ' +
        '\'undefined\'。这可能是因为在定义函数时，没有正确地设置原型' +
        '。为了解决这个问题，你需要检查你的代码，确保在定义函数时正确地' +
        '设置了原型。'
  },
  {
    id: 2,
    name: '李四',
    password: 122131321,
    phone: 13144442453,
    email: 'sqbdiwd@gmail.com',
    value: '这个错误提示是因为在 instanceof 检查中，函数的原型是 ' +
        '\'undefined\'。这可能是因为在定义函数时，没有正确地设置原型' +
        '。为了解决这个问题，你需要检查你的代码，确保在定义函数时正确地' +
        '设置了原型。'
  },
  {
    id: 3,
    name: '王五',
    password: 122131321,
    phone: 13144442453,
    email: 'sqbdiwd@gmail.com',
    value: '这个错误提示是因为在 instanceof 检查中，函数的原型是 ' +
        '\'undefined\'。这可能是因为在定义函数时，没有正确地设置原型' +
        '。为了解决这个问题，你需要检查你的代码，确保在定义函数时正确地' +
        '设置了原型。'
  },
  {
    id: 4,
    name: '赵六',
    password: 122131321,
    phone: 13144442453,
    email: 'sqbdiwd@gmail.com',
    value: '这个错误提示是因为在 instanceof 检查中，函数的原型是 ' +
        '\'undefined\'。这可能是因为在定义函数时，没有正确地设置原型' +
        '。为了解决这个问题，你需要检查你的代码，确保在定义函数时正确地' +
        '设置了原型。'
  },
  {
    id: 5,
    name: '王二麻子',
    password: 122131321,
    phone: 13144442453,
    email: 'sqbdiwd@gmail.com',
    value: '这个错误提示是因为在 instanceof 检查中，函数的原型是 ' +
        '\'undefined\'。这可能是因为在定义函数时，没有正确地设置原型' +
        '。为了解决这个问题，你需要检查你的代码，确保在定义函数时正确地' +
        '设置了原型。'
  },
  {
    id: 6,
    name: '程睿',
    password: 122131321,
    phone: 13144442453,
    email: 'sqbdiwd@gmail.com',
    value: '这个错误提示是因为在 instanceof 检查中，函数的原型是 ' +
        '\'undefined\'。这可能是因为在定义函数时，没有正确地设置原型' +
        '。为了解决这个问题，你需要检查你的代码，确保在定义函数时正确地' +
        '设置了原型。'
  }
];
const table = reactive({
  label: [
    {
      label: 'id',
      prop: 'id',
      width: '200px'
    },
    {
      label: '用户名',
      prop: 'name',
      width: '200px'
    },
    {
      label: '密码',
      prop: 'password',
      width: '200px'
    },
    {
      label: '电话号',
      prop: 'phone',
      width: '200px'
    },
    {
      label: '邮箱',
      prop: 'email',
      width: '200px'
    },
    {
      label: '个人简介',
      prop: 'value',
      expand: 'expand',
      width: '200px'
    }
  ],
  operate: [
    {
      type: 'primary',
      message: '修改',
      size: 'small',
      disabled: true,
    },
    {
      type: 'danger',
      size: 'small',
      message: '删除',
    }
  ],
  multiple: false,
  highLight: true,
  maxHeight: '473',
  canEdit: true,
  isFixed: 'right',
  width: '150px',
  stripe: true,
  border: true,
})
//current change
const currentChange = (current) => {
  console.log(current)
}
//init pagination
const pages = reactive({
  total: 50,
  hide: true,
  pageCount: 10,
})
</script>

<template>
  <div class="w-full h-full relative block p-4 bg-white overflow-hidden">
    <!-- top banner -->
    <div class="w-full h-14 relative block">

    </div>
    <!-- table body -->
    <div style="height: calc(100% - 112px)" class="w-full relative block overflow-hidden">
      <TableComponent
          :data="data"
          :table="table.label"
          :is-fixed="table.isFixed"
          :high-light="table.highLight"
          :can-edit="table.canEdit"
          :operate="table.operate"
          :stripe="table.stripe"
          :max-height="table.maxHeight"
          :operate-width="table.width"
          :border="table.border"
      />
    </div>
    <!-- pagination -->
    <div class="w-full h-14 relative flex justify-center">
      <PaginationComponent
          :total="pages.total"
          :hide="pages.hide"
          :page-count="pages.pageCount"
      />
    </div>
  </div>
</template>

<style scoped>

</style>