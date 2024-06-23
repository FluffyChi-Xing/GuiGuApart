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
  total: 0,
  size: 5,
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
      prop: 'name',
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
    controller: () => reloadRoom(),
  },
  {
    type: 'danger',
    size: 'small',
    message: '下架',
    controller: () => frozenRoom(),
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

//current
const current = ref()
const currentChange = (item) => {
  current.value = item
}
//pagination change
const changePage = (current) => {
  pageNo.value = current
  //clear
  data.value = []
  //re pull
  pullAll()
}
//frozen room
const frozenRoom = () => {
  axios.get(`http://localhost:3000/rooms/frozen?id=${current.value.id}`, {
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
    console.log(err)
  })
}
//reload room
const reloadRoom = () => {
  axios.get(`http://localhost:3000/rooms/reload?id=${current.value.id}`, {
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
    console.log(err)
  })
}
//delete room


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
      pagination.total = res.data.count;
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
//search room
const searchRoom = () => {
  if (value.value) {
    axios.get(`http://localhost:3000/rooms/search?name=${value.value}`, {
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
        data.value = res.data.data
      } else {
        ElMessage({
          type: "warning",
          message: res.data.message,
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  } else {
    ElMessage({
      type: "warning",
      message: '请输入要搜索的客房名称',
    })
  }
}





//create room
const room = ref(false)
const roomForm = reactive({
  roomName: '',
  roomNo: 0,
  cost: 0,
  apart_id: 0,
  lease_id: 0,
  pay_method: 0,
  label_id: 0,
})
const apart = ref([])
const label = ref([])
const lease = ref([])
const pay = ref([])
const submitRoom = () => {
  axios.post('http://localhost:3000/rooms/create', {
    room_id: roomForm.roomNo,
    room_name: roomForm.roomName,
    room_cost: roomForm.cost,
    apart_id: roomForm.apart_id,
    lease_id: roomForm.lease_id,
    pay_method: roomForm.pay_method,
    label_id: roomForm.label_id,
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
//init apart
const initApart = () => {
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
//init lease
const initLease = () => {
  axios.get('http://localhost:3000/rooms/lease-relation', {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      lease.value = res.data.data;
    }
  }).catch((err) => {
    console.log(err)
  })
}
//init pay method
const initPay = () => {
  axios.get('http://localhost:3000/rooms/method', {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      pay.value = res.data.data;
    }
  }).catch((err) => {
    console.log(err)
  })
}
//init label
const initLabel = () => {
  axios.get('http://localhost:3000/rooms/label-relation', {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      label.value = res.data.data;
    }
  }).catch((err) => {
    console.log(err)
  })
}

const createRoom = () => {
  room.value = true
  //init apartment
  initApart();
  //init lease
  initLease()
  //init pay method
  initPay()
  //init label
  initLabel()
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
                placeholder="请输入房间名称..."
                prefix-icon="Warning"
                clearable
                style="width: 240px"
                class="h-8 my-auto mr-4"
            />
            <el-button @click="searchRoom" type="primary" icon="Search" class="my-auto">搜索</el-button>
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
              :current_change="currentChange"
          />
        </div>
        <!-- footer -->
        <div class="w-full h-auto relative flex justify-center">
          <PaginationComponent
              :hide="pagination.hide"
              :total="pagination.total"
              :page-size="pagination.size"
              :current-change="changePage"
          />
        </div>
      </div>
    </div>
    <!-- copy right -->
    <CopyRight />
    <!-- dialogs -->
    <!-- create room dialog -->
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
          <el-form-item label="支付方式">
            <el-select
                v-model="roomForm.pay_method"
                placeholder="请选择支付方式"
            >
              <el-option
                  v-for="item in pay"
                  :key="item"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
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
          <el-form-item label="租期">
            <el-select
                v-model="roomForm.lease_id"
                placeholder="请选择租期"
            >
              <el-option
                  v-for="item in lease"
                  :key="item"
                  :label="item.delay + item.lease_unit"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="宣传tag">
            <el-select
                v-model="roomForm.label_id"
                placeholder="请选择tags"
            >
              <el-option
                  v-for="item in label"
                  :key="item"
                  :value="item.id"
                  :label="item.name"
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
    <!-- update room dialog -->
  </div>
</template>

<style scoped>

</style>