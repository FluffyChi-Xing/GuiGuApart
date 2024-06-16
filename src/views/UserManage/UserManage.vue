<script setup>
import { reactive } from "vue";
import { ref } from "vue";
import TableComponent from "@/components/common/TableComponent.vue";
import PaginationComponent from "@/components/common/PaginationComponent.vue";
import CopyRight from "@/components/common/CopyRight.vue";

//table data
const data = [
  {
    id: 1,
    name: '张三',
    password: 122131321,
    phone: 13144442453,
    dept: '经理',
    email: 'sqbdiwd@gmail.com',
  },
  {
    id: 2,
    name: '李四',
    password: 122131321,
    phone: 13144442453,
    dept: '销售',
    email: 'sqbdiwd@gmail.com',
  },
  {
    id: 3,
    name: '王五',
    password: 122131321,
    phone: 13144442453,
    dept: '管理员',
    email: 'sqbdiwd@gmail.com',
  },
  {
    id: 4,
    name: '赵六',
    password: 122131321,
    phone: 13144442453,
    dept: '管理员',
    email: 'sqbdiwd@gmail.com',
  },
  {
    id: 5,
    name: '王二麻子',
    password: 122131321,
    phone: 13144442453,
    dept: '管理员',
    email: 'sqbdiwd@gmail.com',
  },
  {
    id: 6,
    name: '程睿',
    password: 122131321,
    phone: 13144442453,
    dept: '管理员',
    email: 'sqbdiwd@gmail.com',
  }
];
const table = reactive({
  label: [
    {
      label: '序号',
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
      label: '岗位',
      prop: 'dept',
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
  multiple: false,
  highLight: true,
  maxHeight: '300',
  canEdit: true,
  isFixed: 'right',
  width: '300px',
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

//search  user
const value = ref()
//create user dialog show
const dialogShow = ref(false)
const createUser = reactive({
  username: '',
  password: '',
  phone: '',
  email: '',
  isRoot: '1',
  dept: '',
})
const dept = ref([
  {
    label: '经理',
    value: '1',
  },
  {
    label: '销售',
    value: '2',
  },
  {
    label: '管理',
    value: '3',
  }
])
</script>

<template>
  <div class="w-full h-full relative block overflow-hidden">
    <div style="height: calc(100% - 100px)" class="w-full block p-4 bg-white relative overflow-hidden mb-[10px]">
      <!-- top banner -->
      <div class="w-full h-14 relative flex">
        <!-- user search -->
        <div class="w-auto h-full relative flex">
          <el-input
              v-model="value"
              placeholder="请输入用户名..."
              clearable
              prefix-icon="User"
              style="width: 240px;height: 32px"
              class="my-auto"
          />
          <el-button type="primary" icon="Search" class="ml-4 my-auto">搜索</el-button>
          <!-- refresh button -->
          <el-button type="primary" icon="Refresh" class="ml-4 my-auto">刷新</el-button>
        </div>
        <!-- add new user button -->
        <el-button type="primary" icon="Plus" class="ml-auto" @click="dialogShow = true">添加</el-button>
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
            :current_change="currentChange"
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
    <!-- copyright -->
    <CopyRight />
    <!-- add new user dialog -->
    <el-dialog
        title="添加用户"
        v-model="dialogShow"
        width="500px"
        draggable
    >
      <div class="w-full h-auto relative block">
        <el-form
            v-model="createUser"
            label-width="auto"
            status-icon
        >
          <el-form-item label="用户名">
            <el-input
                v-model="createUser.username"
                placeholder="请输入用户名"
                clearable
                prefix-icon="User"
            />
          </el-form-item>
          <el-form-item label="密码">
            <el-input
                v-model="createUser.password"
                clearable
                type="password"
                placeholder="请输入密码"
                prefix-icon="Lock"
                show-password
            />
          </el-form-item>
          <el-form-item label="电话号">
            <el-input
                v-model="createUser.phone"
                clearable
                placeholder="请输入电话号码"
                prefix-icon="Iphone"
                maxlength="11"
                show-word-limit
            />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input
                v-model="createUser.email"
                placeholder="请输入邮箱"
                clearable
                prefix-icon="Message"
            />
          </el-form-item>
          <el-form-item label="部门">
            <el-select
                v-model="createUser.dept"
                placeholder="请选择部门"
            >
              <el-option
                  v-for="item in dept"
                  :key="item"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="权限">
            <el-radio-group
                v-model="createUser.isRoot"
            >
              <el-radio value="1">用户</el-radio>
              <el-radio value="2">管理员</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button type="primary" icon="Select">确认</el-button>
        <el-button @click="dialogShow = false" type="danger" icon="CircleClose">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>