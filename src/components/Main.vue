<template>
  <div class="product-selection-container">
    <div class="product-card">
      <!-- 产品选择标题 -->
      <h3 class="card-title">
        Please select the product category for EAA Directive
      </h3>

      <!-- 产品下拉选择区 -->
      <div class="form-group">
        <el-select
          v-model="value"
          placeholder="product category"
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
          提醒：该类型设备有可能支持移动端程序应用（Apps）
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
          <el-checkbox
            v-model="checked3"
            label="Others"
            size="large"
            class="custom-checkbox"
          />
        </div>
      </div>

      <!-- 适用条款区 -->
      <div v-if="Clause.length" class="clause-section animate-fade-in">
        <h4 class="section-title">Test Clause</h4>
        <div class="red-alert-text">
          SGS EAA Lab only evaluates the requirements in Table ZB.1 of the EN
          301 549.
        </div>
        <el-checkbox-group v-model="checkedclause" class="checkbox-group">
          <el-checkbox
            v-for="(item, index) in Clause"
            :key="index"
            :label="item"
            class="custom-checkbox"
          >
            {{ item }}
            <span class="clause-price">({{ itemsMap[item] }} Items)</span>
          </el-checkbox>
        </el-checkbox-group>
        <div></div>
      </div>

      <div class="animate-fade-in cycle-section">
        <h4 class="section-title">Lead Time(Working Days)</h4>
        <div class="cycle-content">
          <div class="cycle-item">
            <span class="cycle-label">Wave #1: Release Hight Risk Items</span>
            <span class="cycle-value">{{ Time[0] }} Working Days</span>
          </div>
          <div class="cycle-item">
            <span class="cycle-label">Wave #1: Release Full Test Items</span>
            <span class="cycle-value">{{ Time[1] }} Working Days</span>
          </div>
          <div class="cycle-item">
            <span class="cycle-label">Wave #2: Release Test Report + VoC</span>
            <span class="cycle-value">{{ Time[2] }} Working Days</span>
          </div>
        </div>
      </div>

      <div class="test-samples-section">
        <div class="section-subtitle">Test Samples</div>
        <div class="test-samples-group">
          <!-- 统一容器 -->
          <el-checkbox
            v-model="checked4"
            label="是否支持RTT功能"
            size="large"
            class="sample-checkbox"
          />
          <div class="sample-quantity">
            Sample quantity <span class="quantity-value">{{ quantity }}</span>
          </div>
        </div>
      </div>

      <!-- 费用展示区 -->
      <div class="cost-section animate-fade-in">
        <h4 class="section-title">Quotation(CNY)</h4>
        <div class="cost-display">¥{{ cost.toLocaleString() }}</div>
      </div>
    </div>
    <div class="export-section">
      <ExportButton :isDisabled="!value" @export="handleExport" />
    </div>
  </div>
  <logout />
</template>

<script setup>
import { ref, computed, watch } from "vue";
import Logout from "./Logout.vue";
import ExportButton from "./ExportButton.vue";
// 导入导出工具函数
import { exportJsonToExcel } from "../utils/excel-export";

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
const checked3 = ref(false);
const showOsSelection = ref(false);

const checked4 = ref(false);
const quantity = computed(() => (checked4.value ? 5 : 2));

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
const Clause = computed(() => clauseMap[value.value] || []);

// 章节测试条目映射
const itemsMap = {
  "Clause 5": 38,
  "Clause 6": 37,
  "Clause 7": 8,
  "Clause 8": 19,
  "Clause 9": 57,
  "Clause 10": 57,
  "Clause 11": 69,
  "Clause 12": 3,
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

// 操作系统价格映射
const osPriceMap = {
  IOS: 10000,
  Android: 10000,
  Others: 10000,
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
    if (checked3.value) totalCost += osPriceMap["Others"];
  }

  // 计算选中条款的费用
  checkedclause.value.forEach((clause) => {
    totalCost += clausePriceMap[clause] || 0;
  });

  return totalCost;
});

