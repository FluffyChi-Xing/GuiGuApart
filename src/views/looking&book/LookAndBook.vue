<script setup>
import { reactive,ref } from "vue";
import CopyRight from "@/components/common/CopyRight.vue";
import PaginationComponent from "@/components/common/PaginationComponent.vue";
import TableComponent from "@/components/common/TableComponent.vue";
import axios from "axios";
import { onMounted } from "vue";
import {ElMessage} from "element-plus";

//table data setting
const data = ref([])
const table = reactive({
  label: [
    {
      label: '序号',
      prop: 'id',
      width: '200px'
    },
    {
      label: '姓名',
      prop: 'username',
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
      prop: 'create_time',
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
      message: '拒绝',
      size: 'small',
      controller: () => refuseBook(),
    },
    {
      type: 'danger',
      size: 'small',
      message: '删除',
      controller: () => deleteBook(),
    },
    {
      type: 'info',
      size: 'small',
      message: '批准',
      controller: () => acceptBook(),
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
//pagination
const pagination = reactive({
  hide: true,
  total: 0,
  size: 5,
})

//search
const value = ref()

//get access
const getAccess = () => {
  return localStorage.getItem('access').toString();
}
//base page settings
const pageNo = ref(1)
const pageSize = 5;

//pull data
const pullAll = () => {
  axios.get(`http://localhost:3000/book/pull?pageNo=${pageNo.value}&pageSize=${pageSize}`, {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      pagination.total = res.data.count;
      res.data.data.forEach((item) => {
        if (item.status === 1) {
          item.status = '预约中'
        }
        if (item.status === 0) {
          item.status = '已批准'
        }
        if (item.status === -1) {
          item.status = '已拒绝'
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
  //clear
  data.value = [];
  //re pull
  pullAll();
}
//search book info
const searchBook = () => {
  if (value.value) {
    axios.get(`http://localhost:3000/book/search?username=${value.value}`, {
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
  } else {
    ElMessage({
      type: "warning",
      message: '用户名不可为空',
    })
  }
}

//current
const current = ref()
const selectOne = (select) => {
  current.value = select;
}
//accept book
const acceptBook = () => {
  axios.get(`http://localhost:3000/book/access?id=${current.value.id}`, {
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
//拒绝预约
const refuseBook = () => {
  axios.get(`http://localhost:3000/book/refuse?id=${current.value.id}`, {
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
//删除预约
const deleteBook = () => {
  axios.get(`http://localhost:3000/book/delete?id=${current.value.id}`, {
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
  //pull data
  pullAll()
})
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
          <el-button @click="searchBook" type="primary" class="ml-4 my-auto" icon="Search">搜索</el-button>
        </div>
        <!-- refresh -->
        <el-button @click="refresh" type="primary" icon="Refresh" class="ml-4 my-auto">刷新</el-button>
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
            :current_change="selectOne"
        />
      </div>
      <!-- pagination -->
      <div class="w-full h-14 relative flex justify-center">
        <PaginationComponent
            :size="pagination.size"
            :hide="pagination.hide"
            :total="pagination.total"
            :current-change="changePage"
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