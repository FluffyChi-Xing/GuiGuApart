<script setup>
import { ref } from "vue";
import {
  Clock,
  Document,
  HomeFilled, List,
  Management,
  More,
  Odometer,
  OfficeBuilding, Service,
  Setting, User
} from "@element-plus/icons-vue";
import { useCounterStore } from "@/stores/counter.js";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { watch } from "vue";

//router
const router = useRouter()
//route
const route = useRoute()

//default active
const activeDefault = ref('/')

//store
const store = useCounterStore()
//jump
const change = (to) => {
  switch (to) {
    case '/':
      router.push(to)
          break;
    case '/users':
      router.push(to)
          break;
    case '/job':
      router.push(to)
          break;
    case '/look':
      router.push(to)
          break;
    case '/attribute':
      router.push(to)
          break;
    case '/rooms':
      router.push(to)
          break;
    case '/apart':
      router.push(to)
          break;
    case '/client':
      router.push(to)
          break;
  }
}
//持久化菜单高亮
const initMenu = () => {
  switch (route.fullPath) {
    case '/':
      activeDefault.value = route.fullPath
          break;
    case '/users':
      activeDefault.value = route.fullPath
          break;
    case '/job':
      activeDefault.value = route.fullPath
          break;
    case '/look':
      activeDefault.value = route.fullPath
          break;
    case '/attribute':
      activeDefault.value = route.fullPath
          break;
    case '/rooms':
      activeDefault.value = route.fullPath
          break;
    case '/apart':
      activeDefault.value = route.fullPath
          break;
    case '/client':
      activeDefault.value = route.fullPath
          break;
  }
}

//om
onMounted(() => {
  initMenu()
})
//watch
watch(() => route.fullPath, () => {
  initMenu()
})
</script>

<template>
  <div class="w-auto h-full relative block z-[399] shadow-md">
    <el-menu
        active-text-color="#fff"
        background-color="#00152B"
        class="el-menu-vertical-demo"
        :default-active="activeDefault"
        text-color="#AABDCB"
        :collapse="store.collapse"
        style="height: 100%"
        @select="change"
    >
      <el-menu-item style="background-color: #000917;box-sizing: border-box;border-bottom: 1px solid #010f34">
        <span class="w-auto h-full relative block mx-auto font-bold text-white">尚庭公寓</span>
      </el-menu-item>
      <el-menu-item index="/">
        <el-icon><Odometer /></el-icon>
        <span>仪表盘</span>
      </el-menu-item>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><Setting /></el-icon>
          <span>系统管理</span>
        </template>
        <el-menu-item index="/users">
          <el-icon><Service /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/job">
          <el-icon><List /></el-icon>
          <span>岗位管理</span>
        </el-menu-item>
        <el-menu-item index="/client">
          <el-icon><User /></el-icon>
          <span>客户管理</span>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon><OfficeBuilding /></el-icon>
          <span>公寓管理</span>
        </template>
        <el-menu-item index="/apart">
          <el-icon><OfficeBuilding /></el-icon>
          <span>公寓管理</span>
        </el-menu-item>
        <el-menu-item index="/rooms">
          <el-icon><HomeFilled /></el-icon>
          <span>客房管理</span>
        </el-menu-item>
        <el-menu-item index="/attribute">
          <el-icon><More /></el-icon>
          <span>属性管理</span>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <el-icon><Document /></el-icon>
          <span>预约管理</span>
        </template>
        <el-menu-item index="/look">
          <el-icon><Clock /></el-icon>
          <span>看房预约管理</span>
        </el-menu-item>
        <el-menu-item index="4-2">
          <el-icon><Management /></el-icon>
          <span>租约管理</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  border-right: none;
}
.el-menu {
  scrollbar-width: none;
}
.el-menu::-webkit-scrollbar {
  display: none;
}
.el-menu-item.is-active {
  background-color: var(--el-color-primary);
}
.el-menu .el-menu-item {
  margin-top: 4px;
}
</style>