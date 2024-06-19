<script setup>
import { ref,reactive } from "vue";
import CopyRight from "@/components/common/CopyRight.vue";
import {Warning} from "@element-plus/icons-vue";
import axios from "axios";
import {onMounted} from "vue";
import {ElMessage} from "element-plus";

//apartment tags
const apart = ref([])
const apartShow = ref(false)
const apartName = ref()
//close
const close = (item) => {
  axios.get(`http://localhost:3000/label/deleteApart?id=${item.id}`, {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      ElMessage({
        type: "success",
        message: res.data.message,
      })
      //clear apart list
      apart.value = []
      //repull
      pullApart()
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
//get access function
const getAccess = () => {
  return localStorage.getItem('access').toString();
}


//apart
const pullApart = () => {
  axios.get('http://localhost:3000/label/pullApart', {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      res.data.data.forEach((item) => {
        apart.value.push(item)
      })
    }
  }).catch((err) => {
    console.log(err);
  })
}
//添加apart labels
const createApart = () => {
  if (apartName.value) {
    axios.get(`http://localhost:3000/label/createApart?name=${apartName.value}`, {
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
        apart.value = []
        //repull
        pullApart()
        //show
        apartShow.value = false
      } else {
        ElMessage({
          type: "warning",
          message: res.data.message,
        })
        apartShow.value = false
      }
    }).catch((err) => {
      console.log(err);
    })
  }
}

//room
const roomShow = ref(false)
const room = ref([])
//拉取room label
const pullRoomLabel = () => {
  axios.get('http://localhost:3000/label/room', {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
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
    axios.get(`http://localhost:3000/label/createRoom?name=${roomName.value}`, {
      headers: {
        Authorization: `Bearer ${getAccess()}`,
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
//delete room
const deleteRoom = (item) => {
  axios.get(`http://localhost:3000/label/deleteRoom?id=${item.id}`, {
    headers: {
      Authorization: `Bearer ${getAccess()}`
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
  axios.get(`http://localhost:3000/pay-method/delete?id=${item.id}`, {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
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
  axios.get('http://localhost:3000/pay-method/pull', {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
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
const createMethod = () => {
  if (payForm.name) {
    axios.post('http://localhost:3000/pay-method/create', {
      name: payForm.name,
      description: payForm.description,
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
//room info labels
const roomInfo = ref([])
const info = ref(false)
const infoForm = reactive({
  type: '',
  size: '',
  towards: '',
  lighting: '',
  sanitation: '',
})
//拉取room info labels
const pullInfo = () => {
  axios.get('http://localhost:3000/label/pullInfo', {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      res.data.data.forEach((item) => {
        roomInfo.value.push(item)
      })
    }
  }).catch((err) => {
    console.log(err);
  })
}
//添加room info label
const createInfo = () => {
  if (infoForm.type && infoForm.towards) {
    axios.post('http://localhost:3000/label/createInfo', {
      type: infoForm.type,
      size: infoForm.size,
      towards: infoForm.towards,
      lighting: infoForm.lighting,
      sanitation: infoForm.sanitation,
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
        //clear info list
        roomInfo.value = []
        //repull
        pullInfo()
        //info
        info.value = false
      } else {
        ElMessage({
          type: "warning",
          message: res.data.message,
        })
        info.value = false
      }
    }).catch((err) => {
      console.log(err);
    })
  }
}
//删除room info labels
const deleteInfo = (item) => {
  axios.get(`http://localhost:3000/label/deleteInfo?id=${item.id}`, {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      ElMessage({
        type: "success",
        message: res.data.message
      })
      //clear room info
      roomInfo.value = []
      //repull
      pullInfo()
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

//拉取杂费labels
const cost = ref(false)
const costLabel = ref([])
const costForm = reactive({
  cost: '',
  water: '',
  net: '',
  warm: '',
  electric: '',
})
const pullCost = () => {
  axios.get('http://localhost:3000/label/pullCost', {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      res.data.data.forEach((item) => {
        costLabel.value.push(item)
      })
    }
  }).catch((err) => {
    console.log(err)
  })
}
//删除杂费
const deleteCost = (item) => {
  axios.get(`http://localhost:3000/label/deleteCost?id=${item.id}`, {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      ElMessage({
        type: "success",
        message: res.data.message,
      })
      //clear cost info
      costLabel.value = []
      //repull
      pullCost()
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
//添加cost info labels
const createCost = () => {
  if (costForm.cost && costForm.net) {
    axios.post('http://localhost:3000/label/createCost', {
      cost: costForm.cost,
      water: costForm.water,
      net: costForm.net,
      warm: costForm.warm,
      electric: costForm.electric,
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
        //clear cost info
        costLabel.value = []
        //repull
        pullCost()
        //cost
        cost.value = false
      } else {
        ElMessage({
          type: "warning",
          message: res.data.message,
        })
        //cost
        cost.value = false
      }
    }).catch((err) => {
      console.log(err);
    })
  }
}



//om
onMounted(() => {
  //拉取apart
  pullApart()
  //拉取支付方式
  pullPayMethod()
  //拉取room label
  pullRoomLabel()
  //拉取room info labels
  pullInfo()
  //拉取cost info labels
  pullCost()
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
                  @close="close(item)"
              >
                {{ item.name }}
              </el-tag>
            </div>
            <div class="w-[100px] h-full relative flex justify-center">
              <el-button type="primary" icon="Plus" class="my-auto" @click="apartShow = true">添加</el-button>
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
            <div class="w-full h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in roomInfo"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="deleteInfo(item)"
              >
                {{ item.type }}
              </el-tag>
            </div>
          </div>
          <!-- 面积 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">
              面积
              <el-icon class="my-auto"><Warning /></el-icon>
            </span>
            <div class="w-full h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in roomInfo"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="deleteInfo(item)"
              >
                {{ item.size }}
              </el-tag>
            </div>
          </div>
          <!-- 朝向 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">
              朝向
              <el-icon class="my-auto"><Warning /></el-icon>
            </span>
            <div class="w-full h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in roomInfo"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="deleteInfo(item)"
              >
                {{ item.towards }}
              </el-tag>
            </div>
          </div>
          <!-- 采光 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">
              采光
              <el-icon class="my-auto"><Warning /></el-icon>
            </span>
            <div class="w-full h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in roomInfo"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="deleteInfo(item)"
              >
                {{ item.lighting }}
              </el-tag>
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
                  v-for="item in roomInfo"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="deleteInfo(item)"
              >
                {{ item.sanitation }}
              </el-tag>
            </div>
            <div class="w-[100px] h-full relative flex justify-center">
              <el-button type="primary" icon="Plus" class="my-auto" @click="info = true">添加</el-button>
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
            <div class="w-full h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in costLabel"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="deleteCost(item)"
              >
                {{ item.cost }}
              </el-tag>
            </div>
          </div>
          <!-- 水费 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">
              水费
              <el-icon class="my-auto"><Warning /></el-icon>
            </span>
            <div class="w-full h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in costLabel"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="deleteCost(item)"
              >
                {{ item.water }}
              </el-tag>
            </div>
          </div>
          <!-- 电费 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">
              电费
              <el-icon class="my-auto"><Warning /></el-icon>
            </span>
            <div class="w-full h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in costLabel"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="deleteCost(item)"
              >
                {{ item.electric }}
              </el-tag>
            </div>
          </div>
          <!-- 采暖费 -->
          <div class="w-full h-[44px] relative flex mb-4">
            <span class="text-black w-[100px] text-[15px] my-auto">
              采暖费
              <el-icon class="my-auto"><Warning /></el-icon>
            </span>
            <div class="w-full h-full px-4 relative flex bg-[#F7F9FA] message-card">
              <el-tag
                  v-for="item in costLabel"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="deleteCost(item)"
              >
                {{ item.warm }}
              </el-tag>
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
                  v-for="item in costLabel"
                  :key="item"
                  closable
                  class="my-auto mr-4"
                  @close="deleteCost(item)"
              >
                {{ item.net }}
              </el-tag>
            </div>
            <div class="w-[100px] h-full relative flex justify-center">
              <el-button type="primary" icon="Plus" class="my-auto" @click="cost = true">添加</el-button>
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
        <el-button icon="Select" type="primary" @click="createMethod">确认添加</el-button>
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
    <!-- create room info label -->
    <el-dialog
        v-model="info"
        title="添加房间信息标签"
        draggable
        width="500px"
    >
      <div class="w-full h-auto relative block">
        <el-form
            v-model="infoForm"
            label-width="auto"
        >
          <el-form-item label="户型">
            <el-input
                v-model="infoForm.type"
                placeholder="请输入户型"
                prefix-icon="OfficeBuilding"
                clearable
            />
          </el-form-item>
          <el-form-item label="面积">
            <el-input
                v-model="infoForm.size"
                clearable
                placeholder="请输入面积"
                prefix-icon="Box"
            />
          </el-form-item>
          <el-form-item label="采光">
            <el-input
                v-model="infoForm.lighting"
                placeholder="请输入采光"
                clearable
                prefix-icon="ReadingLamp"
            />
          </el-form-item>
          <el-form-item label="朝向">
            <el-input
                v-model="infoForm.towards"
                placeholder="请输入朝向"
                clearable
                prefix-icon="Guide"
            />
          </el-form-item>
          <el-form-item label="卫生">
            <el-input
                v-model="infoForm.sanitation"
                clearable
                placeholder="请输入卫生"
                prefix-icon="ToiletPaper"
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="createInfo" type="primary" icon="Select">确认添加</el-button>
        <el-button @click="info = false" type="danger" icon="CircleClose">取消</el-button>
      </template>
    </el-dialog>
    <!-- create cost info label -->
    <el-dialog
        v-model="cost"
        title="添加杂费"
        width="500px"
        draggable
    >
      <div class="w-full h-auto relative block">
        <el-form
            label-width="auto"
            v-model="costForm"
        >
          <el-form-item label="房租">
            <el-input
                placeholder="请输入房租"
                prefix-icon="Ticket"
                v-model="costForm.cost"
                clearable
            />
          </el-form-item>
          <el-form-item label="水费">
            <el-input
                placeholder="请输入水费"
                prefix-icon="Coffee"
                v-model="costForm.water"
                clearable
            />
          </el-form-item>
          <el-form-item label="电费">
            <el-input
                placeholder="请输入电费"
                prefix-icon="Cpu"
                v-model="costForm.electric"
                clearable
            />
          </el-form-item>
          <el-form-item label="取暖费">
            <el-input
                placeholder="请输入取暖费"
                prefix-icon="Sunrise"
                v-model="costForm.warm"
                clearable
            />
          </el-form-item>
          <el-form-item label="网费">
            <el-input
                placeholder="请输入网费"
                prefix-icon="Printer"
                v-model="costForm.net"
                clearable
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="createCost" type="primary" icon="Select">确认添加</el-button>
        <el-button @click="cost = false" type="danger" icon="CircleClose">取消</el-button>
      </template>
    </el-dialog>
    <!-- create apart label -->
    <el-dialog
        draggable
        v-model="apartShow"
        width="500px"
        title="添加公寓标签"
    >
      <div class="w-full h-auto relative block">
        <el-form
            label-width="auto"
            v-model="apartName"
        >
          <el-form-item label="公寓标签">
            <el-input
                placeholder="请输入公寓标签"
                v-model="apartName"
                prefix-icon="OfficeBuilding"
                clearable
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="createApart" type="primary" icon="Select">确认添加</el-button>
        <el-button @click="apartShow = false" type="danger" icon="CircleClose">取消</el-button>
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