<template>
  <!-- 模板内容不变，仅修改样式 -->
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
          placeholder="Product Category"
          size="large"
          class="custom-select"
        >
          <el-option-group
            v-for="group in options"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-option-group>
          <template #footer>如找不到对应类别，请联系Ryan Yang报价</template>
        </el-select>
      </div>

      <div class="link-number">
        <el-input
          v-if="value === 'Website'"
          v-model="linkNum"
          style="width: 300px"
          placeholder="输入Link数量"
        />
      </div>

      <!-- 移动端支持复选框 -->
      <div class="mobile-support-option" v-if="value">
        <div v-if="osHight" class="os-hint red-highlight">
          提醒：所选产品除本体支持安装Apps外，还有可能支持移动端Apps控制场景。
        </div>
        <el-checkbox
          v-model="showOsSelection"
          label="是否支持移动端"
          size="large"
          class="os-checkbox"
        />
      </div>

      <!-- 移动端操作系统选择区 -->
      <div v-if="showOsSelection" class="os-selection animate-fade-in">
        <h4 class="section-title">
          如支持移动端Apps，请勾选Apps安装在移动端的操作系统：
        </h4>
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
          <el-input
            v-if="checked3"
            v-model="inputOS"
            style="width: 120px"
            placeholder="输入系统名称"
          />
        </div>
        <el-input
          v-if="showOsSelection"
          v-model="appNum"
          style="width: 400px"
          placeholder="输入app数量"
        />
      </div>

      <!-- 适用条款区 -->
      <div v-if="Clause.length" class="clause-section-wrapper">
        <div class="section-header">
          <h4 class="section-title">Test Clause</h4>
          <button class="toggle-btn" @click="showClause = !showClause">
            {{ showClause ? "隐藏" : "显示" }}
          </button>
        </div>
        <div v-if="showClause" class="clause-section animate-fade-in">
          <div class="red-alert-wrapper">
            <div class="red-alert-text">
              SGS EAA Lab only evaluates the requirements in Table ZB.1 of the
              EN 301 549.
            </div>
            <div
              class="red-alert-text"
              v-if="
                value == 'Smart Phone' ||
                value == 'Smart Watch' ||
                value == 'Tablet/Pad'
              "
            >
              This quotation does not include the HAC tests.
            </div>
          </div>
          <el-checkbox-group
            class="checkbox-group clause-checkboxes"
            v-model="clausechecked"
          >
            <el-checkbox
              v-for="(item, index) in Clause"
              :key="index"
              :label="item"
              class="custom-checkbox clause-checkbox-item"
              :title="titleMap[item]"
              checked="true"
            >
              <div class="clause-item">
                <span class="clause-label">{{ item }}</span>
              </div>
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>

      <!-- 周期区域 -->
      <div v-if="value" class="cycle-section-wrapper">
        <div class="section-header">
          <h4 class="section-title">Lead Time(Working Days)</h4>
          <button class="toggle-btn" @click="showLeadTime = !showLeadTime">
            {{ showLeadTime ? "隐藏" : "显示" }}
          </button>
        </div>
        <div v-if="showLeadTime" class="animate-fade-in cycle-section">
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
              <span class="cycle-label"
                >Wave #2: Release Test Report + VoC</span
              >
              <span class="cycle-value">{{ Time[2] }} Working Days</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 测试样本区域 -->
      <div v-if="value" class="test-samples-section-wrapper">
        <div class="section-header">
          <div class="section-title">Test Sample(Unit)</div>
          <button class="toggle-btn" @click="showTestSample = !showTestSample">
            {{ showTestSample ? "隐藏" : "显示" }}
          </button>
        </div>
        <div v-if="showTestSample" class="test-samples-section">
          <div class="test-samples-group">
            <div class="sample-quantity">
              Sample Quantity
              <span class="quantity-value">{{ quantity }}</span>
            </div>
            <el-checkbox
              v-model="checked4"
              label="是否支持RTT"
              size="large"
              class="sample-checkbox"
            />
            <el-checkbox
              v-model="checked5"
              label="是否支持HAC"
              size="large"
              class="sample-checkbox"
            />
          </div>
        </div>
      </div>

      <!-- 费用展示区 -->
      <div class="cost-section-wrapper">
        <div class="section-header">
          <h4 class="section-title">Quotation(CNY,Not includingVAT)</h4>
          <button class="toggle-btn" @click="showQuotation = !showQuotation">
            {{ showQuotation ? "隐藏" : "显示" }}
          </button>
        </div>
        <div v-if="showQuotation" class="cost-section animate-fade-in">
          <div class="cost-display">¥{{ cost.toLocaleString() }} (CNY)</div>
        </div>
      </div>
    </div>
    <div class="export-section">
      <ExportButton :isDisabled="!value" @export="handleExport" />
    </div>
  </div>
  <logout />
