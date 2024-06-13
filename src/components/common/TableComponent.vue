<script setup>
//form props
const props = defineProps({
  data: [], //列表数据
  table: [], //列表列设定
  highLight: Boolean, //是否单选
  multiple: Boolean, //是否复选
  border: Boolean, //是否开启边框
  canEdit: Boolean, //是否需要编辑
  operate: [], //列表操作方法
  isFixed: String || Boolean, //列表操作列的固定
  maxHeight: String, //列表最大高度
  operateWidth: String,
  stripe: Boolean,
  //expand: String,
  //function
  current_change: () => {},
  select_all: () => {},
})
</script>

<template>
  <div class="w-full h-full relative block">
    <el-table
        :data="props.data"
        :highlight-current-row="props.highLight"
        :max-height="props.maxHeight"
        :border="props.border"
        :stripe="props.stripe"
        :on-current-change="props.current_change"
        :on-select-all="props.select_all"
    >
      <el-table-column type="selection" v-if="props.multiple" />
      <el-table-column
          v-for="item in props.table"
          :key="item"
          :type="item.expand"
          :label="item.label"
          :prop="item.prop"
          :width="item.width"
          :fixed="item.isFixed"
      >
        <template v-if="item.expand" #default="scope">
          <div>
            {{ scope.row.value }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
          v-if="props.canEdit"
          :fixed="props.isFixed"
          label="操作"
          :width="props.operateWidth"
      >
        <el-button
            v-for="item in props.operate"
            :key="item"
            :type="item.type"
            :disabled="item.disabled"
            :size="item.size"
        >
          {{ item.message }}
        </el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>

</style>