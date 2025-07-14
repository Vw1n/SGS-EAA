<template>
  <el-button 
    :type="buttonType" 
    :size="buttonSize" 
    @click="handleExport"
    :disabled="isDisabled"
    class="export-button"
  >
    <i class="el-icon-download"></i> {{ buttonText }}
  </el-button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

// 定义接收的props
const props = defineProps({
  buttonType: {
    type: String,
    default: 'primary'
  },
  buttonSize: {
    type: String,
    default: 'large'
  },
  buttonText: {
    type: String,
    default: '导出为Excel'
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
})

// 定义触发的事件
const emits = defineEmits(['export'])

// 点击按钮时触发export事件
const handleExport = () => {
  emits('export')
}
</script>

<style scoped>
.export-button {
  width: 100%;
  padding: 12px 0;
  font-size: 16px;
}
</style>