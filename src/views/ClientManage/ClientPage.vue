<script setup>
import { reactive,ref } from "vue";
import CopyRight from "@/components/common/CopyRight.vue";
import PaginationComponent from "@/components/common/PaginationComponent.vue";
import TableComponent from "@/components/common/TableComponent.vue";
import { onMounted } from "vue";
import axios from "axios";
import {getAccess} from "@/utils/getAccess.js";
import {ElMessage} from "element-plus";
import {makeExcel} from "@/utils/makeExcel.js";

//pagination
const pagination = reactive({
  total: 5,
  pageSize: 5,
  hide: true,
})

//search value
const value = ref()

//table init
const table = reactive({
  highLight: true,
  multiple: false,
  canEdit: true,
  isFixed: 'right',
  width: '300px',
  maxHeight: '300',
  stripe: true,
  border: true,
});
//label
const labels = [
  {
    label: '序号',
    prop: 'id',
    width: '100px'
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
    label: '电话号码',
    prop: 'phone',
    width: '200px'
  },
  {
    label: '状态',
    prop: 'status',
    width: '200px'
  }
];
//data
const data = ref([])
//operation
const operation = [
  {
    type: 'danger',
    message: '删除',
    size: 'small'
  },
  {
    type: 'info',
    message: '冻结',
    size: 'small',
    controller: () => userFrozen(),
  },
  {
    type: 'success',
    message: '解禁',
    size: 'small',
    controller: () => reloadUser(),
  },
  {
    type: 'primary',
    message: '修改',
    size: 'small'
  }
]
//page init setting
const pageNo = ref(1)
const pageSize = 5;

//pull data
const pullAll = () => {
  axios.get(`http://localhost:3000/user/pull?pageNo=${pageNo.value}&pageSize=${pageSize}`, {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      res.data.data.forEach((item) => {
        if (item.status === 1) {
          item.status = '正常'
        } else {
          item.status = '封禁中'
        }
        data.value.push(item)
      })
    }
  }).catch((err) => {
    console.log(err);
  })
}

//refresh
const refresh = () => {
  //clear
  data.value = []
  //re pull
  pullAll()
}
//search user
const searchUser = () => {
  if (value.value) {
    axios.get(`http://localhost:3000/user/search?name=${value.value}`, {
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      },
    }).then((res) => {
      if (res.data.code === 200) {
        //clear
        data.value = []
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
//current
const current = ref()
//select one
const selectOne = (item) => {
  current.value = item
}

//user frozen
const userFrozen = () => {
  axios.get(`http://localhost:3000/user/frozen?id=${current.value.id}`, {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    },
  }).then((res) =>{
    if (res.data.code === 200) {
      ElMessage({
        type: "success",
        message: res.data.message,
      })
      //clear
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

//user reload
const reloadUser = () => {
  axios.get(`http://localhost:3000/user/reload?id=${current.value.id}`, {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
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

//download excel
//columns
const columns = [
  {
    header: '序号',
    key: 'id',
    width: 20
  },
  {
    header: '用户名',
    key: 'username',
    width: 20
  },
  {
    header: '密码',
    key: 'password',
    width: 30
  },
  {
    header: '电话号码',
    key: 'phone',
    width: 20
  },
  {
    header: '状态',
    key: 'status',
    width: 20
  }
]
const downloadExcel = async () => {
  const sheetName = 'client'
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
          <el-button @click="searchUser" class="my-auto" type="primary" icon="Search">搜索</el-button>
        </div>
        <!-- refresh -->
        <el-button @click="refresh" type="primary" icon="Refresh" class="my-auto ml-4">刷新</el-button>
        <!-- download excel -->
        <div class="w-auto h-full relative flex justify-center ml-auto">
          <el-button @click="downloadExcel" type="primary" icon="Document" class="my-auto">导出Excel</el-button>
        </div>
      </div>
      <!-- table body -->
      <div style="height: calc(100% - 112px)" class="w-full relative block">
        <TableComponent
            :data="data"
            :table="labels"
            :stripe="table.stripe"
            :high-light="table.highLight"
            :can-edit="table.highLight"
            :is-fixed="table.isFixed"
            :multiple="table.multiple"
            :max-height="table.maxHeight"
            :border="table.border"
            :operate-width="table.width"
            :operate="operation"
            :current_change="selectOne"
        />
      </div>
      <!-- pagination -->
      <div class="w-full h-14 relative flex justify-center">
        <PaginationComponent
            :total="pagination.total"
            :page-size="pagination.pageSize"
            :hide="pagination.hide"
            :current-change="changePage"
        />
      </div>
    </div>
    <!-- copy right component -->
    <CopyRight />
  </div>
</template>

<style scoped>

</style>