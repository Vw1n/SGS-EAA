<template>
  <div class="product-selection-container">
    <div class="product-card">
      <!-- 产品选择标题 -->
      <h3 class="card-title">产品选择</h3>

      <!-- 产品下拉选择区 -->
      <div class="form-group">
        <el-select
          v-model="value"
          placeholder="Product(Host)"
          size="large"
          class="custom-select"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <!-- 移动端支持复选框 -->
      <div class="mobile-support-option" v-if="value">
        <div v-if="osHight" class="os-hint red-highlight">
          该类型设备常见包含移动端支持
        </div>
        <el-checkbox
          v-model="showOsSelection"
          label="是否支持移动端"
          size="large"
          class="os-checkbox"
        />
      </div>

      <!-- 移动端操作系统选择区 (仅当需要时显示) -->
      <div v-if="showOsSelection" class="os-selection animate-fade-in">
        <h4 class="section-title">移动端支持的操作系统</h4>
        <div class="checkbox-group">
          <el-checkbox
            v-model="checked1"
            label="IOS"
            size="large"
            class="custom-checkbox"
          />
          <el-checkbox
            v-model="checked2"
            label="Android"
            size="large"
            class="custom-checkbox"
          />
        </div>
      </div>

      <!-- 适用条款区 (有条款时显示) -->
      <div v-if="Clause.length" class="clause-section animate-fade-in">
        <h4 class="section-title">适用条款</h4>
        <el-checkbox-group v-model="checkedclause">
          <el-checkbox
            v-for="(item, index) in Clause"
            :key="index"
            :label="item"
          >
            {{ item }}
          </el-checkbox>
        </el-checkbox-group>
      </div>

      <div class="animate-fade-in cycle-section">
        <h4 class="section-title">周期</h4>
        <div class="cycle-content">
          <div class="cycle-item">
            <span class="cycle-label">Test Result for Hight Risk Items</span>
            <span class="cycle-value">{{ Time[0] }}天</span>
            <!-- 建议加上单位更清晰 -->
          </div>
          <div class="cycle-item">
            <span class="cycle-label">Wave #1 Full Test</span>
            <span class="cycle-value">{{ Time[1] }}天</span>
          </div>
          <div class="cycle-item">
            <span class="cycle-label">Report+VoC</span>
            <span class="cycle-value">{{ Time[2] }}天</span>
          </div>
        </div>
      </div>
      <!-- 费用展示区 -->
      <div class="cost-section animate-fade-in">
        <h4 class="section-title">费用</h4>
        <div class="cost-display">¥{{ cost.toLocaleString() }}</div>
      </div>
    </div>
  </div>
  <logout />
</template>

<script setup>
import { ref, computed, watch } from "vue";
import Logout from "./Logout.vue";

// 下拉选择框
const value = ref("");
const options = [
  { value: "AIO", label: "AIO" },
  { value: "ATM", label: "ATM" },
  { value: "Camera", label: "Camera" },
  { value: "Pad", label: "Pad" },
  { value: "POS", label: "POS" },
  { value: "Projector(with OS)", label: "Projector(with OS)" },
  { value: "Telephone", label: "Telephone" },
  { value: "Router/CPE/AP/Gatway", label: "Router/CPE/AP/Gatway" },
  { value: "Set-top Box", label: "Set-top Box" },
  { value: "Smart Home Devices", label: "Smart Home Devices" },
  { value: "Smart Phone", label: "Smart Phone" },
  { value: "Smart Watch", label: "Smart Watch" },
  { value: "Television", label: "Television" },
  { value: "Website", label: "Website" },
];
// 常见移动端高亮映射
const osHightMap = {
  Camera: true,
  POS: true,
  "Router/CPE/AP/Gatway": true,
  "Set-top Box": true,
  "Smart Home Devices": true,
  Television: true,
};
const osHight = computed(() => osHightMap[value.value] || false);

// 移动端操作系统选择器
const checked1 = ref(false);
const checked2 = ref(false);
const showOsSelection = ref(false);

