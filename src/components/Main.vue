<script setup>
import { ref, computed, watch } from "vue";
import Logout from "./Logout.vue";
import ExportButton from "./ExportButton.vue";
import { exportJsonToExcel } from "../utils/excel-export";
import Head from "./Head.vue";
import { useAuthStore } from "../stores/authStore";

const authStore = useAuthStore();

// 控制各区块显示/隐藏的状态（默认显示）
const showClause = ref(true);
const showLeadTime = ref(true);
const showTestSample = ref(true);
const showQuotation = ref(true);

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

// 章节固定全选
const clausechecked = true;

// 下拉选择框
const value = ref(null);
const options = [
  {
    label: "====================EAA Product产品====================",
    options: [
      { value: "All in One(AIO)", label: "All in One(AIO)" },
      { value: "ATM/POS", label: "ATM/POS" },
      { value: "Camera", label: "Camera" },
      { value: "Projector", label: "Projector" },
      { value: "Router/CPE/AP/Gateway", label: "Router/CPE/AP/Gateway" },
      { value: "Set-top Box", label: "Set-top Box" },
      { value: "Smart Home Devices", label: "Smart Home Devices" },
      { value: "Smart Phone", label: "Smart Phone" },
      { value: "Smart Watch", label: "Smart Watch" },
      { value: "Tablet/Pad", label: "Tablet/Pad" },
      { value: "Television", label: "Television" },
      { value: "Telephone", label: "Telephone" },
      { value: "Treadmill", label: "Treadmill" },
    ],
  },
  {
    label: "====================EAA Services服务====================",
    options: [
      { value: "Website(s)", label: "Website(s)" },
      { value: "Mobile App(s)", label: "Mobile App(s)" },
    ],
  },
];

// 移动端操作系统选择器
const checkedIOS = ref(false);
const checkedAndroid = ref(false);
const checkedOthers = ref(false);
const checkedWindows = ref(false);
const checkedMac = ref(false);
const showOsSelection = ref(false);

const checkedRTT = ref(false);
const checkedHAC = ref(false);

