<script lang="ts" setup>
import { reactive, ref } from "vue";
import {Delete, Download, Plus, ZoomIn} from "@element-plus/icons-vue";
import type { UploadFile } from 'element-plus'
import axios from "axios";
import {ElMessage} from "element-plus";
import { onMounted } from "vue";

//user information
const information = reactive({
  username: '张三',
  password: 114514,
  isRoot: '1',
  phone: 15188870756,
  email: 'oqhioqfiqw@gmil.com',
  id_number: '652836999262917729',
  code: '',
})

//upload image
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const handleRemove = (file: UploadFile) => {
  console.log(file)
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
      dialogVisible.value = true
}

const handleDownload = (file: UploadFile) => {
  console.log(file)
}

//get user id
const getUserId = () => {
  return localStorage.getItem('default_user')
}
//get access
const getAccess = () => {
  return localStorage.getItem('access').toString()
}
//get user info by id
const getUser = () => {
  axios.get(`http://localhost:3000/employee/searchId?id=${getUserId()}`, {
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      information.username = res.data.data.username;
      information.password = res.data.data.password;
      information.phone = res.data.data.phone;
      information.email = res.data.data.email;
      information.isRoot = res.data.data.status;
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
  getUser()
})
</script>

<template>
  <div class="w-full h-full relative grid grid-cols-2 gap-3 overflow-hidden">
    <!-- avatar upload -->
    <div class="w-full h-full relative flex justify-center">
      <el-upload class="my-auto" action="#" list-type="picture-card" :auto-upload="false">
        <el-icon><Plus /></el-icon>

        <template #file="{ file }">
          <div>
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
            <span class="el-upload-list__item-actions">
          <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
          >
            <el-icon><Download /></el-icon>
          </span>
          <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
          </div>
        </template>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </div>
    <!-- more information -->
    <div class="w-full h-full relative block p-4 overflow-hidden">
      <!-- alert -->
      <el-alert
          title="警告"
          description="请谨慎修改个人信息，如遇到问题请联系管理员"
          show-icon
          type="warning"
          closable
      />
      <!-- user info -->
      <div style="height: calc(100% - 65px)" class="w-full relative block pt-4">
        <el-form
            v-model="information"
            label-width="auto"
        >
          <el-form-item label="用户名">
            <el-input
                v-model="information.username"
                disabled
                prefix-icon="User"
            />
          </el-form-item>
          <el-form-item label="密码">
            <el-input
                v-model="information.password"
                placeholder="请输入密码"
                prefix-icon="Lock"
                clearable
                show-password
            />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input
                v-model="information.phone"
                maxlength="11"
                show-word-limit
                placeholder="请输入手机号"
                clearable
                prefix-icon="Iphone"
            />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input
                v-model="information.email"
                placeholder="请输入邮箱"
                clearable
                prefix-icon="Message"
            />
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input
                v-model="information.id_number"
                placeholder="请输入身份证号"
                clearable
                maxlength="18"
                show-word-limit
                prefix-icon="Warning"
            />
          </el-form-item>
          <el-form-item label="验证码">
            <el-input
                v-model="information.code"
                placeholder="请输入验证码"
                clearable
                maxlength="6"
                show-word-limit
                prefix-icon="More"
                style="width: 240px;margin-right: 16px"
            />
            <el-button type="primary" icon="Position">发送验证码</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="Select" class="w-full">确认修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>