// 章节映射
const clauseMap = {
  AIO: [
    "Clause 5",
    "Clause 7",
    "Clause 8",
    "Clause 10",
    "Clause 11",
    "Clause 12",
  ],
  ATM: ["Clause 5", "Clause 8", "Clause 10", "Clause 11", "Clause 12"],
  Camera: [
    "Clause 5",
    "Clause 7",
    "Clause 8",
    "Clause 10",
    "Clause 11",
    "Clause 12",
  ],
  Pad: [
    "Clause 5",
    "Clause 7",
    "Clause 8",
    "Clause 10",
    "Clause 11",
    "Clause 12",
  ],
  POS: ["Clause 5", "Clause 8", "Clause 10", "Clause 11", "Clause 12"],
  "Projector(with OS)": [
    "Clause 5",
    "Clause 7",
    "Clause 8",
    "Clause 10",
    "Clause 11",
    "Clause 12",
  ],
  Telephone: [
    "Clause 5",
    "Clause 6",
    "Clause 8",
    "Clause 10",
    "Clause 11",
    "Clause 12",
  ],
  "Router/CPE/AP/Gatway": [
    "Clause 5",
    "Clause 8",
    "Clause 9",
    "Clause 10",
    "Clause 12",
  ],
  "Set-top Box": [
    "Clause 5",
    "Clause 7",
    "Clause 8",
    "Clause 10",
    "Clause 11",
    "Clause 12",
  ],
  "Smart Home Devices": [
    "Clause 5",
    "Clause 7",
    "Clause 8",
    "Clause 10",
    "Clause 11",
    "Clause 12",
  ],
  "Smart Phone": [
    "Clause 5",
    "Clause 7",
    "Clause 8",
    "Clause 10",
    "Clause 11",
    "Clause 12",
  ],
  "Smart Watch": [
    "Clause 5",
    "Clause 7",
    "Clause 8",
    "Clause 10",
    "Clause 11",
    "Clause 12",
  ],
  Television: [
    "Clause 5",
    "Clause 7",
    "Clause 8",
    "Clause 10",
    "Clause 11",
    "Clause 12",
  ],
  Website: ["Clause 9"],
};

// 条款价格映射
const clausePriceMap = {
  "Clause 5": 15000,
  "Clause 6": 20000,
  "Clause 7": 10000,
  "Clause 8": 5000,
  "Clause 9": 15000,
  "Clause 10": 15000,
  "Clause 11": 25000,
  "Clause 12": 2000,
};
const Clause = computed(() => clauseMap[value.value] || []);

// 操作系统价格映射
const osPriceMap = {
  IOS: 10000,
  Android: 10000,
};

// 监听条款数组变化，自动全选
const checkedclause = ref([]);
watch(
  () => Clause.value,
  (newClause) => {
    // 当新条款数组有值时，将 checkedclause 设为新条款数组（全选）
    if (newClause.length) {
      checkedclause.value = [...newClause];
    } else {
      checkedclause.value = [];
    }
  },
  { immediate: true }
);

// 周期映射
const TimeMap = {
  AIO: [10, 20, 23],
  ATM: [10, 17, 20],
  Camera: [10, 20, 23],
  Pad: [19, 30, 33],
  POS: [10, 17, 20],
  "Projector(with OS)": [10, 20, 23],
  Telephone: [10, 17, 20],
  "Router/CPE/AP/Gatway": [15, 20, 23],
  "Set-top Box": [15, 20, 23],
  "Smart Home Devices": [10, 20, 23],
  "Smart Phone": [20, 30, 33],
  "Smart Watch": [10, 20, 23],
  Television: [15, 20, 23],
  Website: [10, 20, 23],
};
const Time = computed(() => TimeMap[value.value] || []);

// 计算最终费用：操作系统费用 + 条款费用
const cost = computed(() => {
  let totalCost = 0;

  // 如果显示操作系统选择，计算操作系统相关费用
  if (showOsSelection.value) {
    if (checked1.value) totalCost += osPriceMap["IOS"];
    if (checked2.value) totalCost += osPriceMap["Android"];
  }

  // 计算选中条款的费用
  checkedclause.value.forEach((clause) => {
    totalCost += clausePriceMap[clause] || 0;
  });

  return totalCost;
});
</script>

