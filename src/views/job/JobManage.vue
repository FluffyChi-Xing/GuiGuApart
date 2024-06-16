<script setup>
import { reactive,ref } from "vue";
import CopyRight from "@/components/common/CopyRight.vue";
import PaginationComponent from "@/components/common/PaginationComponent.vue";
import TableComponent from "@/components/common/TableComponent.vue";
import {Lock, Unlock} from "@element-plus/icons-vue";

//pagination setting
const pagination = reactive({
  pageCount: 10,
  hide: true,
  total: 50,
})

//table setting
const data = [
  {
    id: 1,
    name: '经理',
    sno: 'area manager',
    description: '区域经理',
    status: '正常',
  },
  {
    id: 2,
    name: '经理',
    sno: 'area manager',
    description: '区域经理',
    status: '正常',
  },
  {
    id: 3,
    name: '经理',
    sno: 'area manager',
    description: '区域经理',
    status: '正常',
  },
  {
    id: 4,
    name: '经理',
    sno: 'area manager',
    description: '区域经理',
    status: '正常',
  },
]
const table = reactive({
  labels: [
    {
      label: 'id',
      prop: 'id',
      width: '200px'
    },
    {
      label: '岗位名称',
      prop: 'name',
      width: '200px'
    },
    {
      label: '岗位代码',
      prop: 'sno',
      width: '200px'
    },
    {
      label: '岗位描述',
      prop: 'description',
      width: '200px'
    },
    {
      label: '状态',
      prop: 'status',
      width: '200px'
    }
  ],
  operation: [
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
    },
    {
      type: 'info',
      size: 'small',
      message: '冻结',
    },
    {
      type: 'primary',
      size: 'small',
      message: '解冻',
    }
  ],
  stripe: true,
  border: true,
  width: '300px',
  maxHeight: '300',
  highLight: true,
  multiple: false,
  canEdit: true,
  isFixed: 'right',
})

//add new job setting
const isShow = ref(false)
const jobs = reactive({
  name: '',
  sno: '',
  description: '',
  status: '1'
})
</script>

<template>
  <div class="w-full h-full relative block overflow-hidden">
    <!-- page body -->
    <div style="height: calc(100% - 100px)" class="w-full relative block p-4 bg-white overflow-hidden mb-[10px]">
      <!-- top banner -->
      <div class="w-full h-14 relative flex justify-between">
        <!-- refresh button -->
        <el-button type="primary" icon="Refresh" class="my-auto mr-4">刷新</el-button>
        <!-- add new button -->
        <el-button type="primary" icon="Plus" class="my-auto" @click="isShow = true">添加</el-button>
      </div>
      <!-- table body -->
      <div style="height: calc(100% - 112px)" class="w-full relative block">
        <TableComponent
            :data="data"
            :table="table.labels"
            :high-light="table.highLight"
            :border="table.border"
            :stripe="table.stripe"
            :multiple="table.multiple"
            :max-height="table.maxHeight"
            :is-fixed="table.isFixed"
            :operate-width="table.width"
            :operate="table.operation"
            :can-edit="table.canEdit"
        />
      </div>
      <!-- pagination -->
      <div class="w-full h-14 relative flex justify-center">
        <PaginationComponent
            :page-count="pagination.pageCount"
            :hide="pagination.hide"
            :total="pagination.total"
        />
      </div>
    </div>
    <!-- copy right -->
    <CopyRight />
    <!-- other -->
    <!-- add new job dialog -->
    <el-dialog
        title="添加岗位"
        width="500px"
        draggable
        v-model="isShow"
    >
      <div class="w-full h-auto relative block">
        <el-form
            v-model="jobs"
            label-width="auto"
        >
          <el-form-item label="名称">
            <el-input
                v-model="jobs.name"
                placeholder="请输入岗位名"
                clearable
                prefix-icon="User"
            />
          </el-form-item>
          <el-form-item label="岗位代码">
            <el-input
                v-model="jobs.sno"
                placeholder="请输入岗位代码"
                clearable
                prefix-icon="List"
            />
          </el-form-item>
          <el-form-item label="岗位描述">
            <el-input
                v-model="jobs.description"
                placeholder="请输入岗位描述"
                clearable
                prefix-icon="Warning"
            />
          </el-form-item>
          <el-form-item label="状态">
            <el-switch
                v-model="jobs.status"
                :active-value="1"
                :inactive-value="0"
                :active-action-icon="Unlock"
                :inactive-action-icon="Lock"
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <!-- save -->
        <el-button type="primary" icon="Select">确认添加</el-button>
        <!-- cancel -->
        <el-button type="danger" icon="CircleClose" @click="isShow = false">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>