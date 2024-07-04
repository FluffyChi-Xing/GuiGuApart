<script setup>
import { ref } from "vue";
import {ArrowRight, Expand, Fold} from "@element-plus/icons-vue";
import { useCounterStore } from "@/stores/counter.js";
import { useRouter } from "vue-router";
import {ElMessage} from "element-plus";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { watch } from "vue";
import axios from "axios";
import {getAccess} from "@/utils/getAccess.js";

//store
const store = useCounterStore()
//router
const router = useRouter()
//route
const route = useRoute()

//bread
const bread = ref([])

//icon
const icon = ref(Fold)
//fold function
const foldMenu = () => {
  store.collapse = !store.collapse
  switch (store.collapse) {
    case true:
      icon.value = Expand
          break;
    case false:
      icon.value = Fold
          break;
  }
}

//refresh page
const refresh = () => {
  document.location.reload()
}
//full screen function
const fullScreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}
//expand drawer
const expandDrawer = () => {
  if (!store.drawer) {
    store.drawer = true
  }
}
//jump function
const jumpUser = () => {
  router.push('/user')
  ElMessage({
    type: "info",
    message: '用户中心',
  })
}

//check route
const checkRoute = () => {
  bread.value = []
  route.matched.forEach((item) => {
    if (!bread.value.includes(item)) {
      bread.value.push(item)
    }
  })
}
//employee avatar
const avatar = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const id = ref(2)
//get avatar from local storage
const defaultAvatar = async () => {
  return localStorage.getItem('defaultAvatar')
}
//get avatar
const getAvatar = async () => {
  if (defaultAvatar) {
    await axios.get(`http://localhost:3000/employee/avatar?id=${id.value}`, {
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      },
    }).then((res) => {
      if (res.data.code === 200) {
        avatar.value = res.data.data
        localStorage.setItem('defaultAvatar', res.data.data)
      }
    }).catch((err) => {
      console.log(err)
    })
  } else {
    avatar.value = defaultAvatar
  }
}




//om
onMounted(() => {
  //check route
  checkRoute()
  //get avatar
  getAvatar()
})
//watch
watch(() => route.fullPath, () => {
  checkRoute()
})
</script>

<template>
  <div class="w-full h-14 relative flex px-4 overflow-hidden bg-white z-[299] shadow-sm">
    <!-- fold button -->
    <div class="w-14 h-14 relative flex justify-center">
      <el-button
          :icon="icon"
          @click="foldMenu"
          style="border: none;height: 50px;width: 50px;font-size: large"
          class="my-auto"
      />
    </div>
    <!-- bread crumb -->
    <div class="w-[300px] h-full relative flex ml-4">
      <div class="w-auto h-auto relative flex my-auto">
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item
              v-for="item in bread"
              :key="item"
              :to="{ path: item.path }"
          >
            {{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <!-- right function banner -->
    <div class="w-[300px] h-full relative grid grid-cols-4 gap-3 ml-auto">
      <div class="w-full h-full relative flex justify-center">
        <el-button
            class="my-auto"
            @click="refresh"
            style="height: 50px;border: none;width: 50px;font-size: large"
            icon="Refresh"
        />
      </div>
      <div class="w-full h-full relative flex justify-center">
        <el-button
            @click="fullScreen"
            class="my-auto"
            style="height: 50px;border: none;width: 50px;font-size: large"
            icon="FullScreen"
        />
      </div>
      <div class="w-full h-full relative flex justify-center">
        <el-button
            @click="expandDrawer"
            class="my-auto"
            style="height: 50px;border: none;width: 50px;font-size: large"
            icon="Setting"
        />
      </div>
      <!-- avatar & user center -->
      <div class="w-full h-full relative flex justify-center">
        <el-tooltip
            class="box-item"
            effect="dark"
            content="用户中心"
            placement="bottom"
        >
          <el-avatar
              @click="jumpUser"
              shape="circle"
              size="default"
              class="my-auto cursor-pointer"
              :src="avatar"
          />
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>