<style scoped>
/* 容器样式 */
.product-selection-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

/* 卡片样式 */
.product-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 30px;
  transition: all 0.3s ease;
}

.product-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

/* 标题样式 */
.card-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 25px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
}

.section-title {
  font-size: 18px;
  font-weight: 500;
  color: #555;
  margin: 20px 0 15px;
}

/* 表单组样式 */
.form-group {
  margin-bottom: 25px;
}

/* 自定义选择器样式 */
.custom-select {
  width: 100% !important;
}

/* 复选框组样式 */
.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.custom-checkbox {
  margin-right: 15px;
}

/* 条款列表样式 */
.clause-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}

.clause-item {
  background-color: #f7f7f7;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  color: #444;
  transition: all 0.2s ease;
}

.clause-item:hover {
  background-color: #e9e9e9;
}

/* 费用显示样式 */
.cost-display {
  font-size: 28px;
  font-weight: 600;
  color: #007bff;
  padding: 15px;
  background-color: #f0f8ff;
  border-radius: 8px;
  text-align: center;
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease forwards;
}

/* 响应式设计 */
@media (max-width: 576px) {
  .product-card {
    padding: 20px;
  }

  .card-title {
    font-size: 20px;
  }

  .section-title {
    font-size: 16px;
  }

  .clause-list {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .cost-display {
    font-size: 24px;
  }
}
/* 周期区域整体样式 */
.cycle-section {
  padding: 16px;
  background-color: #f9fafb;
  border-radius: 8px;
  margin: 15px 0;
}

/* 周期标题样式（复用section-title并微调） */
.section-title + .cycle-content {
  margin-top: 12px; /* 标题与内容间距 */
}

/* 周期内容容器 */
.cycle-content {
  display: flex;
  flex-direction: column;
  gap: 10px; /* 各项之间的间距 */
}

/* 单个周期项样式 */
.cycle-item {
  display: flex;
  justify-content: space-between; /* 标签左对齐，时间右对齐 */
  align-items: center;
  padding: 8px 10px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

/* 鼠标悬停效果 */
.cycle-item:hover {
  background-color: #f0f2f5;
}

/* 周期标签样式 */
.cycle-label {
  font-size: 14px;
  color: #333;
  font-weight: 500; /* 轻微加粗突出标签 */
}

/* 周期时间值样式 */
.cycle-value {
  font-size: 15px;
  color: #007bff; /* 与费用颜色呼应，保持主题一致 */
  font-weight: 600;
  padding-left: 15px; /* 与标签保持距离 */
}

/* 响应式调整 */
@media (max-width: 576px) {
  .cycle-item {
    flex-direction: column; /* 小屏幕下标签在上，时间在下 */
    align-items: flex-start;
    gap: 4px;
  }

  .cycle-value {
    padding-left: 0;
    color: #4096ff; /* 稍浅一点的蓝色适配小屏视觉 */
  }
}
/* 移动端支持选项容器 */
.mobile-support-option {
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  background-color: #fcfcfc;
  border: 1px solid #f0f0f0;
}

/* 红色高亮提示文本 */
.os-hint.red-highlight {
  color: #f53f3f; /* 主红色，醒目但不刺眼 */
  font-size: 14px;
  line-height: 1.6;
  padding: 8px 12px;
  margin-bottom: 12px; /* 与复选框保持距离 */
  border-left: 3px solid #f53f3f; /* 左侧红色边框强化高亮 */
  background-color: #fff1f0; /* 浅红色背景，增强区域感 */
  border-radius: 0 4px 4px 0; /* 右侧圆角柔和边缘 */
  font-weight: 500; /* 轻微加粗提升关注度 */
}

/* 复选框与提示的间距协调 */
.os-checkbox {
  margin-top: 4px;
}
</style>