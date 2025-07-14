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
            <div class="standard-code">DIRECTIVE (EU) 2019/882</div>
            <div class="version-details">
              <span class="standard-version">EN 301 549 </span>
              <span class="standard-version">V4.1.1c(2025-05)</span>
              <span class="app-version">- v.0.0.15</span>
            </div>
          </div>
          <img src="../assets/logo.png" class="lab-logo" alt="实验室Logo" />
        </div>
      </div>
    </div>

    <!-- 重新展示按钮 -->
    <button v-show="!isVisible" class="show-btn" @click="showCard">
      <i class="fa fa-info-circle mr-1"></i> 显示实验室信息
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: true, // 控制卡片显示状态
    };
  },
  methods: {
    closeCard() {
      this.isVisible = false;
    },
    showCard() {
      this.isVisible = true;
    },
  },
};
</script>

<style>
:root {
  /* 颜色变量 */
  --primary-color: #003366;
  --secondary-color: #2d4271;
  --text-light: #6b7c93;
  --text-dark: #003366;
  --border-color: #e8eef6;
  --bg-light: #f5f7fa;
  --accent-color: #e53e3e;

  /* 尺寸变量 */
  --card-width: 400px;
  --card-padding: 24px;
  /* 图片尺寸 */
  --logo-size: 100px;
  --title-size: 20px;
  --subtitle-size: 15px;
  --version-size: 13px;
}

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
  width: var(--card-width);
  padding: var(--card-padding);
  background-color: rgba(255, 255, 255, 0.96);
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border-left: 4px solid var(--primary-color);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  /* 确保卡片高度自适应内容，不固定高度 */
}

/* 关闭按钮样式 */
.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  font-size: 18px;
  color: var(--text-light);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background-color: var(--bg-light);
  color: var(--accent-color);
  transform: scale(1.1);
}

.info-header {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
  gap: 12px; /* 缩小图片与文本的间距，适配大图片 */
  margin-bottom: 16px;
}

.text-group {
  flex: 1; /* 文本部分占剩余空间，确保不被图片挤压 */
  min-width: 0; /* 解决flex子元素内容溢出问题 */
}

.main-title {
  font-size: var(--title-size);
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 4px;
  letter-spacing: 0.3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.standard-code {
  font-size: var(--subtitle-size);
  color: var(--secondary-color);
  font-family: "Segoe UI", Roboto, sans-serif;
  margin-bottom: 2px;
}

.version-details {
  font-size: var(--version-size);
  color: var(--secondary-color);
  font-family: "Segoe UI", Roboto, sans-serif;
  line-height: 1.4;
}

.standard-version {
  font-weight: 500;
}

.app-version {
  color: var(--text-light);
}

.lab-logo {
  width: var(--logo-size);
  height: var(--logo-size);
  object-fit: contain; /* 保持图片比例，不拉伸 */
  border-radius: 5px;
  padding: 6px;
  background-color: var(--bg-light);
  /* 确保图片不超出卡片 */
  max-width: calc(100% - 40px);
}

.lab-info-card:hover {
  box-shadow: 0 10px 25px rgba(0, 51, 102, 0.15);
  transform: translateY(-2px);
}

/* 重新展示按钮样式 */
.show-btn {
  background-color: var(--primary-color);
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
  box-shadow: 0 6px 16px rgba(0, 51, 102, 0.3);
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

/* 响应式设计 */
@media (max-width: 576px) {
  :root {
    --card-width: 280px;
    --card-padding: 18px;
    --logo-size: 90px; /* 小屏幕下图片尺寸稍小但仍比原来大 */
    --title-size: 18px;
    --subtitle-size: 14px;
    --version-size: 12px;
  }

  .lab-info-container {
    top: 10px;
    left: 10px;
  }
}
</style>