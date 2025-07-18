<template>
  <button class="logout-btn" @click="handleLogout">
    <span class="btn-text">退出</span>
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

const handleLogout = () => {
  if (window.confirm('确定要退出登录吗？')) {
    localStorage.removeItem('token')
    ElMessage.success('已退出登录')
    router.push('/')
  }
}
</script>

<style scoped>
.logout-btn {
  position: fixed;
  right: 1px;
  bottom: 16px;
  z-index: 100;
  
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  
  padding: 8px 16px; /* 调整内边距使按钮更平衡 */
  background: linear-gradient(135deg, #f56c6c 0%, #f87171 100%);
  border: none;
  border-radius: 24px; /* 适当减小圆角 */
  color: #fff;
  font-size: 14px; /* 略微增大字体使按钮更清晰 */
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(245, 108, 108, 0.2);
}

.logout-btn:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, #ef4444 0%, #f87171 100%);
  box-shadow: 0 6px 16px rgba(245, 108, 108, 0.3);
}

.logout-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(245, 108, 108, 0.2);
}

@media (max-width: 576px) {
  .logout-btn {
    right: 1px;
    bottom: 12px;
    padding: 7px 14px;
    font-size: 13px;
  }
}
</style>