// 导出Excel功能（使用工具函数）
const handleExport = () => {
  // 准备导出数据
  console.log(Time);
  const exportData = [
    { 项目: "产品类别", 信息: value.value },
    { 项目: "是否支持移动端", 信息: showOsSelection.value ? "是" : "否" },
    { 项目: "支持的操作系统", 信息: getSelectedOS() },
    { 项目: "总费用(CNY)", 信息: `¥${cost.value.toLocaleString()}` },
    { 项目: "", 信息: "" },

    { 项目: "测试周期", 信息: "" },
    {
      项目: "Wave #1: Release Hight Risk Items",
      信息: `${Time.value[0]} Working Days`,
    },
    {
      项目: "Wave #1: Release Full Test Items",
      信息: `${Time.value[1]} Working Days`,
    },
    {
      项目: "Wave #2: Release Test Report + VoC",
      信息: `${Time.value[2]} Working Days`,
    },
    { 项目: "", 信息: "" },

    { 项目: "测试条款", 信息: "测试条目数", 额外信息: "费用(CNY)" },
    ...checkedclause.value.map((clause) => ({
      项目: clause,
      信息: itemsMap[clause] + " Items",
      额外信息: clausePriceMap[clause]
        ? `¥${clausePriceMap[clause].toLocaleString()}`
        : "",
    })),
  ];

  // 使用工具函数导出
  exportJsonToExcel(
    exportData,
    `EAA_${value.value}_${new Date().toLocaleDateString().replace(/\//g, "-")}`,
    { 项目: "项目", 信息: "信息", 额外信息: "额外信息" } // 表头映射（可选）
  );
};

// 获取选中的操作系统文本
const getSelectedOS = () => {
  if (!showOsSelection.value) return "";

  const osList = [];
  if (checked1.value) osList.push("IOS");
  if (checked2.value) osList.push("Android");
  if (checked3.value) osList.push("Others");

  return osList.length ? osList.join(", ") : "无";
};
</script>

<style scoped>
/* 容器与卡片基础样式 */
.product-selection-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
}

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

/* 标题样式（统一管理各级标题） */
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

.section-subtitle {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 12px;
  padding-left: 4px;
}

/* 表单与选择器样式 */
.form-group {
  margin-bottom: 25px;
}

.custom-select {
  width: 100% !important;
}

/* 复选框通用样式 */
.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 20px;
  padding: 5px 0;
  align-items: center;
}

.custom-checkbox {
  flex: 0 0 auto;
  min-width: 120px;
  padding: 4px 0;
  display: flex;
  align-items: center;
}

.custom-checkbox .el-checkbox__label {
  margin-left: 8px;
  white-space: nowrap;
}

/* 条款相关样式 */
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

.red-alert-text {
  color: #f53f3f;
  font-size: 12px;
  line-height: 1.5;
  margin-top: 12px;
  padding-left: 4px;
  font-weight: 500;
  border-left: 2px solid #ffccc7;
}

/* 周期区域样式 */
.cycle-section {
  padding: 16px;
  background-color: #f9fafb;
  border-radius: 8px;
  margin: 15px 0;
}

.section-title + .cycle-content {
  margin-top: 12px;
}

.cycle-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cycle-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.cycle-item:hover {
  background-color: #f0f2f5;
}

.cycle-label {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.cycle-value {
  font-size: 15px;
  color: #007bff;
  font-weight: 600;
  padding-left: 15px;
}

/* 移动端支持选项样式 */
.mobile-support-option {
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  background-color: #fcfcfc;
  border: 1px solid #f0f0f0;
}

.os-hint.red-highlight {
  color: #f53f3f;
  font-size: 14px;
  line-height: 1.6;
  padding: 8px 12px;
  margin-bottom: 12px;
  border-left: 3px solid #f53f3f;
  background-color: #fff1f0;
  border-radius: 0 4px 4px 0;
  font-weight: 500;
}

.os-checkbox {
  margin-top: 4px;
}

/* 测试样本区域样式（优化后） */
.test-samples-section {
  padding: 16px;
  margin: 15px 0;
  border-radius: 8px;
  background-color: #f9fafb;
  border: 1px solid #f0f0f0;
}

.test-samples-group {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 8px 0;
}

.sample-checkbox {
  flex: 0 0 auto;
}

.sample-checkbox .el-checkbox__label {
  margin-left: 8px;
  font-size: 14px;
  color: #444;
}

.sample-quantity {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
  padding-left: 16px;
  border-left: 1px solid #e5e5e5;
  flex: 1;
}

.quantity-value {
  margin-left: 4px;
  font-size: 16px;
  font-weight: 600;
  color: #007bff;
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

/* 响应式调整（统一管理小屏幕样式） */
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

  .section-subtitle {
    font-size: 15px;
  }

  .clause-list {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .cost-display {
    font-size: 24px;
  }

  .checkbox-group {
    gap: 10px 15px;
  }

  .custom-checkbox {
    min-width: 100px;
  }

  .red-alert-text {
    font-size: 11px;
    margin-top: 10px;
  }

  .cycle-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .cycle-value {
    padding-left: 0;
    color: #4096ff;
  }

  .test-samples-group {
    gap: 8px;
    flex-direction: column;
    align-items: flex-start;
  }

  .sample-quantity {
    border-left: none;
    padding-left: 0;
    padding-top: 8px;
    border-top: 1px solid #e5e5e5;
    width: 100%;
  }

  .quantity-value {
    font-size: 15px;
  }
}
</style>