<script setup>
import { reactive } from "vue";
import { ref } from "vue";
import TableComponent from "@/components/common/TableComponent.vue";
import PaginationComponent from "@/components/common/PaginationComponent.vue";
import CopyRight from "@/components/common/CopyRight.vue";
import { onMounted } from "vue";
import axios from "axios";
import {getAccess} from "@/utils/getAccess.js";
import {ElMessage} from "element-plus";
import {makeExcel} from "@/utils/makeExcel.js";

//table data
const columns = [
  {
    header: '序号',
    key: 'id',
    width: 20
  },
  {
    header: '员工名',
    key: 'username',
    width: 30
  },
  {
    header: '密码',
    key: 'password',
    width: 30,
  },
  {
    header: '岗位',
    key: 'dept',
    width: 20
  },
  {
    header: '电话',
    key: 'phone',
    width: 30
  },
  {
    header: '邮箱',
    key: 'email',
    width: 30
  },
  {
    header: '状态',
    key: 'status',
    width: 20
  }
];
const data = ref([]);
const table = reactive({
  label: [
    {
      label: '序号',
      prop: 'id',
      width: '200px'
    },
    {
      label: '用户名',
      prop: 'username',
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
    },
    {
      label: '状态',
      prop: 'status',
      width: '200px',
    }
  ],
  operate: [
    {
      type: 'info',
      size: 'small',
      message: '冻结',
      controller: () => employeeFrozen(),
    },
    {
      type: 'success',
      size: 'small',
      message: '解冻',
      controller: () => accountReload(),
    }
  ],
  multiple: false,
  highLight: true,
  maxHeight: '300',
  canEdit: true,
  isFixed: 'right',
  width: '150px',
  stripe: true,
  border: true,
})
//init pagination
const pages = reactive({
  total: 5,
  hide: true,
  pageSize: 5,
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


//page base setting
const pageNo = ref(1)
const pageSize = 5;

//pull data
const pullAll = () => {
  axios.get(`http://localhost:3000/employee/pull?pageNo=${pageNo.value}&pageSize=${pageSize}`, {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      pages.total = res.data.count;
      res.data.data.forEach((item) => {
        if (item.dept === 0) {
          item.dept = '管理员'
        } else {
          item.dept = '销售'
        }
        if (item.status === 1) {
          item.status = '正常'
        } else {
          item.status = '封禁中'
        }
        data.value.push(item);
      })
    }
  }).catch((err) => {
    console.log(err);
  })
}
//refresh
const refresh = () => {
  //clear data
  data.value = []
  //re pull
  pullAll()
}

//search employee
const search = () => {
  if (value.value) {
    axios.get(`http://localhost:3000/employee/search?name=${value.value}`, {
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      },
    }).then((res) => {
      if (res.data.code === 200) {
        //clear data
        data.value = []
        //重新赋值
        data.value = res.data.data;
      } else {
        ElMessage({
          type: "warning",
          message: res.data.message,
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  } else {
    ElMessage({
      type: "warning",
      message: '请输入用户名'
    })
  }
}

//current change
const current = ref()
const currentChange = (item) => {
  current.value = item
}
//frozen employee
const employeeFrozen = () => {
  axios.get(`http://localhost:3000/employee/frozen?id=${current.value.id}`, {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      ElMessage({
        type: "success",
        message: res.data.message,
      })
      //clear data
      data.value = []
      //re pull
      pullAll()
    } else {
      ElMessage({
        type: "warning",
        message: res.data.message,
      })
    }
  }).catch((err) => {
    console.log(err);
  })
}
//reload account
const accountReload = () => {
  axios.get(`http://localhost:3000/employee/reuse?id=${current.value.id}`, {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    }
  }).then((res) => {
    if (res.data.code === 200) {
      //clear data
      data.value = []
      //re pull
       pullAll()
    } else {
      ElMessage({
        type: "warning",
        message: res.data.message
      })
    }
  }).catch((err) =>{
    console.log(err);
  })
}
//download excel
const downloadExcel = async () => {
  const sheetName = 'employee'
  const response = await makeExcel(sheetName, columns, data.value)
  const blob = new Blob([response.buffer]);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${sheetName}.xlsx`;
  document.body.appendChild(link);
  link.click();
  link.addEventListener('click', () => {
    link.remove();
  });
}

//create employee
//dept
const dept = [
  {
    label: '管理员',
    value: 0,
  },
  {
    label: '销售',
    value: 1
  }
]
//submit
const submitEmployee = () => {
  if (createUser.dept && createUser.username) {
    axios.post('http://localhost:3000/employee/create', {
      username: createUser.username,
      password: createUser.password,
      phone: createUser.phone,
      email: createUser.email,
      dept: createUser.dept,
    }, {
      headers: {
        Authorization:`Bearer ${getAccess()}`,
      },
    }).then((res) => {
      if (res.data.code === 200) {
        ElMessage({
          type: "success",
          message: res.data.message,
        })
        //clear
        data.value = []
        //re pull
        pullAll();
        //show
        dialogShow.value = false
      } else {
        ElMessage({
          type: "warning",
          message: res.data.message,
        })
        dialogShow.value = false
      }
    }).catch((err) => {
      console.log(err);
    })
  } else {
    ElMessage({
      type: "warning",
      message: '参数不能为空'
    })
    dialogShow.value = false
  }
}
//change page
const changePage = (current) => {
  pageNo.value = current
  //clear
  data.value = []
  //re pull
  pullAll()
}




//om
onMounted(() => {
  //pull all data
  pullAll()
})
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
          <el-button @click="search" type="primary" icon="Search" class="ml-4 my-auto">搜索</el-button>
          <!-- refresh button -->
          <el-button @click="refresh" type="primary" icon="Refresh" class="ml-4 my-auto">刷新</el-button>
        </div>
        <!-- add new user button -->
        <el-button type="primary" icon="Plus" class="ml-auto" @click="dialogShow = true">添加</el-button>
        <!-- download excel table -->
        <el-button @click="downloadExcel" type="primary" icon="Document" class="ml-4">导出Excel</el-button>
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
            :page-size="pages.pageSize"
            :current-change="changePage"
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
        </el-form>
      </div>
      <template #footer>
        <el-button @click="submitEmployee" type="primary" icon="Select">确认</el-button>
        <el-button @click="dialogShow = false" type="danger" icon="CircleClose">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>