const quantity = computed(() => {
  let quantity = 2;
  if (value.value == "Treadmill") {
    quantity -= 1;
  }
  if (checkedRTT.value) quantity += 3;
  if (checkedHAC.value) quantity += 1;
  return quantity;
});

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
  "ATM/POS": ["Clause 5", "Clause 8", "Clause 10", "Clause 11", "Clause 12"],
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
  Projector: [
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
  Treadmill: [
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
  "ATM/POS": 62000,
  Camera: 72000,
  "Tablet/Pad": 72000,
  Projector: 72000,
  Telephone: 82000,
  "Router/CPE/AP/Gateway": 52000,
  "Set-top Box": 72000,
  "Smart Home Devices": 72000,
  Treadmill: 72000,
  "Smart Phone": 72000,
  "Smart Watch": 72000,
  Television: 92000,
  "Website(s)": 0,
};

// 周期映射
const TimeMap = {
  "All in One(AIO)": [10, 10, 3],
  "ATM/POS": [10, 7, 3],
  Camera: [10, 10, 3],
  Projector: [10, 10, 3],
  "Router/CPE/AP/Gateway": [15, 5, 3],
  "Set-top Box": [15, 5, 3],
  "Smart Home Devices": [10, 10, 3],
  "Smart Phone": [20, 10, 3],
  "Smart Watch": [10, 10, 3],
  "Tablet/Pad": [20, 10, 3],
  Television: [15, 5, 3],
  Telephone: [10, 7, 3],
  Treadmill: [10, 10, 3],
  "Website(s)": [10, 10, 3],
};
const Time = computed(() => TimeMap[value.value] || []);

// 计算最终费用
const cost = computed(() => {
  let totalCost = 0;
  if (showOsSelection.value || value.value == "Website(s)") {
    if (checkedWindows.value) totalCost += osPriceMap["IOS"];
    if (checkedMac.value) totalCost += osPriceMap["Android"];
    if (checkedIOS.value) totalCost += osPriceMap["IOS"];
    if (checkedAndroid.value) totalCost += osPriceMap["Android"];
    if (checkedOthers.value) totalCost += osPriceMap["Others"];
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
  if (checkedIOS.value) osList.push("IOS");
  if (checkedAndroid.value) osList.push("Android");
  if (checkedOthers.value) osList.push("Others");
  return osList.length ? osList.join(", ") : "无";
};

const handleExport = () => {
  // 大标题行（仅一行）
  const titleRow = [{ 项目: "", 信息: "" }];

  // 基础信息模块
  const baseInfo = [
    { 项目: "产品/服务类别", 信息: value.value || "未选择" },
    { 项目: "是否支持移动端", 信息: showOsSelection.value ? "是" : "否" },
    { 项目: "支持的操作系统", 信息: getSelectedOS() },
    { 项目: "应用程序数量", 信息: appNum.value || 0 },
    { 项目: "链接数量", 信息: linkNum.value || 0 },
    { 项目: "总费用(CNY)", 信息: `¥${cost.value.toLocaleString()}` },
    { 项目: "", 信息: "" }, // 空行分隔
  ];

  // 测试周期模块
  const testCycle = [
    { 项目: "测试周期详情", 信息: "" },
    {
      项目: "Wave #1: 高风险项反馈",
      信息: Time.value[0] ? `${Time.value[0]} 工作日` : "未定义",
    },
    {
      项目: "Wave #1: 完整测试项反馈",
      信息: Time.value[1] ? `${Time.value[1]} 工作日` : "未定义",
    },
    {
      项目: "Wave #2: 测试报告+客户反馈",
      信息: Time.value[2] ? `${Time.value[2]} 工作日` : "未定义",
    },
    { 项目: "", 信息: "" }, // 空行分隔
  ];

  // 测试条款模块
  const testClauses = [
    { 项目: "测试条款", 信息: "测试条目数" },
    ...(Clause.value.length
      ? Clause.value.map((clause) => {
          const [, , items] = titleMap[clause]?.split("丨") || ["", "", "未知"];
          return { 项目: clause, 信息: items };
        })
      : [{ 项目: "无", 信息: "未选择产品类别" }]),
    { 项目: "", 信息: "" }, // 空行分隔
  ];

  // 测试样品模块
  const testSamples = [
    { 项目: "测试样品需求", 信息: "数量" },
    { 项目: "正常样机（含出厂配件）", 信息: "2 台" },
    { 项目: "RTT 功能样机", 信息: checkedRTT.value ? "3 台" : "0 台" },
    { 项目: "HAC 功能样机", 信息: checkedHAC.value ? "1 台" : "0 台" },
    { 项目: "总计样品数", 信息: `${quantity.value} 台` },
    { 项目: "", 信息: "" }, // 空行分隔
  ];

  // 所需资料模块
  const requiredDocs = [
    { 项目: "启动测试所需资料", 信息: "备注" },
    {
      项目: "EU 2019/882 测试产品技术资料清单",
      信息: "https://sgs.sharepoint.com/sites/ext-cn-crs-cpeec-emclab/SGSEAA/EMC%20EAA/Forms/AllItems.aspx?id=%2Fsites%2Fext%2Dcn%2Dcrs%2Dcpeec%2Demclab%2FSGSEAA%2FEMC%20EAA%2FEAA%20Shared%20Document%20%28Internal%20only%29%2FFor%20Client&newTargetListUrl=%2Fsites%2Fext%2Dcn%2Dcrs%2Dcpeec%2Demclab%2FSGSEAA%2FEMC%20EAA&viewpath=%2Fsites%2Fext%2Dcn%2Dcrs%2Dcpeec%2Demclab%2FSGSEAA%2FEMC%20EAA%2FForms%2FAllItems%2Easpx&startedResponseCatch=true",
    },
    { 项目: "用户手册（User Manual）", 信息: "需提供完整版本" },
    {
      项目: "型号差异声明（如有多型号）",
      信息: "https://sgs.sharepoint.com/sites/ext-cn-crs-cpeec-emclab/SGSEAA/EMC%20EAA/Forms/AllItems.aspx?id=%2Fsites%2Fext%2Dcn%2Dcrs%2Dcpeec%2Demclab%2FSGSEAA%2FEMC%20EAA%2FEAA%20Shared%20Document%20%28Internal%20only%29%2FFor%20Client&newTargetListUrl=%2Fsites%2Fext%2Dcn%2Dcrs%2Dcpeec%2Demclab%2FSGSEAA%2FEMC%20EAA&viewpath=%2Fsites%2Fext%2Dcn%2Dcrs%2Dcpeec%2Demclab%2FSGSEAA%2FEMC%20EAA%2FForms%2FAllItems%2Easpx&startedResponseCatch=true",
    },
    { 项目: "其他补充资料", 信息: "根据测试类别可能需要额外文件" },
  ];

  // 合并所有模块数据，仅包含一次大标题行
  const exportData = [
    ...titleRow, // 仅一次大标题行
    ...baseInfo,
    ...testCycle,
    ...testClauses,
    ...testSamples,
    ...requiredDocs,
  ];

  // 生成文件名
  const fileName = `EAA_${value.value || "Unselected"}_${
    new Date().toISOString().split("T")[0]
  }`;

  // 导出配置
  const exportConfig = {
    columnWidths: [
      { wch: 60 }, // 项目列宽度
      { wch: 60 }, // 信息列宽度
    ],
    cellStyles: [
      // 大标题行样式（仅首行）
      {
        condition: (value, row, col) => row === 0,
        style: {
          font: { bold: true, color: { rgb: "FFFFFF" }, sz: 14 },
          fill: {
            patternType: "solid",
            fgColor: { rgb: "064650" },
            bgColor: { indexed: 64 },
          },
          alignment: { horizontal: "center", vertical: "center" },
          border: {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          },
        },
      },
      // 表头样式（第二行）
      {
        condition: (value, row, col) => row === 1,
        style: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: {
            patternType: "solid",
            fgColor: { rgb: "7D2222" },
            bgColor: { indexed: 64 },
          },
          alignment: { horizontal: "center" },
        },
      },
      // 模块标题行样式
      {
        condition: (value, row, col) =>
          [
            2,
            2 + baseInfo.length,
            2 + baseInfo.length + testCycle.length,
            2 + baseInfo.length + testCycle.length + testClauses.length,
          ].includes(row) && col === 0,
        style: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: {
            patternType: "solid",
            fgColor: { rgb: "7D2222" },
            bgColor: { indexed: 64 },
          },
          alignment: { horizontal: "left" },
        },
      },
      // 测试条款子标题样式
      {
        condition: (value, row, col) =>
          row === 2 + baseInfo.length + testCycle.length && col === 1,
        style: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: {
            patternType: "solid",
            fgColor: { rgb: "7D2222" },
            bgColor: { indexed: 64 },
          },
          alignment: { horizontal: "center" },
        },
      },
      // 链接样式
      {
        condition: (value, row, col) =>
          typeof value === "string" && value.startsWith("http"),
        style: { font: { underline: true, color: { rgb: "0000FF" } } },
      },
      // 合计行样式
      {
        condition: (value, row, col) =>
          row ===
            2 + baseInfo.length + testCycle.length + testClauses.length + 4 &&
          col === 0,
        style: { font: { bold: true } },
      },
    ],
    // 合并大标题行两列（确保只显示一次）
    merges: [{ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }],
  };

  // 执行导出（表头映射修正为正确的"项目"和"信息"，避免重复标题）
  exportJsonToExcel(
    exportData,
    fileName,
    { 项目: "SGS EAA 项目报价及认证注意事宜", 信息: "信息" }, // 表头正确映射，不重复大标题
    exportConfig
  );
};
</script>
<template>
  <Head />
  <div class="product-selection-container">
    <div class="product-card">
      <!-- 产品选择标题 -->
      <h3 class="card-title">
        Please select your Product/Services
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
          v-if="value === 'Website(s)'"
          v-model="linkNum"
          style="width: 300px"
          placeholder="输入Link数量"
        />
      </div>
      <!-- 移动端支持 -->
      <div
        v-if="
          value == 'Smart Phone' ||
          value == 'Smart Watch' ||
          value == 'Tablet/Pad'
        "
      >
        <h4 class="section-title">请输入主体Apps数量</h4>
        <el-input
          v-model="appNum"
          style="width: 400px"
          placeholder="输入Apps数量"
        />
      </div>
      <div v-else-if="value != 'Website(s)'">
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
            <span v-if="value != 'Mobile App(s)'">如支持移动端Apps，</span
            >请勾选Apps安装在移动端的操作系统：
          </h4>
          <div class="checkbox-group">
            <el-checkbox
              v-model="checkedIOS"
              label="IOS"
              size="large"
              class="custom-checkbox"
            />
            <el-checkbox
              v-model="checkedAndroid"
              label="Android"
              size="large"
              class="custom-checkbox"
            />
            <el-checkbox
              v-model="checkedOthers"
              label="Others"
              size="large"
              class="custom-checkbox"
            />
            <el-input
              v-if="checkedOthers"
              v-model="inputOS"
              style="width: 120px"
              placeholder="输入系统名称"
            />
          </div>
          <el-input
            v-if="showOsSelection"
            v-model="appNum"
            style="width: 400px"
            placeholder="输入Apps数量"
          />
        </div>
      </div>
      <div v-else>
        <div class="mobile-support-option" v-if="value">
          <h4 class="section-title">请勾选Website(s)适配的操作系统：</h4>
          <div class="checkbox-group">
            <el-checkbox
              v-model="checkedWindows"
              label="Windows"
              size="large"
              class="custom-checkbox"
            />
            <el-checkbox
              v-model="checkedMac"
              label="Mac OS"
              size="large"
              class="custom-checkbox"
            />
            <el-checkbox
              v-model="checkedIOS"
              label="IOS"
              size="large"
              class="custom-checkbox"
            />
            <el-checkbox
              v-model="checkedAndroid"
              label="Android"
              size="large"
              class="custom-checkbox"
            />
            <el-checkbox
              v-model="checkedOthers"
              label="Others"
              size="large"
              class="custom-checkbox"
            />
            <el-input
              v-if="checkedOthers"
              v-model="inputOS"
              style="width: 120px"
              placeholder="输入系统名称"
            />
          </div>
        </div>
      </div>
      <!-- 适用条款区 -->
      <div v-if="Clause.length" class="clause-section-wrapper">
        <div class="section-header">
          <h4 class="section-title">1.Test Clause</h4>
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
          <h4 class="section-title">2.Lead Time(Working Days)</h4>
          <button class="toggle-btn" @click="showLeadTime = !showLeadTime">
            {{ showLeadTime ? "隐藏" : "显示" }}
          </button>
        </div>
        <div v-if="showLeadTime" class="animate-fade-in cycle-section">
          <div class="cycle-content">
            <div class="cycle-item">
              <span class="cycle-label">Wave #1: Release Hight Risk Items</span>
              <span class="cycle-value">{{ Time[0] }} </span>
              <span class="cycle-label">WD</span>
            </div>
            <div class="cycle-item">
              <span class="cycle-label">Wave #1: Release Full Test Items</span>
              <span class="cycle-value">{{ Time[1] }} </span>
              <span class="cycle-label">WD</span>
            </div>
            <div class="cycle-item">
              <span class="cycle-label"
                >Wave #2: Release Test Report + VoC</span
              >
              <span class="cycle-value">{{ Time[2] }} </span>
              <span class="cycle-label">WD</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 测试样本区域 -->
      <div v-if="value" class="test-samples-section-wrapper">
        <div class="section-header">
          <h4 class="section-title">3.Test Sample(Unit)</h4>
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
            <div v-if="value == 'Smart Phone' || value == 'Smart Watch'">
              <el-checkbox
                v-model="checkedRTT"
                label="是否支持RTT"
                size="large"
                class="sample-checkbox"
              />
            </div>
            <div v-if="value == 'Smart Phone' || value == 'Telephone'">
              <el-checkbox
                v-model="checkedHAC"
                label="是否支持HAC"
                size="large"
                class="sample-checkbox"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 费用展示区 -->
      <div class="cost-section-wrapper" v-if="authStore.auth == 'inner'">
        <div class="section-header">
          <h4 class="section-title">4.Quotation(CNY,Not includingVAT)</h4>
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
<style scoped>
/* 基础样式重置与核心变量 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 容器布局 */
.product-selection-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 15px;
  width: 100%;
}

