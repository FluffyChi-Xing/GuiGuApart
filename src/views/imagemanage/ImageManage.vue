<script setup>
import { reactive,ref } from "vue";
import CopyRight from "@/components/common/CopyRight.vue";
import PaginationComponent from "@/components/common/PaginationComponent.vue";
import TableComponent from "@/components/common/TableComponent.vue";
import { onMounted } from "vue";
import axios from "axios";
import {getAccess} from "@/utils/getAccess.js";
import {ElMessage} from "element-plus";
import {uploadService} from "@/utils/upload-service.js";

//pagination
const pagination = reactive({
  total: 5,
  pageSize: 5,
  hide: true,
})

//search
const value = ref()
//select
const select = ref()
const option = [
  {
    id: 1,
    label: '默认',
    value: 1,
  },
  {
    id: 2,
    label: '按客房分类',
    value: 2,
  },
  {
    id: 3,
    label: '按公寓分类',
    value: 3
  }
]

//table init
const table = reactive({
  highLight: true,
  border: true,
  multiple: false,
  maxHeight: '300',
  width: '140px',
  stripe: true,
  canEdit: true,
  isFixed: 'right'
})
const label = [
  {
    label: '序号',
    prop: 'id',
    width: '100px'
  },
  {
    label: '图片链接',
    prop: 'url',
    width: '100px',
    expand: 'expand',
  },
  {
    label: '公寓名',
    prop: 'apartment',
    width: '200px'
  },
  {
    label: '客房名',
    prop: 'room',
    width: '200px'
  },
  {
    label: '创建时间',
    prop: 'create_time',
    width: '250px'
  },
  {
    label: '修改时间',
    prop: 'update_time',
    width: '250px'
  }
]
const data = ref([])
const operation = [
  {
    message: '删除',
    size: 'small',
    type: 'danger',
    controller: () => deleteImage(),
  },
  {
    type: 'primary',
    size: 'small',
    message: '修改'
  }
]

//pull data
const pageNo = ref(1)
const pageSize = 5;
const pullAll = () => {
  axios.get(`http://localhost:3000/image/pull?pageNo=${pageNo.value}&pageSize=${pageSize}`, {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      pagination.total = res.data.count;
      data.value = res.data.data;
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

//select one
const current = ref()
const selectOne = (item) => {
  current.value = item;
}

//search by id
const searchImage = () => {
  if (value.value) {
    axios.get(`http://localhost:3000/image/search?id=${value.value}`, {
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      },
    }).then((res) => {
      if (res.data.code === 200) {
        //clear
        data.value = []
        data.value.push(res.data.data);
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
      message: '请输入要查询的id'
    })
  }
}
//change group
const groupRoom = () => {
  axios.get('http://localhost:3000/image/groupRoom', {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      //clear
      data.value = []
      data.value = res.data.data;
    }
  }).catch((err) => {
    console.log(err);
  })
}
const groupApart = () => {
  axios.get('http://localhost:3000/image/groupApart',{
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      //clear
      data.value = []
      data.value = res.data.data;
    }
  }).catch((err) => {
    console.log(err);
  })
}
const changeGroup = (item) => {
  switch (item) {
    case 1:
      refresh()
      break;
    case 2:
      groupRoom()
          break;
    case 3:
      groupApart()
          break;
  }
}

//change page
const changePage = (item) => {
  pageNo.value = item
  //clear
  data.value = []
  //re pull
  pullAll()
}
//delete image
const deleteImage = () => {
  axios.get(`http://localhost:3000/image/delete?id=${current.value.id}`, {
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
    }
    else {
      ElMessage({
        type: "warning",
        message: res.data.message,
      })
    }
  }).catch((err) => {
    console.log(err);
  })
}
//create image
const isShow = ref(false);
const apartList = ref([])
const roomList = ref([])
const imageForm = reactive({
  url: [],
  roomId: 0,
  apart_id: 0,
  service_name: 'guigu-image',
})

//create image

