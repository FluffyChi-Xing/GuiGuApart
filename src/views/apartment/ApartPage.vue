<script setup>
import { reactive,ref } from "vue";
import CopyRight from "@/components/common/CopyRight.vue";
import PaginationComponent from "@/components/common/PaginationComponent.vue";
import TableComponent from "@/components/common/TableComponent.vue";
import axios from "axios";
import { onMounted } from "vue";
import {ElMessage} from "element-plus";

//pagination
const pagination = reactive({
  hide: true,
  total: 0,
  size: 5,
})

//search value
const value = ref()

//init table
const table = reactive({
  label: [
    {
      label: '序号',
      prop: 'id',
      width: '150px',
    },
    {
      label: '名称',
      prop: 'name',
      width: '200px'
    },
    {
      label: '空闲房间数',
      prop: 'empty',
      width: '200px'
    },
    {
      label: '房间总数',
      prop: 'total',
      width: '200px'
    },
    {
      label: '所在省份',
      prop: 'province',
      width: '200px'
    },
    {
      label: '所在市县',
      prop: 'city',
      width: '200px'
    },
    {
      label: '所在区域',
      prop: 'district',
      width: '200px'
    },
    {
      label: '联系电话',
      prop: 'phone',
      width: '200px'
    },
    {
      label: '上架状态',
      prop: 'status',
      width: '200px'
    }
  ],
  highLight: true,
  border: true,
  multiple: false,
  isFixed: 'right',
  width: '300px',
  maxHeight: '300',
  canEdit: true,
  stripe: true,
})
//data
const data = ref([])
//operation
const operation = ref([
  {
    type: 'primary',
    message: '修改',
    size: 'small'
  },
  {
    type: 'success',
    message: '上架',
    size: 'small'
  },
  {
    type: 'info',
    message: '下架',
    size: 'small',
    controller: () => frozenApart(),
  },
  {
    type: 'danger',
    message: '删除',
    size: 'small'
  }
])

//get access
const getAccess = () => {
  return localStorage.getItem('access').toString();
}
//page settings
//pageNo
const pageNo = ref(1)
//pageSize
const pageSize = 5;

//pull data
const pullAll = () => {
  axios.get(`http://localhost:3000/apartment/pull?pageNo=${pageNo.value}&pageSize=${pageSize}`, {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      pagination.total = res.data.count;
      res.data.data.forEach((item) => {
        switch (item.status) {
          case 1:
            item.status = '已上架'
                break;
          case 0:
            item.status = '已下架'
                break;
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
  data.value = []
  //re pull
  pullAll()
}
//create apartment
const apart = ref(false)
const apartForm = reactive({
  name: '',
  location: ref(),
  description: '',
  phone: '',
})
const location = ref([])
//init location
const initLocation = () => {
  axios.get('http://localhost:3000/location/pull', {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      location.value = res.data.data;
    }
  }).catch((err) => {
    console.log(err);
  })
}
//create apartment
const createApart = () => {
  apart.value = true
  //init location
  initLocation()
}
//create apartment
const submitApart = () => {
  if (apartForm.name && apartForm.phone) {
    axios.post('http://localhost:3000/apartment/create', {
      name: apartForm.name,
      phone: apartForm.phone,
      description: apartForm.description,
      province: apartForm.location.province,
      province_id: apartForm.location.province_id,
      city: apartForm.location.city,
      city_id: apartForm.location.city_id,
      district: apartForm.location.district,
      district_id: apartForm.location.district_id,
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
        apart.value = false
        //clear
        data.value = []
        //re pull
        pullAll()
      } else {
        ElMessage({
          type: "warning",
          message: res.data.message,
        })
        apart.value = false
      }
    }).catch((err) => {
      console.log(err);
    })
  } else {
    ElMessage({
      type: "warning",
      message: '请完善信息',
    })
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
//search apartment
const searchApart = () => {
  if (value.value) {
    axios.get(`http://localhost:3000/apartment/search?name=${value.value}`, {
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
      message: '请输入公寓名',
    })
  }
}

//select one
const current = ref()
const selectOne = (item) => {
  current.value = item
}

//apartment frozen
const frozenApart = () => {
  axios.get(`http://localhost:3000/apartment/frozen?id=${current.value.id}`, {
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





//om
onMounted(() => {
  pullAll()
})
</script>

<template>
  <div class="w-full h-full relative block overflow-hidden">
    <!-- page body -->
    <div style="height: calc(100% - 100px)" class="w-full relative p-4 block mb-4 bg-white overflow-hidden">
      <!-- control banner -->
      <div class="w-full h-14 relative flex">
        <!-- search banner -->
        <div class="h-full w-auto relative flex mr-4">
          <el-input
              v-model="value"
              placeholder="请输入要搜索的公寓名"
              prefix-icon="OfficeBuilding"
              clearable
              class="mr-4 my-auto"
              style="height: 32px;width: 240px"
          />
          <el-button @click="searchApart" type="primary" icon="Search" class="my-auto">搜索</el-button>
        </div>
        <!-- refresh button -->
        <el-button @click="refresh" type="primary" icon="Refresh" class="my-auto">刷新</el-button>
        <!-- add apart button -->
        <div class="w-auto h-full relative flex ml-auto justify-center">
          <el-button @click="createApart" type="primary" icon="Plus">添加公寓</el-button>
        </div>
      </div>
      <!-- table body -->
      <div style="height: calc(100% - 112px)" class="w-full relative block">
        <TableComponent
            :data="data"
            :table="table.label"
            :high-light="table.highLight"
            :stripe="table.stripe"
            :border="table.border"
            :max-height="table.maxHeight"
            :multiple="table.multiple"
            :can-edit="table.canEdit"
            :is-fixed="table.isFixed"
            :operate="operation"
            :operate-width="table.width"
            :current_change="selectOne"
        />
      </div>
      <!-- pagination -->
      <div class="w-full h-14 relative flex justify-center">
        <PaginationComponent
            :total="pagination.total"
            :hide="pagination.hide"
            :size="pagination.size"
            :current-change="changePage"
        />
      </div>
    </div>
    <!-- copy right -->
    <CopyRight />
    <!-- dialog -->
    <!-- create apart dialog -->
    <el-dialog
        v-model="apart"
        width="500px"
        title="添加公寓"
        draggable
    >
      <div class="w-full h-auto relative block">
        <el-form
            v-model="apartForm"
            label-width="auto"
        >
          <el-form-item label="公寓名">
            <el-input
                v-model="apartForm.name"
                placeholder="请输入公寓名称"
                clearable
                prefix-icon="OfficeBuilding"
            />
          </el-form-item>
          <el-form-item label="位置">
            <el-select
                v-model="apartForm.location"
                placeholder="请选择所在位置"
            >
              <el-option
                  v-for="item in location"
                  :key="item"
                  :label="item.province"
                  :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="前台电话">
            <el-input
                v-model="apartForm.phone"
                placeholder="请输入前台电话"
                clearable
                maxlength="11"
                show-word-limit
                prefix-icon="Iphone"
            />
          </el-form-item>
          <el-form-item label="备注">
            <el-input
                v-model="apartForm.description"
                placeholder="请输入备注"
                clearable
                prefix-icon="Warning"
                maxlength="120"
                show-word-limit
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="submitApart" type="primary" icon="Select">确认添加</el-button>
        <el-button @click="apart = false" type="danger" icon="CircleClose">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>