.product-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 20px;
  width: 100%;
}

/* 标题样式 */
.card-title {
  font-size: clamp(14px, 3vw, 18px);
  font-weight: 600;
  color: #ed6d2d;
  padding-bottom: 12px;
  margin-bottom: 20px;
  border-bottom: 2px solid rgba(237, 109, 45, 0.2);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

/* 表单区域 */
.form-group {
  margin-bottom: 20px;
}

.custom-select {
  width: 100%;
}

/* 链接数量输入区 */
.link-number {
  margin-bottom: 20px;
}

/* 移动端支持选项区 */
.mobile-support-option {
  padding: 0 15px;
  margin: 0;
  border-radius: 8px;
  background: #fff;
  border: 1px solid rgba(237, 109, 45, 0.2);
}

.os-hint.red-highlight {
  color: #ed6d2d;
  font-size: 13px;
  line-height: 1.5;
  margin: 0 0 10px 0;
  padding: 8px 12px;
  border-left: 3px solid #ed6d2d;
  background: rgba(237, 109, 45, 0.05);
  border-radius: 0 4px 4px 0;
}

/* 操作系统选择区 */
.os-selection {
  padding: 5px 15px;
  margin: 10px 0;
  border-radius: 8px;
  background: #fff;
  border: 1px solid rgba(237, 109, 45, 0.1);
}

/* 复选框组样式 - 核心优化：强制靠左对齐 */
.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  padding: 5px 0;
  align-items: center;
  gap: 8px 10px;
  justify-content: flex-start; /* 强制子项靠左对齐 */
  align-content: flex-start; /* 多行时依然靠左 */
}

