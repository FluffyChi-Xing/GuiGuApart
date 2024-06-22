<script setup>
import { reactive,ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import {ElMessage} from "element-plus";
//router
const router = useRouter()

//login form
const loginForm = reactive({
  username: '',
  password: '',
  captcha: '',
})
//captcha
const captchaCanvas = ref()
const captcha = ref('12Ac9T')
//请求验证码
const getCaptcha = async () => {
  await axios.get(`http://localhost:3000/employee/captcha?username=${loginForm.username}`).then((res) => {
    if (res.data.code === 200) {
      captcha.value = res.data.data;
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
const generateCaptcha = async () => {
  const canvas = captchaCanvas.value;
  const ctx = canvas.getContext('2d');
  canvas.width = 120;
  canvas.height = 35;
  ctx.font = '20px Arial';
  await getCaptcha()
  await ctx.fillText(captcha.value, 30, 30);

  function drawLines(ctx, numLines) {
    for (let i = 0; i < numLines; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.stroke();
    }
  }
  drawLines(ctx, 5);
}
//submit login
const loginSubmit = () => {
  if (loginForm.username && loginForm.password) {
    if (loginForm.captcha) {
      axios.post('http://localhost:3000/employee/login', {
        username: loginForm.username,
        password: loginForm.password,
        captcha: loginForm.captcha,
      }, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then((res) => {
        if (res.data.code === 200) {
          ElMessage({
            type: "success",
            message: '登陆成功'
          })
          //存放access & refresh
          localStorage.setItem('access', res.data.access);
          localStorage.setItem('refresh', res.data.refresh);
          //记录用户数据
          localStorage.setItem('default_user', loginForm.username);
          router.replace('/')
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
        type:"warning",
        message: '请输入验证码',
      })
    }
  } else {
    ElMessage({
      type: "warning",
      message: '用户名和密码不可为空',
    })
  }
}

//register form
const register = reactive({
  username: '',
  password: '',
  phone: '',
  captcha: '',
  email: '',
  dept: '1'
})
const dept = ref([
  {
    label: '区域经理',
    value: 1,
  },
  {
    label: '用户',
    value: 2,
  },
  {
    label: '管理员',
    value: 3
  }
])
</script>

<template>
  <!-- 登录注册页面 -->
  <div class="w-screen h-screen relative block login overflow-hidden">
    <!-- login body -->
    <div class="w-[400px] h-full p-4 py-[100px] absolute block right-0 bg-white">
      <div class="w-full h-auto relative flex justify-center mb-4 text-black text-[15px] font-bold">
        尚庭公寓后台管理系统
      </div>
      <el-tabs
          type="border-card"
      >
        <el-tab-pane label="登录">
          <div class="w-full h-auto relative block">
            <el-form
                v-model="loginForm"
                label-width="auto"
            >
              <el-form-item label="用户名">
                <el-input
                    v-model="loginForm.username"
                    placeholder="请输入用户名"
                    clearable
                    prefix-icon="User"
                />
              </el-form-item>
              <el-form-item label="密码">
                <el-input
                    v-model="loginForm.password"
                    clearable
                    prefix-icon="Lock"
                    show-password
                    type="password"
                />
              </el-form-item>
              <el-form-item label="验证码">
                <el-input
                    v-model="loginForm.captcha"
                    placeholder="请输入验证码"
                    clearable
                    maxlength="6"
                    show-word-limit
                    prefix-icon="Warning"
                    style="width: 120px"
                    class="mr-4"
                />
                <!-- verify -->
                <div class="w-[120px] captcha h-[35px] relative block object-contain ml-auto">
                  <canvas
                      class="cursor-pointer"
                      ref="captchaCanvas"
                      @click="generateCaptcha"
                  />
                </div>
              </el-form-item>
              <el-form-item>
                <el-button @click="loginSubmit" type="primary" class="w-full" icon="Select">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="注册">
          <div class="w-full h-auto relative block">
            <el-form
                label-width="auto"
                v-model="register"
            >
              <el-form-item label="用户名">
                <el-input
                    v-model="register.username"
                    clearable
                    prefix-icon="User"
                    placeholder="请输入用户名"
                />
              </el-form-item>
              <el-form-item label="密码">
                <el-input
                    v-model="register.password"
                    type="password"
                    show-password
                    clearable
                    prefix-icon="Lock"
                    placeholder="请输入密码"
                />
              </el-form-item>
              <el-form-item label="手机号">
                <el-input
                    v-model="register.phone"
                    clearable
                    prefix-icon="Iphone"
                    maxlength="11"
                    show-word-limit
                    placeholder="请输入手机号"
                />
              </el-form-item>
              <el-form-item label="验证码">
                <el-input
                    v-model="register.captcha"
                    clearable
                    prefix-icon="Warning"
                    placeholder="请输入验证码"
                    maxlength="6"
                    show-word-limit
                    style="width: 150px"
                />
                <el-button type="primary" icon="Position" class="ml-auto">发送验证码</el-button>
              </el-form-item>
              <el-form-item label="部门">
                <el-select
                    v-model="register.dept"
                    placeholder="请选择所在的部门"
                >
                  <el-option
                      v-for="item in dept"
                      :key="item"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="Select" class="w-full">注册</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped>
.login {
  background-image: url("../../assets/image/bg-img.jpg");
  background-size: cover;
}
.captcha {
  border: 1px solid #dcdcdc;
  box-sizing: border-box;
}
</style>