</template>

<script setup>
// 脚本部分不变
import { ref, computed } from "vue";
import Logout from "./Logout.vue";
import ExportButton from "./ExportButton.vue";
import { exportJsonToExcel } from "../utils/excel-export";

// 控制各区块显示/隐藏的状态（默认显示）
const showClause = ref(true);
const showLeadTime = ref(true);
const showTestSample = ref(true);
const showQuotation = ref(true);

// 下拉选择框
const value = ref(null);
const options = [
  {
    label: "===EAA Product产品===",
    options: [
      { value: "All in One(AIO)", label: "All in One(AIO)" },
      { value: "ATM", label: "ATM" },
      { value: "Camera", label: "Camera" },
      { value: "Tablet/Pad", label: "Tablet/Pad" },
      { value: "POS", label: "POS" },
      { value: "Projector(with OS)", label: "Projector(with OS)" },
      { value: "Telephone", label: "Telephone" },
      { value: "Router/CPE/AP/Gateway", label: "Router/CPE/AP/Gateway" },
      { value: "Set-top Box", label: "Set-top Box" },
      { value: "Smart Home Devices", label: "Smart Home Devices" },
      { value: "Smart Phone", label: "Smart Phone" },
      { value: "Smart Watch", label: "Smart Watch" },
      { value: "Television", label: "Television" },
    ],
  },
  {
    label: "===EAA Services服务===",
    options: [
      { value: "Website(s)", label: "Website(s)" },
      { value: "Mobile App(s)", label: "Mobile App(s)" },
    ],
  },
];

