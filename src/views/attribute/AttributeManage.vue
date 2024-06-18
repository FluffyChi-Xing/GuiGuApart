<script setup>
import { ref,reactive } from "vue";
import CopyRight from "@/components/common/CopyRight.vue";
import {Warning} from "@element-plus/icons-vue";
import axios from "axios";
import {onMounted} from "vue";
import {ElMessage} from "element-plus";

//apartment tags
const apart = ref([
  '靠近地铁',
  '靠近公交站',
  '靠近商圈',
  '靠近医院'
])
//close
const close_1 = (aparts) => {
  apart.value = apart.value.filter((item) => item !== aparts )
}
//rooms tags
const rooms = ref([
    '朝南',
    '阳光好',
    '有车位',
    '落地窗',
    'LOFT',
    '单身公寓'
])
const roomShow = ref(false)
const room = ref([])
//拉取room label
const pullRoomLabel = () => {
  //get access
  const access = localStorage.getItem('access').toString();
  axios.get('http://localhost:3000/label/room', {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      res.data.data.forEach((item) => {
        room.value.push(item)
      });
    }
  }).catch((err) => {
    console.log(err)
  })
}
//添加room label
const roomName = ref()
const createRoom = () => {
  if (roomName.value) {
    //get access
    const access = localStorage.getItem('access').toString();
    axios.get(`http://localhost:3000/label/createRoom?name=${roomName.value}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    }).then((res) => {
      if (res.data.code === 200) {
        ElMessage({
          type: "success",
          message: res.data.message,
        })
        //clear room
        room.value = []
        //repull
        pullRoomLabel()
        //room show
        roomShow.value = false
      } else {
        ElMessage({
          type: "warning",
          message: res.data.message,
        })
        roomShow.value = false
      }
    }).catch((err) =>{
      console.log(err)
    })
  }
}
//close
const close_2 = (room) => {
  rooms.value = rooms.value.filter((item) => item !== room )
}
//delete room
const deleteRoom = (item) => {
  //get access
  const access = localStorage.getItem('access').toString();
  axios.get(`http://localhost:3000/label/deleteRoom?id=${item.id}`, {
    headers: {
      Authorization: `Bearer ${access}`
    },
  }).then((res) => {
    if (res.data.code === 200) {
      ElMessage({
        type: "success",
        message: res.data.message,
      })
      //clear room
      room.value = []
      //repull
      pullRoomLabel()
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



//拉取支付方式列表
const payMethod = ref([])
const pay = ref(false)
const payForm = reactive({
  name: '',
  description: '',
})
//删除标签
const deletePay = (item) => {
  //get access
  const access = localStorage.getItem('access').toString();
  axios.get(`http://localhost:3000/pay-method/delete?id=${item.id}`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      ElMessage({
        type: "success",
        message: res.data.message,
      })
      //clear pay method
      payMethod.value = []
      //repull
      pullPayMethod()
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
//拉取支付方式
const pullPayMethod = () => {
  //获取access
  const access = localStorage.getItem('access').toString();
  axios.get('http://localhost:3000/pay-method/pull', {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      res.data.data.forEach((item) => {
        payMethod.value.push(item)
      });
    }
  }).catch((err) => {
    console.log(err)
  })
}
//添加支付方式
const createMenthod = () => {
  //get access
  const access = localStorage.getItem('access').toString();
  if (payForm.name) {
    axios.post('http://localhost:3000/pay-method/create', {
      name: payForm.name,
      description: payForm.description,
    }, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    }).then((res) => {
      if (res.data.code === 200) {
        ElMessage({
          type: "success",
          message: res.data.message,
        })
        //clear pay method
        payMethod.value = []
        //repull
        pullPayMethod()
        //pay un show
        pay.value = false
      } else {
        ElMessage({
          type:"warning",
          message: res.data.message,
        })
        pay.value = false
      }
    }).catch((err) => {
      console.log(err)
    })
  } else {
    ElMessage({
      type: "warning",
      message: '支付方式名不可为空',
    })
  }
}


//om
onMounted(() => {
  //拉取支付方式
  pullPayMethod()
  //拉取room label
  pullRoomLabel()
})
</script>

<template>
  <div class="w-full h-full relative block overflow-y-scroll flow">
    <!-- 配套属性管理 -->
    <div class="w-full h-auto relative block mb-4">
      <el-card class="hov-shadow">
        <div class="w-full h-[100px] relative block">
          <!-- 公寓配套 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">公寓标签</span>
            <div style="width: calc(100% - 200px)" class="h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in apart"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="close_1(item)"
              >
                {{ item }}
              </el-tag>
            </div>
            <div class="w-[100px] h-full relative flex justify-center">
              <el-button type="primary" icon="Plus" class="my-auto">添加</el-button>
            </div>
          </div>
          <!-- 房间配套 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">房间标签</span>
            <div style="width: calc(100% - 200px)" class="h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in room"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="deleteRoom(item)"
              >
                {{ item.name }}
              </el-tag>
            </div>
            <div class="w-[100px] h-full relative flex justify-center">
              <el-button type="primary" icon="Plus" class="my-auto" @click="roomShow = true">添加</el-button>
            </div>
          </div>
        </div>
        <template #header>
          <span class="text-black font-bold text-[15px]">配套属性管理</span>
        </template>
      </el-card>
    </div>
    <!-- 房间基本信息管理 -->
    <div class="w-full h-auto relative block mb-4">
      <el-card class="hov-shadow">
        <div class="w-full h-auto relative block">
          <!-- 户型 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">
              户型
              <el-icon class="my-auto"><Warning /></el-icon>
            </span>
            <div style="width: calc(100% - 200px)" class="h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in rooms"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="close_2(item)"
              >
                {{ item }}
              </el-tag>
            </div>
            <div class="w-[100px] h-full relative flex justify-center">
              <el-button type="primary" icon="Plus" class="my-auto">添加</el-button>
            </div>
          </div>
          <!-- 面积 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">
              面积
              <el-icon class="my-auto"><Warning /></el-icon>
            </span>
            <div style="width: calc(100% - 200px)" class="h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in rooms"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="close_2(item)"
              >
                {{ item }}
              </el-tag>
            </div>
            <div class="w-[100px] h-full relative flex justify-center">
              <el-button type="primary" icon="Plus" class="my-auto">添加</el-button>
            </div>
          </div>
          <!-- 朝向 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">
              朝向
              <el-icon class="my-auto"><Warning /></el-icon>
            </span>
            <div style="width: calc(100% - 200px)" class="h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in rooms"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="close_2(item)"
              >
                {{ item }}
              </el-tag>
            </div>
            <div class="w-[100px] h-full relative flex justify-center">
              <el-button type="primary" icon="Plus" class="my-auto">添加</el-button>
            </div>
          </div>
          <!-- 采光 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">
              采光
              <el-icon class="my-auto"><Warning /></el-icon>
            </span>
            <div style="width: calc(100% - 200px)" class="h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in rooms"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="close_2(item)"
              >
                {{ item }}
              </el-tag>
            </div>
            <div class="w-[100px] h-full relative flex justify-center">
              <el-button type="primary" icon="Plus" class="my-auto">添加</el-button>
            </div>
          </div>
          <!-- 卫生 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">
              卫生
              <el-icon class="my-auto"><Warning /></el-icon>
            </span>
            <div style="width: calc(100% - 200px)" class="h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in rooms"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="close_2(item)"
              >
                {{ item }}
              </el-tag>
            </div>
            <div class="w-[100px] h-full relative flex justify-center">
              <el-button type="primary" icon="Plus" class="my-auto">添加</el-button>
            </div>
          </div>
        </div>
        <template #header>
          <span class="text-black font-bold text-[15px]">房间基本信息管理</span>
        </template>
      </el-card>
    </div>
    <!-- 杂费信息管理 -->
    <div class="w-full h-auto relative block mb-4">
      <el-card class="hov-shadow">
        <div class="w-full h-auto relative block">
          <!-- 房租 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">
              房租
              <el-icon class="my-auto"><Warning /></el-icon>
            </span>
            <div style="width: calc(100% - 200px)" class="h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in rooms"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="close_2(item)"
              >
                {{ item }}
              </el-tag>
            </div>
            <div class="w-[100px] h-full relative flex justify-center">
              <el-button type="primary" icon="Plus" class="my-auto">添加</el-button>
            </div>
          </div>
          <!-- 水费 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">
              水费
              <el-icon class="my-auto"><Warning /></el-icon>
            </span>
            <div style="width: calc(100% - 200px)" class="h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in rooms"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="close_2(item)"
              >
                {{ item }}
              </el-tag>
            </div>
            <div class="w-[100px] h-full relative flex justify-center">
              <el-button type="primary" icon="Plus" class="my-auto">添加</el-button>
            </div>
          </div>
          <!-- 电费 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">
              电费
              <el-icon class="my-auto"><Warning /></el-icon>
            </span>
            <div style="width: calc(100% - 200px)" class="h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in rooms"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="close_2(item)"
              >
                {{ item }}
              </el-tag>
            </div>
            <div class="w-[100px] h-full relative flex justify-center">
              <el-button type="primary" icon="Plus" class="my-auto">添加</el-button>
            </div>
          </div>
          <!-- 采暖费 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">
              采暖费
              <el-icon class="my-auto"><Warning /></el-icon>
            </span>
            <div style="width: calc(100% - 200px)" class="h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in rooms"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="close_2(item)"
              >
                {{ item }}
              </el-tag>
            </div>
            <div class="w-[100px] h-full relative flex justify-center">
              <el-button type="primary" icon="Plus" class="my-auto">添加</el-button>
            </div>
          </div>
          <!-- 网费 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">
              网费
              <el-icon class="my-auto"><Warning /></el-icon>
            </span>
            <div style="width: calc(100% - 200px)" class="h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in rooms"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="close_2(item)"
              >
                {{ item }}
              </el-tag>
            </div>
            <div class="w-[100px] h-full relative flex justify-center">
              <el-button type="primary" icon="Plus" class="my-auto">添加</el-button>
            </div>
          </div>
        </div>
        <template #header>
          <span class="text-black font-bold text-[15px]">杂费信息管理</span>
        </template>
      </el-card>
    </div>
    <!-- 支付方式管理 -->
    <div class="w-full h-auto relative block mb-4">
      <el-card
          class="hov-shadow"
      >
        <!-- 支付方式 -->
        <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">
              支付方式
              <el-icon class="my-auto"><Warning /></el-icon>
            </span>
          <div style="width: calc(100% - 200px)" class="h-full px-4 relative flex bg-[#F7F9FA] message-card">
            <el-tag
                v-for="item in payMethod"
                :key="item"
                closable
                class="my-auto mr-4"
                @close="deletePay(item)"
            >
              {{ item.name }}
            </el-tag>
          </div>
          <div class="w-[100px] h-full relative flex justify-center">
            <el-button type="primary" icon="Plus" class="my-auto" @click="pay = true">添加</el-button>
          </div>
        </div>
        <template #header>
          <span class="text-black font-bold text-[15px]">支付方式管理</span>
        </template>
      </el-card>
    </div>
    <!-- copy right -->
    <CopyRight />
    <!-- more -->
    <!-- create pay method -->
    <el-dialog
        v-model="pay"
        width="500px"
        draggable
        title="添加支付方式"
    >
      <div class="w-full h-auto relative block">
        <el-form
            v-model="payForm"
            label-width="auto"
        >
          <el-form-item label="支付方式名称">
            <el-input
                v-model="payForm.name"
                placeholder="请输入支付方式名称"
                clearable
                prefix-icon="Ticket"
            />
          </el-form-item>
          <el-form-item label="支付方式简介">
            <el-input
                v-model="payForm.description"
                placeholder="请输入支付方式简介"
                clearable
                maxlength="120"
                show-word-limit
                prefix-icon="Document"
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button icon="Select" type="primary" @click="createMenthod">确认添加</el-button>
        <el-button icon="CircleClose" type="danger" @click="pay = false">取消</el-button>
      </template>
    </el-dialog>
    <!-- create room label -->
    <el-dialog
        title="添加房间标签"
        width="500px"
        draggable
        v-model="roomShow"
    >
      <div class="w-full h-auto relative block">
        <el-form
            v-model="roomName"
            label-width="auto"
        >
          <el-form-item label="房间标签名">
            <el-input
                v-model="roomName"
                clearable
                placeholder="请输入房间标签名"
                prefix-icon="OfficeBuilding"
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="createRoom" icon="Select" type="primary">确认添加</el-button>
        <el-button @click="roomShow = false" icon="CircleClose" type="danger">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.flow {
  scrollbar-width: thin;
}
.hov-shadow {
  box-shadow: none;
}
.hov-shadow:hover {
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
}
.message-card {
  border: 1px solid #e1dede;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
}
.message-card:hover {
  transition: all 0.2s ease-in-out;
  border-color: #c0c6cc;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
}
</style>