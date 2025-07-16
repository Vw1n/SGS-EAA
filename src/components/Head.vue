<template>
  <div class="lab-info-container">
    <!-- 卡片主体 -->
    <div class="lab-info-wrapper" v-show="isVisible">
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
      isVisible: true,
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
  /* 颜色变量保持不变 */
  --primary-color: #ed6d2d;
  --secondary-color: #2d4271;
  --text-light: #6b7c93;
  --text-dark: #003366;
  --border-color: #e8eef6;
  --bg-light: #f5f7fa;
  --accent-color: #e53e3e;

  /* 固定尺寸（仅再次减小高度） */
  --card-fixed-width: 670px;
  --card-fixed-height: 100px; /* 桌面端从120px→100px */
}

.lab-info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px 0;
}

.lab-info-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.lab-info-card {
  width: var(--card-fixed-width);
  height: var(--card-fixed-height);
  max-width: 90%;
  padding: 5px 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
  border-left: 4px solid var(--primary-color);
  transition: all 0.3s ease;
  position: relative;
  box-sizing: border-box;
}

.close-btn {
  position: absolute;
  top: 10px; /* 略微上移适应新高度 */
  right: 10px;
  width: 20px;
  height: 20px;
  font-size: 16px;
  color: var(--text-light);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  background: var(--bg-light);
}

.close-btn:hover {
  background-color: var(--primary-color);
  color: white;
  transform: scale(1.1);
}

.info-header {
  display: flex;
  align-items: center;
  gap: 20px;
  height: calc(100% - 5px); /* 适应新高度 */
}

.text-group {
  flex: 1;
  min-width: 0;
  padding: 3px 0; /* 减少内边距 */
}

.main-title {
  font-size: 18px; /* 标题略小适应高度 */
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 4px; /* 进一步减小间距 */
  letter-spacing: 0.2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.standard-code {
  font-size: 14px; /* 副标题略小 */
  color: var(--secondary-color);
  font-family: "Segoe UI", Roboto, sans-serif;
  margin-bottom: 2px; /* 最小化间距 */
  font-weight: 500;
}

.version-details {
  font-size: 12px; /* 版本号略小 */
  color: var(--text-light);
  font-family: "Segoe UI", Roboto, sans-serif;
  line-height: 1.3;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.standard-version {
  color: var(--secondary-color);
  font-weight: 500;
}

.lab-logo {
  width: 75px; /* 图片尺寸略减适应高度 */
  height: 75px;
  object-fit: contain;
  border-radius: 6px;
  padding: 6px;
  background-color: var(--bg-light);
  border: 1px solid var(--border-color);
}

.lab-info-card:hover {
  box-shadow: 0 8px 20px rgba(0, 51, 102, 0.15);
  transform: translateY(-2px);
}

.show-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 51, 102, 0.2);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.show-btn:hover {
  background-color: #004080;
  box-shadow: 0 4px 12px rgba(0, 51, 102, 0.3);
  transform: translateY(-1px);
}

.mr-1 {
  margin-right: 6px;
}

/* 响应式高度同步减小 */
@media (max-width: 768px) {
  :root {
    --card-fixed-width: 90%;
    --card-fixed-height: 95px; /* 从110px→95px */
  }

  .lab-logo {
    width: 70px;
    height: 70px;
  }

  .main-title {
    font-size: 17px;
  }

  .standard-code {
    font-size: 13px;
  }
}

@media (max-width: 576px) {
  :root {
    --card-fixed-height: 85px; /* 从100px→85px */
  }

  .lab-logo {
    width: 65px;
    height: 65px;
  }

  .main-title {
    font-size: 16px;
  }

  .standard-code {
    font-size: 12px;
  }

  .version-details {
    font-size: 11px;
    gap: 4px;
  }
}
</style>