/* 章节复选框组特殊优化 */
.clause-checkboxes {
  gap: 8px 12px;
  justify-content: flex-start; /* 明确靠左对齐 */
}

/* 自定义复选框样式 - 确保左对齐 */
.custom-checkbox {
  flex: 1 0 auto;
  min-width: auto;
  padding: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  white-space: nowrap;
  margin: 0; /* 移除默认margin避免偏移 */
  justify-content: flex-start; /* 内容靠左 */
}

/* 章节复选框项特殊样式 */
.clause-checkbox-item {
  flex: 1 0 min-content;
  margin: 0;
  padding: 2px 0; /* 移除右侧内边距避免对齐偏移 */
  justify-content: flex-start;
}

/* 章节项内容样式 - 确保左对齐 */
.clause-item {
  background: rgba(237, 109, 45, 0.05);
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 13px;
  color: #333;
  transition: all 0.2s ease;
  width: auto;
  min-width: 80px;
  text-align: left; /* 文本靠左 */
  margin: 0;
}

.clause-item:hover {
  background: rgba(237, 109, 45, 0.1);
}

/* 区块标题样式 */
.section-title {
  font-size: 15px;
  font-weight: 600;
  color: #ed6d2d;
  margin: 0 0 10px 0; /* 增加底部间距，与下方选项区拉开距离 */
  padding: 2px 12px;
  border-radius: 4px;
  background: rgba(237, 109, 45, 0.1);
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 区块头部 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px;
  background: rgba(237, 109, 45, 0.05);
  border-bottom: 1px solid rgba(237, 109, 45, 0.1);
  flex-wrap: nowrap;
  gap: 10px;
}

