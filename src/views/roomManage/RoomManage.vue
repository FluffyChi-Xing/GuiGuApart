<script setup>
import { ref, reactive } from "vue";
import CopyRight from "@/components/common/CopyRight.vue";
import PaginationComponent from "@/components/common/PaginationComponent.vue";
import TableComponent from "@/components/common/TableComponent.vue";
import { onMounted } from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";

//pagination
const pagination = reactive({
  pageCount: 10,
  total: 50,
  hide: true,
})

//table constructor
//table data
const data = ref([])
const table = reactive({
  labels: [
    {
      label: '序号',
      prop: 'id',
      width: '100px',
    },
    {
      label: '房间名',
      prop: 'name',
      width: '150px'
    },
    {
      label: '房间号',
      prop: 'room_no',
      width: '100px',
    },
    {
      label: '租金',
      prop: 'cost',
      width: '200px',
    },
    {
      label: '公寓名',
      prop: 'apartment_name',
      width: '200px'
    },
    {
      label: '客房状态',
      prop: 'status',
      width: '200px',
    },
  ],
  canEdit: true,
  select: false,
  highLight: true,
  stripe: true,
  isFixed: 'right',
  border: true,
  width: '300px',
  maxHeight: '300',
  fit: true,
})
//operation
const operation = [
  {
    type: 'success',
    size: 'small',
    message: '上架',
  },
  {
    type: 'danger',
    size: 'small',
    message: '下架',
  },
  {
    type: 'primary',
    size: 'small',
    message: '修改',
  },
  {
    type: 'danger',
    size: 'small',
    message: '删除',
  },
];

//search value
const value = ref()
//get access
const getAccess = () => {
  return localStorage.getItem('access').toString();
}

//分页拉取数据
//pageNo & pageSize
const pageNo = ref(1)
const pageSize = 5;
const pullAll = () => {
  axios.get(`http://localhost:3000/rooms/pull?pageNo=${pageNo.value}&pageSize=${pageSize}`, {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      res.data.data.forEach((item) => {
        switch (item.status) {
          case 1:
            item.status = '上架/空闲中'
                break
          case 0:
            item.status = '已入住'
                break;
          case -1:
            item.status = '下架'
                break;
        }
        data.value.push(item)
      })
    } else {
      ElMessage({
        type: "warning",
        message: res.data.message,
      })
    }
  }).catch((err) => {
    console.log(err)
  })
}
//refresh function
const refresh = () => {
  //clear
  data.value = []
  //re pull
  pullAll()
}

//create room
const room = ref(false)
const roomForm = reactive({
  roomName: '',
  roomNo: 0,
  cost: 0,
  apart_id: 0,
})
const apart = ref([])
const submitRoom = () => {
  axios.post('http://localhost:3000/rooms/create', {
    room_id: roomForm.roomNo,
    room_name: roomForm.roomName,
    room_cost: roomForm.cost,
    apart_id: roomForm.apart_id,
  }, {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      ElMessage({
        type: "success",
        message: res.data.message,
      })
      room.value = false
      //clear
      data.value = []
      //re pull
      pullAll()
    } else {
      ElMessage({
        type: "warning",
        message: res.data.message,
      })
      room.value = false
    }
  }).catch((err) => {
    console.log(err);
  })
}
const createRoom = () => {
  room.value = true
  axios.get('http://localhost:3000/apartment/get', {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      apart.value = res.data.data;
    } else {
      ElMessage({
        type: "warning",
        message: res.data.message,
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
    <!-- page body -->
    <div style="height: calc(100% - 100px)" class="w-full relative block mb-[10px] overflow-hidden">
      <!-- inner -->
      <div class="w-full h-full relative block p-4 bg-white">
        <!-- header -->
        <div class="w-full h-14 relative flex">
          <!-- search by id -->
          <div class="w-auto h-full relative flex">
            <el-input
                v-model="value"
                placeholder="请输入房间序号..."
                prefix-icon="Warning"
                clearable
                style="width: 240px"
                class="h-8 my-auto mr-4"
            />
            <el-button type="primary" icon="Search" class="my-auto">搜索</el-button>
          </div>
          <!-- refresh button -->
          <el-button @click="refresh" type="primary" icon="Refresh" class="my-auto ml-4">刷新</el-button>
          <!-- create button -->
          <div class="w-auto h-full relative flex ml-auto justify-center">
            <el-button @click="createRoom" type="primary" icon="Plus" class="my-auto">添加</el-button>
          </div>
        </div>
        <!-- body -->
        <div style="height: calc(100% - 112px)" class=" w-full relative block">
          <TableComponent
              :data="data"
              :table="table.labels"
              :is-fixed="table.isFixed"
              :can-edit="table.canEdit"
              :high-light="table.highLight"
              :multiple="table.select"
              :operate-width="table.width"
              :operate="operation"
              :max-height="table.maxHeight"
              :border="table.border"
              :stripe="table.stripe"
              :fit="table.fit"
          />
        </div>
        <!-- footer -->
        <div class="w-full h-auto relative flex justify-center">
          <PaginationComponent
              :hide="pagination.hide"
              :page-count="pagination.pageCount"
              :total="pagination.total"
          />
        </div>
      </div>
    </div>
    <!-- copy right -->
    <CopyRight />
    <!-- dialogs -->
    <el-dialog
        width="500px"
        title="添加客房"
        v-model="room"
        draggable
    >
      <div class="w-full h-auto relative block">
        <el-form
            label-width="auto"
            v-model="roomForm"
        >
          <el-form-item label="客房号">
            <el-input
                v-model="roomForm.roomNo"
                maxlength="10"
                placeholder="请输入客房号"
                show-word-limit
                clearable
                prefix-icon="Warning"
            />
          </el-form-item>
          <el-form-item label="客房名">
            <el-input
                v-model="roomForm.roomName"
                placeholder="请输入客房名"
                prefix-icon="OfficeBuilding"
                clearable
            />
          </el-form-item>
          <el-form-item label="租金">
            <el-input
                v-model="roomForm.cost"
                placeholder="请输入租金"
                clearable
                prefix-icon="Ticket"
            />
          </el-form-item>
          <el-form-item label="所属公寓">
            <el-select
                v-model="roomForm.apart_id"
                placeholder="请选择所属公寓"
            >
              <el-option
                  v-for="item in apart"
                  :key="item"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="submitRoom" type="primary" icon="Select">确认添加</el-button>
        <el-button @click="room = false" type="danger" icon="CircleClose">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>