//uploadref
const uploadRef = ref()
//upload file name
const uploadFileName = ref()
//generateFileName
const generateFileName = (ossData, file) => {
  const suffix = file.name.split(file.name.lastIndexOf('.'));
  const fileName = imageForm.service_name + Date.now() + suffix;
  uploadFileName.value = fileName;
  const dir = ossData.dir;
  return dir + fileName;
}
const pullRoom = () => {
  axios.get('http://localhost:3000/rooms/base', {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      roomList.value = res.data.data;
    }
  }).catch((err) => {
    console.log(err);
  })
}
const pullApart = () => {
  axios.get('http://localhost:3000/apartment/base', {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      apartList.value = res.data.data;
    }
  }).catch((err) => {
    console.log(err);
  })
}
const createImage = () => {
  isShow.value = true;
  //pull room list
  pullRoom()
  //pull apart list
  pullApart()
}

//submit create
const submitImage = async (ossData) => {
  await axios.post('http://localhost:3000/image/create', {
    url: `${ossData.host}/${ossData.dir}${uploadFileName.value}`,
    apart_id: imageForm.apart_id,
    room_id: imageForm.roomId,
  }, {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      ElMessage({
        type:"success",
        message: res.data.message,
      })
      //clear
      data.value = []
      //re pull
      pullAll()
      isShow.value = false
    } else {
      ElMessage({
        type: "warning",
        message: res.data.message
      })
      isShow.value = false
    }
  }).catch((err) => {
    console.log(err);
  })
}
//handle upload
const handleUpload = async () => {
  await uploadService(imageForm, submitImage, generateFileName);
}
//get image
const getImage = (file, fileList) => {
  imageForm.url = fileList;
  console.log(imageForm.url)
}

//om
onMounted(() => {
  //pull data
  pullAll()
})
</script>

<template>
  <div class="w-full h-full relative block overflow-hidden">
    <!-- page main body -->
    <div style="height: calc(100% - 100px)" class="w-full relative block bg-white p-4 mb-4 overflow-hidden">
      <!-- top banner -->
      <div class="w-full h-14 relative flex overflow-hidden">
        <!-- search banner -->
        <div class="w-auto h-full relative flex">
          <el-input
              v-model="value"
              placeholder="请输入图片id"
              prefix-icon="Files"
              clearable
              style="width: 240px;height: 32px"
              class="my-auto"
          />
          <el-button @click="searchImage" type="primary" icon="Search" class="my-auto ml-4">搜索</el-button>
        </div>
        <!-- refresh button -->
        <el-button @click="refresh" type="primary" icon="Refresh" class="my-auto ml-4">刷新</el-button>
        <!-- right buttons -->
        <div class="w-auto h-full relative flex ml-auto">
          <el-select
              v-model="select"
              placeholder="请选择排序方式"
              style="width: 120px"
              class="my-auto mr-4"
              @change="changeGroup"
          >
            <el-option
                v-for="item in option"
                :label="item.label"
                :key="item.id"
                :value="item.value"
            />
          </el-select>
          <el-button @click="createImage" type="primary" icon="Plus" class="my-auto">添加图片</el-button>
        </div>
      </div>
      <!-- table main body -->
      <div style="height: calc(100% - 112px)" class="w-full relative block">
        <TableComponent
            :table="label"
            :data="data"
            :stripe="table.stripe"
            :border="table.border"
            :operate="operation"
            :operate-width="table.width"
            :max-height="table.maxHeight"
            :multiple="table.multiple"
            :high-light="table.highLight"
            :can-edit="table.canEdit"
            :is-fixed="table.isFixed"
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
    <!-- copy-right -->
    <CopyRight />
    <!-- dialogs -->
    <!-- create image dialog -->
    <el-dialog
        v-model="isShow"
        title="添加图片"
        width="500px"
        draggable
    >
      <div class="w-full h-auto relative block">
        <el-form
            v-model="imageForm"
            label-width="auto"
        >
          <el-form-item label="上传图片">
            <el-upload
                ref="uploadRef"
                :auto-upload="false"
                accept=".jpg,.png"
                :limit="1"
                action="#"
                :on-change="getImage"
                :file-list="imageForm.url"
                :show-file-list="true"
            >
              <el-button icon="Upload" type="primary">上传图片</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="所属房间">
            <el-select
                v-model="imageForm.roomId"
                placeholder="请选择图片所属客房"
            >
              <el-option
                  v-for="item in roomList"
                  :key="item"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="所属公寓">
            <el-select
                v-model="imageForm.apart_id"
                placeholder="请选择图片所属公寓"
            >
              <el-option
                  v-for="item in apartList"
                  :key="item"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="handleUpload" type="primary" icon="Select">确认添加</el-button>
        <el-button @click="isShow = false" type="danger" icon="CircleClose">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>