/* 切换按钮样式 */
.toggle-btn {
  background: rgba(237, 109, 45, 0.1);
  border: 1px solid #ed6d2d;
  border-radius: 4px;
  padding: 4px 10px;
  font-size: 12px;
  cursor: pointer;
  color: #ed6d2d;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  min-width: 60px;
}

.toggle-btn:hover {
  background: #ed6d2d;
  color: #fff;
}

/* 条款区域容器 */
.clause-section-wrapper,
.cycle-section-wrapper,
.test-samples-section-wrapper,
.cost-section-wrapper {
  margin: 5px 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(237, 109, 45, 0.2);
}

.clause-section,
.cycle-section,
.test-samples-section,
.cost-section {
  padding: 8px 15px;
  background: #fff;
}

/* 红色提示文本 */
.red-alert-wrapper {
  margin-bottom: 15px;
}

.red-alert-text {
  color: #ed6d2d;
  font-size: 12px;
  line-height: 1.5;
  margin: 0 0 8px 0;
  padding-left: 6px;
  font-weight: 500;
  border-left: 2px solid rgba(237, 109, 45, 0.2);
}

/* 周期项样式 */
.cycle-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cycle-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-radius: 6px;
  background: rgba(237, 109, 45, 0.05);
  flex-wrap: nowrap;
  gap: 8px;
}

