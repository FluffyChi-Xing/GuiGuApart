<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

//router
const router = useRouter()
//back home
const backHome = () => {
  router.push('/')
}
//floating square

const floating = () => {
  let container1 = document.getElementById('square');
  window.onmousemove = function (e) {
    let x = -e.x / 90,
        y = -e.y / 90;

    container1.style.right = x + 'px';
    container1.style.bottom = y + 'px';
  }
  /* Mobile gyroscope */
  window.addEventListener("deviceorientation", function (e) {
    container1.style.right = e.gamma/3 + "px"
    container1.style.bottom = e.beta/3 + "px"
  })
}

//om
onMounted(() => {
  floating()
})
</script>

<template>
  <div class="w-screen h-screen relative flex bg-[#1E0D37] overflow-hidden">
    <!-- 404 title -->
    <div class="w-1/2 h-full relative flex justify-center">
      <div id="square" class="w-[300px] h-[300px] container relative flex justify-center align-middle my-auto rounded-[20px] bg-[#C2146D]">
        <span class="w-full h-full relative text-center leading-[300px] block text-[10vw]">404</span>
      </div>
    </div>
    <!-- back home -->
    <div class="w-1/2 h-full relative flex justify-center">
      <div class="w-full h-auto relative block my-auto">
        <div class="w-full text-white h-14 relative block whitespace-nowrap text-ellipsis overflow-hidden">
          <span class="text-[40px] font-bold">Oops! page not found</span>
        </div>
        <div class="w-full text-white h-14 text-[20px] relative block whitespace-pre-line text-ellipsis overflow-hidden">
          <span>The page you are looking for does not exist. Go back to the main page or search.</span>
        </div>
        <div class="w-full h-14 relative flex justify-start">
          <el-button @click="backHome" type="text" size="large" icon="Select">
            返回首页
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  --P_color1: #C2146D;
  --P_color2: #760D50;
  --P_color3: #4D0E45;
  --P_color4: #320C3B;
  --P_color5: #280C3D;
  --P_color6: #1E0D37;
  box-shadow: var(--P_color2) 0 0 5px 30px,
  var(--P_color3) 0 0 10px 60px,
  var(--P_color4) 0 0 15px 90px,
  var(--P_color5) 0 0 20px 120px,
  var(--P_color6) 0 0 25px 150px;
  transform: rotateZ(-21deg);
}
.container span {
  font-weight: bold;
  color: var(--P_color6)
}
.el-button {
  border: 1px solid var(--el-color-primary);
}
.el-button:hover {
  border: 1px solid var(--el-color-primary);
}
</style>