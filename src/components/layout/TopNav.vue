<script setup>
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { watch } from "vue";
import { ref } from "vue";
import {ElMessage} from "element-plus";

//router & route
const router = useRouter()
const route = useRoute()
//tags list
const tagsList = ref([])



//check route
const checkRoute = () => {
  route.matched.forEach((item) => {
    if (!tagsList.value.includes(item)) {
      tagsList.value.push(item)
    }
  })
}
//jump function
const jump = (item) => {
  router.push(item.path)
  ElMessage({
    type: "info",
    message: item.name,
  })
}

//close
const close = (tags) => {
 if (tagsList.value.includes(tags)) {
   tagsList.value = tagsList.value.filter((item) => item.name !== tags.name)
 }
}

//om
onMounted(() => {
  checkRoute()
})
watch(() => route.fullPath, () => {
  checkRoute()
})
</script>

<template>
  <div class="w-full h-14 relative flex px-4 overflow-hidden bg-white z-[199] shadow-md">
    <!-- router tags -->
    <div class="w-full h-8 relative flex my-auto overflow-hidden">
      <el-tag
          v-for="item in tagsList"
          :key="item"
          type="primary"
          closable
          class="my-auto mr-4 cursor-pointer"
          @click="jump(item)"
          @close="close(item)"
      >
        {{ item.name }}
      </el-tag>
    </div>
  </div>
</template>

<style scoped>

</style>