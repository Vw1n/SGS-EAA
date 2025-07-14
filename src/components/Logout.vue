<!-- Logout.vue -->
<template>
  <button class="logout-btn" @click="handleLogout">
    <i class="icon-logout"></i>
    <span class="btn-text">退出登录</span>
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
  /* 固定在右下角 */
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 100; /* 确保在最上层 */
  
  /* 原有样式保持不变 */
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #f56c6c 0%, #f87171 100%);
  border: none;
  border-radius: 50px; /* 圆角增大，使按钮更圆润 */
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 6px 16px rgba(245, 108, 108, 0.3); /* 阴影增强，突出按钮 */
}

/* 图标样式 */
.icon-logout {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

/* 悬停效果 */
.logout-btn:hover {
  transform: translateY(-4px); /* 上浮距离增大 */
  background: linear-gradient(135deg, #ef4444 0%, #f87171 100%);
  box-shadow: 0 10px 24px rgba(245, 108, 108, 0.4); /* 阴影进一步增强 */
}

.logout-btn:hover .icon-logout {
  transform: translateX(-3px);
}

/* 点击效果 */
.logout-btn:active {
  transform: translateY(-2px); /* 点击后不完全恢复原位，保持轻微上浮 */
  box-shadow: 0 4px 12px rgba(245, 108, 108, 0.3);
}

/* 响应式调整 */
@media (max-width: 576px) {
  .logout-btn {
    right: 16px;
    bottom: 16px;
    padding: 10px 16px;
    font-size: 14px;
  }
  
  .icon-logout {
    width: 16px;
    height: 16px;
  }
}
</style>