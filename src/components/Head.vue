<template>
  <div class="lab-info-container">
    <!-- 卡片主体 -->
    <div class="lab-info-fixed" v-show="isVisible">
      <div class="lab-info-card">
        <!-- 关闭按钮 -->
        <div class="close-btn" @click="closeCard">×</div>
        
        <div class="info-header">
          <div class="text-group">
            <div class="main-title">SGS EAA LAB</div>
            <div class="standard-code">EN301 549 4.1.1c</div>
          </div>
          <img src="../assets/logo.png" class="lab-logo" />
        </div>
        <div class="version-info">
          <span class="version-label">Version:</span>
          <span class="version-number">v0.0.015</span>
        </div>
      </div>
    </div>
    
    <!-- 重新展示按钮 -->
    <button 
      v-show="!isVisible" 
      class="show-btn" 
      @click="showCard"
    >
      <i class="fa fa-info-circle mr-1"></i> 显示实验室信息
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: true // 控制卡片显示状态
    }
  },
  methods: {
    // 关闭卡片
    closeCard() {
      this.isVisible = false;
    },
    // 重新展示卡片
    showCard() {
      this.isVisible = true;
    }
  }
}
</script>

<style>
.lab-info-container {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
}

.lab-info-fixed {
  position: relative;
}

.lab-info-card {
  width: 280px;
  padding: 18px;
  background-color: rgba(255, 255, 255, 0.96);
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border-left: 4px solid #003366;
  transition: all 0.3s ease;
  position: relative;
}

/* 关闭按钮样式 */
.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 20px;
  height: 20px;
  font-size: 18px;
  color: #6b7c93;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background-color: #f0f2f5;
  color: #e53e3e;
  transform: scale(1.1);
}

.info-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
  padding-right: 10px;
}

.text-group {
  flex: 1;
}

.main-title {
  font-size: 18px;
  font-weight: 700;
  color: #003366;
  margin-bottom: 4px;
  letter-spacing: 0.3px;
}

.standard-code {
  font-size: 14px;
  color: #2d4271;
  font-family: 'Segoe UI', Roboto, sans-serif;
  padding-left: 2px;
}

.lab-logo {
  width: 65px;
  height: 65px;
  object-fit: contain;
  border-radius: 5px;
  padding: 6px;
  background-color: #f5f7fa;
}

.version-info {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 10px;
  border-top: 1px solid #e8eef6;
  font-size: 12px;
}

.version-label {
  color: #6b7c93;
  margin-right: 5px;
}

.version-number {
  color: #003366;
  font-weight: 500;
}

.lab-info-card:hover {
  box-shadow: 0 6px 20px rgba(0, 38, 100, 0.15);
  transform: translateY(-1px);
}

/* 重新展示按钮样式 */
.show-btn {
  background-color: #003366;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 51, 102, 0.2);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
}

.show-btn:hover {
  background-color: #004080;
  box-shadow: 0 4px 12px rgba(0, 51, 102, 0.3);
  transform: translateY(-1px);
}

.show-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 51, 102, 0.2);
}

/* 图标间距 */
.mr-1 {
  margin-right: 4px;
}
</style>