// 常见移动端高亮映射
const osHightMap = {
  Camera: true,
  POS: true,
  "Router/CPE/AP/Gateway": true,
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
const checked5 = ref(false);
const quantity = computed(() => {
  let quantity = 3;
  if (checked4.value) quantity += 2;
  if (checked5.value) quantity += 1;
  return quantity;
});
const clausechecked = ref([]);

const inputOS = ref("");
const appNum = ref(null);
const linkNum = ref(null);

// 章节映射
const clauseMap = {
  "All in One(AIO)": [
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
  "Tablet/Pad": [
    "Clause 5",
    "Clause 6",
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
  "Router/CPE/AP/Gateway": [
    "Clause 5",
    "Clause 8",
    "Clause 9",
    "Clause 10",
    "Clause 11",
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
    "Clause 6",
    "Clause 7",
    "Clause 8",
    "Clause 10",
    "Clause 11",
    "Clause 12",
  ],
  "Smart Watch": [
    "Clause 5",
    "Clause 6",
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

// 章节标题映射
const titleMap = {
  "Clause 5": "Generic Requirements丨一般要求 丨38 items",
  "Clause 6":
    "ICT supporting continuous bidirectional communication丨支持连续的信息和通信技术功能的信息和技术 丨37 items",
  "Clause 7": "ICT with video capabilities丨具有视频功能的ICT丨8 items",
  "Clause 8": "Hardware丨硬件丨19 items",
  "Clause 9": "Web丨网页 丨57 items",
  "Clause 10": "Non-web documents 丨非网页文档丨57 items",
  "Clause 11": "Software 丨软件 丨69 items",
  "Clause 12":
    "Information about products and services丨有关产品和服务的信息 丨3 items",
};

// 操作系统价格映射
const osPriceMap = { IOS: 10000, Android: 10000, Others: 10000 };

// 价格映射
const priceMap = {
  "All in One(AIO)": 72000,
  ATM: 62000,
  Camera: 92000,
  Pad: 72000,
  POS: 62000,
  "Projector(with OS)": 92000,
  Telephone: 82000,
  "Router/CPE/AP/Gateway": 72000,
  "Set-top Box": 92000,
  "Smart Home Devices": 92000,
  "Smart Phone": 72000,
  "Smart Watch": 72000,
  Television: 92000,
  Website: 0,
};

// 周期映射
const TimeMap = {
  "All in One(AIO)": [10, 10, 3],
  ATM: [10, 7, 3],
  Camera: [10, 10, 3],
  Pad: [19, 11, 3],
  POS: [10, 7, 3],
  "Projector(with OS)": [10, 10, 3],
  Telephone: [10, 7, 3],
  "Router/CPE/AP/Gateway": [15, 5, 3],
  "Set-top Box": [15, 5, 3],
  "Smart Home Devices": [10, 10, 3],
  "Smart Phone": [20, 10, 3],
  "Smart Watch": [10, 10, 3],
  Television: [15, 5, 3],
  Website: [10, 10, 3],
};
const Time = computed(() => TimeMap[value.value] || []);

// 计算最终费用
const cost = computed(() => {
  let totalCost = 0;
  if (showOsSelection.value) {
    if (checked1.value) totalCost += osPriceMap["IOS"];
    if (checked2.value) totalCost += osPriceMap["Android"];
    if (checked3.value) totalCost += osPriceMap["Others"];
  }
  if (value.value) totalCost += priceMap[value.value];
  if (linkNum.value) totalCost += linkNum.value * 500;
  if (appNum.value) totalCost += appNum.value * 3000;
  return totalCost;
});

// 获取选中的操作系统文本
const getSelectedOS = () => {
  if (!showOsSelection.value) return "无";
  const osList = [];
  if (checked1.value) osList.push("IOS");
  if (checked2.value) osList.push("Android");
  if (checked3.value) osList.push("Others");
  return osList.length ? osList.join(", ") : "无";
};

// 导出Excel功能
const handleExport = () => {
  const exportData = [
    { 项目: "产品类别", 信息: value.value },
    { 项目: "是否支持移动端", 信息: showOsSelection.value ? "是" : "否" },
    { 项目: "支持的操作系统", 信息: getSelectedOS() },
    { 项目: "总费用(CNY)", 信息: `¥${cost.value.toLocaleString()}` },
    { 项目: "", 信息: "" },
    { 项目: "测试周期", 信息: "时间" },
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
    { 项目: "测试条款", 信息: "测试条目数" },
    ...Clause.value.map((clause) => ({
      项目: clause,
      信息: titleMap[clause].split("丨").pop(),
    })),
    { 项目: "", 信息: "" },
    { 项目: "测试样品", 信息: "数量" },
    { 项目: "正常样机（附件出厂配件）", 信息: `2` },
    { 项目: "RTT 样机", 信息: checked4.value ? "3" : "0" },
    { 项目: "", 信息: "" },
    { 项目: "启动测试需要提供资料", 信息: "备注" },
    {
      项目: "EU 2019 882 测试产品技术资料清单",
      信息: "https://sgs.sharepoint.com/sites/ext-cn-crs-cpeec-emclab/SGSEAA/EMC%20EAA/Forms/AllItems.aspx?id=%2Fsites%2Fext%2Dcn%2Dcrs%2Dcpeec%2Demclab%2FSGSEAA%2FEMC%20EAA%2FEAA%20Shared%20Document%20%28Internal%20only%29%2FFor%20Client&newTargetListUrl=%2Fsites%2Fext%2Dcn%2Dcrs%2Dcpeec%2Demclab%2FSGSEAA%2FEMC%20EAA&viewpath=%2Fsites%2Fext%2Dcn%2Dcrs%2Dcpeec%2Demclab%2FSGSEAA%2FEMC%20EAA%2FForms%2FAllItems%2Easpx&startedResponseCatch=true",
    },
    { 项目: "User Manual", 信息: "" },
    {
      项目: "Declaration of Model Differences(如有多型号)",
      信息: "https://sgs.sharepoint.com/sites/ext-cn-crs-cpeec-emclab/SGSEAA/EMC%20EAA/Forms/AllItems.aspx?id=%2Fsites%2Fext%2Dcn%2Dcrs%2Dcpeec%2Demclab%2FSGSEAA%2FEMC%20EAA%2FEAA%20Shared%20Document%20%28Internal%20only%29%2FFor%20Client&newTargetListUrl=%2Fsites%2Fext%2Dcn%2Dcrs%2Dcpeec%2Demclab%2FSGSEAA%2FEMC%20EAA&viewpath=%2Fsites%2Fext%2Dcn%2Dcrs%2Dcpeec%2Demclab%2FSGSEAA%2FEMC%20EAA%2FForms%2FAllItems%2Easpx&startedResponseCatch=true",
    },
  ];
  exportJsonToExcel(
    exportData,
    `EAA_${value.value}_${new Date().toLocaleDateString().replace(/\//g, "-")}`,
    { 项目: "项目", 信息: "信息" },
    { columnWidths: [{ wch: 40 }, { wch: 30 }] }
  );
};
</script>

<style scoped>
/* 紧凑布局核心调整：减少各类间距 */
.product-selection-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 10px; /* 减少外层容器内边距 */
}

.product-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 15px; /* 减少卡片内边距 */
  transition: all 0.3s ease;
}

/* 区块容器间距调整 */
.clause-section-wrapper,
.cycle-section-wrapper,
.test-samples-section-wrapper,
.cost-section-wrapper {
  margin: 10px 0; /* 减少区块间垂直间距 */
}

/* 标题栏与内容间距 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px; /* 缩小标题与内容间距 */
}

/* 表单区域间距 */
.form-group {
  margin-bottom: 15px; /* 减少表单底部间距 */
}

/* 内容区内边距调整 */
.clause-section,
.cycle-section,
.test-samples-section,
.cost-section {
  padding: 12px; /* 减少内容区内部填充 */
  border-radius: 8px;
}

/* 移动端支持选项 */
.mobile-support-option {
  padding: 10px; /* 减少内边距 */
  margin: 8px 0; /* 减少外边距 */
  border-radius: 8px;
  background-color: #fcfcfc;
  border: 1px solid #f0f0f0;
}

.os-hint.red-highlight {
  color: #f53f3f;
  font-size: 13px; /* 略小字体 */
  line-height: 1.4;
  margin: 8px 0; /* 减少上下间距 */
  padding: 6px 10px; /* 减少内边距 */
  border-left: 3px solid #f53f3f;
  background-color: #fff1f0;
  border-radius: 0 4px 4px 0;
  font-weight: 500;
}

/* 复选框组间距 */
.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 15px; /* 减少复选框间间距 */
  padding: 3px 0;
  align-items: center;
}

.custom-checkbox {
  flex: 0 0 auto;
  min-width: 100px; /* 缩小复选框最小宽度 */
  padding: 3px 0;
  display: flex;
  align-items: center;
}

/* 条款项样式 */
.clause-item {
  background-color: #f7f7f7;
  padding: 6px 10px; /* 减少内边距 */
  border-radius: 6px;
  font-size: 13px; /* 略小字体 */
  color: #444;
  transition: all 0.2s ease;
  width: 100px; /* 缩小条款项宽度 */
}

/* 红色提示文本 */
.red-alert-text {
  color: #f53f3f;
  font-size: 12px;
  line-height: 1.4;
  margin-top: 8px; /* 减少顶部间距 */
  padding-left: 4px;
  font-weight: 500;
  border-left: 2px solid #ffccc7;
}

/* 周期项样式 */
.cycle-content {
  display: flex;
  flex-direction: column;
  gap: 8px; /* 减少周期项间距 */
}

.cycle-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 8px; /* 减少内边距 */
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.cycle-label {
  font-size: 13px; /* 略小字体 */
  color: #333;
  font-weight: 500;
}

.cycle-value {
  font-size: 14px; /* 略小字体 */
  color: #007bff;
  font-weight: 600;
  padding-left: 10px;
}

/* 测试样本区域 */
.test-samples-group {
  display: flex;
  align-items: center;
  gap: 15px; /* 减少元素间距 */
  padding: 5px 0;
}

.sample-quantity {
  display: flex;
  align-items: center;
  font-size: 13px; /* 略小字体 */
  color: #333;
  padding-left: 10px;
  border-left: 1px solid #e5e5e5;
  flex: 1;
}

/* 费用显示 */
.cost-display {
  font-size: 24px; /* 略小字体 */
  font-weight: 600;
  color: #007bff;
  padding: 10px; /* 减少内边距 */
  background-color: #f0f8ff;
  border-radius: 8px;
  text-align: center;
}

/* 标题字体大小调整 */
.card-title {
  font-size: 20px; /* 缩小标题字体 */
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 8px; /* 减少标题底部填充 */
  margin: 0 0 10px 0; /* 减少标题底部间距 */
}

.section-title {
  font-size: 16px; /* 缩小区块标题 */
  font-weight: 500;
  color: #555;
  margin: 0;
}

/* 按钮样式微调 */
.toggle-btn {
  background-color: #f0f2f5;
  border: none;
  border-radius: 4px;
  padding: 3px 6px; /* 减少按钮内边距 */
  font-size: 12px;
  cursor: pointer;
  color: #666;
  transition: all 0.2s ease;
}

/* 响应式优化 */
@media (max-width: 576px) {
  .product-card {
    padding: 10px; /* 移动端进一步减少内边距 */
  }

  .clause-section,
  .cycle-section,
  .test-samples-section,
  .cost-section {
    padding: 8px; /* 移动端内容区更少内边距 */
  }

  .checkbox-group {
    gap: 6px 10px; /* 移动端复选框间距更小 */
  }

  .cycle-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 3px;
  }
}
</style>