.cycle-label:first-child {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

.cycle-value,
.cycle-label:last-child {
  flex-shrink: 0;
  white-space: nowrap;
}

.cycle-value {
  font-size: 14px;
  color: #ed6d2d;
  font-weight: 600;
  padding: 0 4px;
  margin-right: 4px;
}

.cycle-label {
  font-size: 13px;
  color: #333;
}

/* 测试样本区域 */
.test-samples-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  padding: 5px 0;
  justify-content: flex-start; /* 同样靠左对齐 */
}

.sample-quantity {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #333;
  padding-left: 12px;
  border-left: 1px solid rgba(237, 109, 45, 0.2);
  flex: 1;
  min-width: 200px;
}

.quantity-value {
  color: #ed6d2d;
  font-weight: 600;
  margin-left: 8px;
  font-size: 14px;
}

/* 费用显示区 */
.cost-display {
  font-size: 24px;
  font-weight: 600;
  color: #ed6d2d;
  padding: 12px;
  background: rgba(237, 109, 45, 0.05);
  border-radius: 8px;
  text-align: center;
  border: 1px solid rgba(237, 109, 45, 0.1);
}

/* 导出按钮区域 */
.export-section {
  margin: 20px 0;
  text-align: center;
}

/* 响应式优化 - 保持左对齐 */
@media (max-width: 768px) {
  .product-selection-container {
    padding: 8px;
  }

  .product-card {
    padding: 15px;
  }

  .card-title {
    font-size: clamp(15px, 3vw, 17px);
    padding-bottom: 10px;
    margin-bottom: 15px;
  }

  .section-header {
    padding: 8px 10px;
    gap: 8px;
  }

  .section-title {
    font-size: 14px;
    padding: 4px 8px;
    max-width: calc(100% - 70px);
  }

  .toggle-btn {
    padding: 3px 8px;
    font-size: 12px;
    min-width: 55px;
  }

  .checkbox-group {
    gap: 6px 8px;
  }

  .cycle-item {
    padding: 8px 10px;
    gap: 6px;
  }

  .cycle-label {
    font-size: 12px;
  }

  .cycle-value {
    font-size: 13px;
    padding: 0 2px;
  }

  .test-samples-group {
    flex-direction: column;
    align-items: flex-start; /* 垂直排列时靠左 */
    gap: 10px;
  }

  .sample-quantity {
    border-left: none;
    padding-left: 0;
    margin-bottom: 5px;
    min-width: 100%;
  }

  .el-input {
    width: 100% !important;
  }

  .cost-display {
    font-size: 20px;
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .card-title {
    font-size: clamp(14px, 4vw, 16px);
    padding: 0 5px 10px;
  }

  .custom-checkbox {
    flex: 1 0 45%;
  }

  .clause-item {
    font-size: 12px;
    padding: 5px 10px;
  }

  .section-title {
    font-size: 13px;
    padding: 3px 6px;
    max-width: calc(100% - 65px);
  }

  .toggle-btn {
    font-size: 11px;
    padding: 2px 6px;
    min-width: 50px;
  }

  .cycle-item {
    padding: 6px 8px;
    gap: 4px;
  }

  .cycle-label {
    font-size: 11px;
  }

  .cycle-value {
    font-size: 12px;
  }
}

/* 超小屏幕优化 */
@media (max-width: 360px) {
  .clause-checkbox-item {
    flex: 1 0 100%;
  }
  
  .checkbox-group {
    gap: 5px;
  }
}

/* 动画效果 */
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>