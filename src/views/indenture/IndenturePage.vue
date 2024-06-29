<script setup>
import { reactive,ref } from "vue";
import CopyRight from "@/components/common/CopyRight.vue";
import PaginationComponent from "@/components/common/PaginationComponent.vue";
import TableComponent from "@/components/common/TableComponent.vue";
import axios from "axios";
import {getAccess} from "@/utils/getAccess.js";
import { onMounted } from "vue";
import {ElMessage} from "element-plus";

//pagination
const pagination = reactive({
  hide: true,
  total: 5,
  pageSize: 5,
})

//search value
const value = ref()

//table init
const table = reactive({
  highLight: true,
  border: true,
  multiple: false,
  isFixed: 'right',
  canEdit: true,
  stripe: true,
  width: '200px',
  maxHeight: '300',
})
//data
const data = ref()
//labels
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
    label: '电话号',
    prop: 'phone',
    width: '200px'
  },
  {
    label: '公寓名',
    prop: 'apartment',
    width: '200px'
  },
  {
    label: '客房名',
    prop: 'room',
    width: '200px',
  },
  {
    label: '租金',
    prop: 'cost',
    width: '200px'
  },
  {
    label: '押金',
    prop: 'mortgage',
    width: '200px'
  },
  {
    label: '开始时间',
    prop: 'create_time',
    width: '200px'
  },
  {
    label: '截止时间',
    prop: 'finish_time',
    width: '200px'
  },
  {
    label: '状态',
    prop: 'status',
    width: '200px'
  }
];
//operation
const operation = [
  {
    message: '延长',
    type: 'primary',
    size: 'small',
    controller: () => openExtend(),
  },
  {
    message: '退房',
    type: 'danger',
    size: 'small',
    controller: () => checkOut(),
  },
  {
    message: '更改',
    type: 'success',
    size: 'small'
  }
];
//page setting
const pageNo = ref(1)
const pageSize = 5;

//pull data
const pullAll = () => {
  axios.get(`http://localhost:3000/indenture/pull?pageNo=${pageNo.value}&pageSize=${pageSize}`, {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    }
  }).then((res) => {
    if (res.data.code === 200) {
      //pageNo
      pagination.total = res.data.count;
      res.data.data.forEach((item) => {
        if (item.status === 0) {
          item.status = '未支付'
        } else if (item.status === 1) {
          item.status = '已支付'
        } else if (item.status === 2) {
          item.status = '已退房'
        }
      })
      data.value = res.data.data
    }
  }).catch((err) => {
    console.log(err)
  })
}
//refresh
const refresh = () => {
  data.value = []
  pullAll()
}

//查询租约
const search = () => {
  if (value.value) {
    axios.get(`http://localhost:3000/indenture/search?value=${value.value}`, {
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      }
    }).then((res) => {
      if (res.data.code === 200) {
        //clear
        data.value = []
        data.value = res.data.data
      }
    }).catch((err) => {
      console.log(err)
    })
  } else {
    ElMessage({
      message: '请输入租约Id',
      type: 'warning'
    })
  }
}

//change page
const changePage = (val) => {
  pageNo.value = val
  pullAll()
}
//current row
const currentRow = ref()
//select one
const selectOne = (val) => {
  currentRow.value = val
}
//退房
const checkOut = () => {
  if (currentRow.value) {
    axios.get(`http://localhost:3000/indenture/free?id=${currentRow.value.id}`, {
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      }
    }).then((res) => {
      if (res.data.code === 200) {
        ElMessage({
          message: res.data.message,
          type: 'success'
        })
        pullAll()
      } else {
        ElMessage({
          message: res.data.message,
          type: 'error'
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  } else {
    ElMessage({
      message: '请选择一行数据',
      type: 'warning'
    })
  }
}
//延长
const extend = ref(false)
const extendForm = reactive({
  id: '',
  time: ''
})
const openExtend = () => {
  if (currentRow.value) {
    extendForm.id = currentRow.value.id
    extend.value = true
  } else {
    ElMessage({
      message: '请选择一行数据',
      type: 'warning'
    })
  }
}
//submit extend
const submitExtend = () => {
  axios.get(`http://localhost:3000/indenture/extend?id=${extendForm.id}&time=${extendForm.time}`, {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    }
  }).then((res) => {
    if (res.data.code === 200) {
      ElMessage({
        message: res.data.message,
        type: 'success'
      })
      extend.value = false
      pullAll()
    } else {
      ElMessage({
        message: res.data.message,
        type: 'error'
      })
    }
  }).catch((err) => {
    console.log(err)
  })
}



//om
onMounted(() => {
  pullAll()
})
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
          <el-button @click="search" type="primary" icon="Search" class="my-auto">搜索</el-button>
        </div>
        <!-- refresh -->
        <el-button @click="refresh" type="primary" icon="Refresh" class="my-auto ml-4">刷新</el-button>
      </div>
      <!-- table body -->
      <div style="height: calc(100% - 112px)" class="w-full relative block">
           <TableComponent
               :data="data"
               :table="labels"
               :high-light="table.highLight"
               :is-fixed="table.isFixed"
               :can-edit="table.canEdit"
               :multiple="table.multiple"
               :operate="operation"
               :stripe="table.stripe"
               :border="table.border"
               :operate-width="table.width"
               :max-height="table.maxHeight"
               :current_change="selectOne"
           />
      </div>
      <!-- pagination -->
      <div class="w-full h-14 relative flex justify-center">
        <PaginationComponent
            :total="pagination.total"
            :hide="pagination.hide"
            :page-size="pagination.pageSize"
            :current-change="changePage"
        />
      </div>
    </div>
    <!-- copy right -->
    <CopyRight />
    <!-- dialogs -->
    <!-- extend dialog -->
    <el-dialog
        title="延长租约"
        v-model="extend"
        width="500px"
        draggable
    >
      <div class="w-full h-auto relative block">
        <el-form
            v-model="extendForm"
            label-width="auto"
        >
          <el-form-item label="请输入延长后的时间">
            <el-input
                v-model="extendForm.time"
                placeholder="请输入延长后的时间"
                prefix-icon="Timer"
                clearable
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="submitExtend" type="primary" icon="Select">确认延长</el-button>
        <el-button @click="extend = false" type="danger" icon="CircleClose">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>