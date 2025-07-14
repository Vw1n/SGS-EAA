<template>
  <div class="login-container">
    <!-- 背景渐变 -->
    <div class="bg-gradient"></div>
    
    <!-- 登录卡片 -->
    <div class="login-card animate-fade-in">
      <!-- 品牌标识 -->
      <div class="brand-logo">
        <i class="fa fa-shield-alt"></i>
        <span class="brand-text">SGSEAA</span>
      </div>
      
      <!-- 标题 -->
      <h1 class="login-title">登录</h1>
      
      <!-- 错误提示 -->
      <div v-if="errorMessage" class="error-notification">
        <i class="fa fa-exclamation-circle"></i>
        <span>{{ errorMessage }}</span>
      </div>
      
      <!-- 登录表单 -->
      <form @submit.prevent="handleLogin" class="login-form">
        <!-- 账号输入 -->
        <div class="form-group">
          <div class="input-group">
            <span class="input-icon">
              <i class="fa fa-user"></i>
            </span>
            <input
              v-model="username"
              type="text"
              placeholder="请输入账号"
              class="form-input"
              :class="{ 'is-error': errorMessage }"
              autocomplete="off"
              required
            />
          </div>
        </div>
        
        <!-- 密码输入 -->
        <div class="form-group">
          <div class="input-group">
            <span class="input-icon">
              <i class="fa fa-lock"></i>
            </span>
            <input
              v-model="password"
              type="password"
              placeholder="请输入密码"
              class="form-input"
              :class="{ 'is-error': errorMessage }"
              required
            />
          </div>
        </div>
        
        <!-- 登录按钮 -->
        <button
          type="submit"
          class="login-btn"
          :disabled="loading"
          :class="{ 'btn-loading': loading }"
        >
          <span v-if="!loading">登录系统</span>
          <span v-else>
            <i class="fa fa-spinner fa-spin"></i> 登录中...
          </span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 表单状态
const username = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)
const loginCard = ref(null)

// 登录处理
const handleLogin = async () => {
  // 重置错误信息
  errorMessage.value = ''
  
  // 简单验证
  if (!username.value) {
    errorMessage.value = '请输入账号'
    return
  }
  
  if (!password.value) {
    errorMessage.value = '请输入密码'
    return
  }
  
  // 显示加载状态
  loading.value = true
  
  try {
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // 验证逻辑
    if (username.value === 'SGSEAA' && password.value === 'SGS0755') {
      // 登录成功
      localStorage.setItem('token', 'true')
      
      // 添加登录成功动画
      loginCard.value.classList.add('success-animation')
      
      // 延迟跳转
      setTimeout(() => {
        router.push('/Main')
      }, 500)
    } else {
      // 登录失败
      errorMessage.value = '账号或密码错误'
      
      // 添加失败动画
      loginCard.value.classList.add('shake-animation')
      setTimeout(() => {
        loginCard.value.classList.remove('shake-animation')
      }, 500)
    }
  } catch (error) {
    // 处理异常
    errorMessage.value = '登录过程中发生错误，请重试'
  } finally {
    // 隐藏加载状态
    loading.value = false
  }
}

// 获取登录卡片引用
onMounted(() => {
  loginCard.value = document.querySelector('.login-card')
})
</script>

<style scoped>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', system-ui, sans-serif;
}

/* 登录容器 */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e5e6 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;
}

/* 背景渐变 */
.bg-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #409eff10 0%, #67c23a10 100%);
  z-index: 0;
}

/* 登录卡片 */
.login-card {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 20px;
  padding: 48px 36px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

/* 品牌标识 */
.brand-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
}

.brand-logo .fa-shield-alt {
  color: #409eff;
  font-size: 28px;
  margin-right: 10px;
}

.brand-text {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
}

/* 登录标题 */
.login-title {
  font-size: 24px;
  font-weight: 500;
  color: #303133;
  text-align: center;
  margin-bottom: 32px;
}

/* 错误提示 */
.error-notification {
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: #fef0f0;
  color: #f56c6c;
  border-radius: 8px;
  margin-bottom: 24px;
  font-size: 14px;
  opacity: 0;
  transform: translateY(-10px);
  animation: fadeInUp 0.3s ease forwards;
}

.error-notification .fa-exclamation-circle {
  margin-right: 8px;
}

/* 表单组 */
.form-group {
  margin-bottom: 24px;
}

/* 输入组 */
.input-group {
  display: flex;
  align-items: center;
  border: 1px solid #dcdfe6;
  border-radius: 10px;
  padding: 0 16px;
  transition: all 0.3s ease;
}

.input-group:hover {
  border-color: #c0c4cc;
}

.input-group.is-error {
  border-color: #f56c6c;
}

/* 输入图标 */
.input-icon {
  width: 24px;
  color: #909399;
  margin-right: 12px;
}

/* 输入框 */
.form-input {
  flex: 1;
  height: 50px;
  border: none;
  outline: none;
  font-size: 16px;
  color: #303133;
  background: transparent;
}

.form-input::placeholder {
  color: #c0c4cc;
}

/* 登录按钮 */
.login-btn {
  width: 100%;
  height: 52px;
  background: linear-gradient(135deg, #409eff, #66b1ff);
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 10px 20px rgba(64, 158, 255, 0.2);
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px rgba(64, 158, 255, 0.3);
}

.login-btn:active {
  transform: translateY(0);
  box-shadow: 0 5px 10px rgba(64, 158, 255, 0.2);
}

.login-btn.btn-loading {
  background: linear-gradient(135deg, #a0cfff, #c6e2ff);
  cursor: not-allowed;
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes success-pulse {
  0% { transform: scale(1); box-shadow: 0 0 0 rgba(66, 184, 131, 0); }
  50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(66, 184, 131, 0.6); }
  100% { transform: scale(1); box-shadow: 0 0 0 rgba(66, 184, 131, 0); }
}

@keyframes shake-animation {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease forwards;
}

.success-animation {
  animation: success-pulse 1s ease-in-out;
}

.shake-animation {
  animation: shake-animation 0.5s ease-in-out;
}

/* 响应式设计 */
@media (max-width: 576px) {
  .login-card {
    padding: 36px 24px;
    max-width: 340px;
  }
  
  .login-title {
    font-size: 20px;
  }
  
  .form-input {
    height: 46px;
    font-size: 14px;
  }
  
  .login-btn {
    height: 48px;
    font-size: 15px;
  }
}
</style>