/**
 * 导出JSON数据到Excel文件
 * @param {Array} jsonData - 要导出的JSON数据
 * @param {String} fileName - 导出的文件名
 * @param {Object} [headerMap={}] - 表头映射关系，如 {id: '编号', name: '姓名'}
 * @param {Object} [styleOptions={}] - 样式配置
 * @param {Object} [styleOptions.headerStyle] - 表头样式
 * @param {Object} [styleOptions.moduleHeaderStyle] - 模块标题样式
 * @param {Object} [styleOptions.cellStyles] - 单元格样式规则
 * @param {Array}  [styleOptions.columnWidths] - 列宽设置
 * @param {Array}  [styleOptions.merges] - 合并单元格设置
 * @param {String} [sheetName='sheet1'] - 工作表名称
 */
import XLSX from 'xlsx-js-style';
/**
 * 导出JSON数据到Excel文件
 * @param {Array} jsonData - 要导出的JSON数据
 * @param {String} fileName - 导出的文件名
 * @param {Object} [headerMap={}] - 表头映射关系
 * @param {Object} [styleOptions={}] - 样式配置
 * @param {Object} [styleOptions.headerStyle] - 表头样式
 * @param {Object} [styleOptions.moduleHeaderStyle] - 模块标题样式
 * @param {Object} [styleOptions.cellStyles] - 单元格样式规则
 * @param {Array}  [styleOptions.columnWidths] - 列宽设置
 * @param {Array}  [styleOptions.merges] - 合并单元格设置
 * @param {Number} [styleOptions.headerRowIndex=0] - 表头所在行索引（默认0，无titleRow）
 * @param {String} [sheetName='sheet1'] - 工作表名称
 */
export const exportJsonToExcel = (jsonData, fileName, headerMap = {}, styleOptions = {}, sheetName = 'sheet1') => {
  if (!Array.isArray(jsonData) || jsonData.length === 0) {
    throw new Error('导出数据不能为空，且必须为数组格式');
  }

  try {
    // 处理数据和表头映射
    const data = jsonData.map(item => {
      const newItem = {};
      Object.keys(item).forEach(key => {
        newItem[headerMap[key] || key] = item[key];
      });
      return newItem;
    });

    // 创建工作表和工作簿
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    
    // 应用样式（移除titleStyle相关配置）
    applyStyles(worksheet, {
      // 表头样式（默认配置）
      headerStyle: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { 
          patternType: "solid", 
          fgColor: { rgb: "7D2222" },
          bgColor: { indexed: 64 }
        },
        alignment: { horizontal: "center" }
      },
      // 模块标题样式（默认配置）
      moduleHeaderStyle: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { 
          patternType: "solid", 
          fgColor: { rgb: "7D2222" },
          bgColor: { indexed: 64 }
        },
        alignment: { horizontal: "left" }
      },
      // 列宽默认配置
      columnWidths: Array(XLSX.utils.decode_range(worksheet['!ref']).e.c + 1).fill({ wch: 15 }),
      // 表头行索引默认0（无titleRow）
      headerRowIndex: 0,
      // 合并用户传入的配置
      ...styleOptions
    });

    // 将工作表添加到工作簿
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // 写入文件
    XLSX.writeFile(workbook, `${fileName}.xlsx`, { bookType: 'xlsx', type: 'file' });
    
    console.log('Excel导出成功，文件名:', `${fileName}.xlsx`);
  } catch (error) {
    console.error('导出Excel失败:', error);
    throw new Error(`导出Excel失败: ${error.message}`);
  }
};

/**
 * 应用样式到工作表
 * @param {Object} worksheet - 工作表对象
 * @param {Object} options - 样式选项
 */
function applyStyles(worksheet, options) {
  const range = XLSX.utils.decode_range(worksheet['!ref']);
  console.log('应用样式到工作表，数据范围:', range);
  
  // 处理表头样式（无titleRow，表头行默认为0）
  if (options.headerStyle) {
    console.log('应用表头样式:', options.headerStyle);
    const headerRow = options.headerRowIndex || 0; // 表头行索引默认0
    for (let c = range.s.c; c <= range.e.c; c++) {
      const cellAddress = XLSX.utils.encode_cell({ r: headerRow, c });
      if (worksheet[cellAddress]) {
        worksheet[cellAddress].s = {
          font: options.headerStyle.font || {},
          fill: {
            patternType: options.headerStyle.fill?.patternType || "solid",
            fgColor: options.headerStyle.fill?.fgColor || { rgb: "7D2222" },
            bgColor: options.headerStyle.fill?.bgColor || { indexed: 64 }
          },
          alignment: options.headerStyle.alignment || {}
        };
        console.log(`设置表头单元格 ${cellAddress} 样式`);
      }
    }
  }
  
  // 处理模块标题样式（基于关键词识别）
  if (options.moduleHeaderStyle) {
    console.log('应用模块标题样式:', options.moduleHeaderStyle);
    const moduleHeaderKeywords = ["产品/服务类别", "测试周期详情", "测试条款", "测试样品需求", "启动测试所需资料"];
    
    // 从表头行后开始检查
    for (let r = (options.headerRowIndex || 0) + 1; r <= range.e.r; r++) {
      const firstCellAddress = XLSX.utils.encode_cell({ r, c: range.s.c });
      const firstCell = worksheet[firstCellAddress];
      
      // 排除空行
      if (!firstCell || !firstCell.v || firstCell.v.trim() === "") {
        continue;
      }
      
      // 匹配模块标题关键词
      const isModuleHeader = firstCell.v && typeof firstCell.v === 'string' && 
        moduleHeaderKeywords.some(keyword => firstCell.v.includes(keyword));
      
      if (isModuleHeader) {
        // 为模块标题行应用样式
        for (let c = range.s.c; c <= range.e.c; c++) {
          const cellAddress = XLSX.utils.encode_cell({ r, c });
          if (worksheet[cellAddress]) {
            worksheet[cellAddress].s = {
              ...(worksheet[cellAddress].s || {}),
              font: options.moduleHeaderStyle.font || {},
              fill: {
                patternType: options.moduleHeaderStyle.fill?.patternType || "solid",
                fgColor: options.moduleHeaderStyle.fill?.fgColor || { rgb: "7D2222" },
                bgColor: options.moduleHeaderStyle.fill?.bgColor || { indexed: 64 }
              },
              alignment: options.moduleHeaderStyle.alignment || {}
            };
            console.log(`设置模块标题行 ${r+1} 单元格 ${cellAddress} 样式`);
          }
        }
      }
    }
  }
  
  // 设置列宽
  if (options.columnWidths) {
    console.log('应用列宽设置:', options.columnWidths);
    worksheet['!cols'] = options.columnWidths;
  }
  
  // 应用单元格样式规则
  if (options.cellStyles && Array.isArray(options.cellStyles)) {
    console.log('应用单元格样式规则，共', options.cellStyles.length, '条规则');
    options.cellStyles.forEach((rule, index) => {
      if (!rule.condition || !rule.style) {
        console.log(`忽略第 ${index+1} 条样式规则：缺少条件或样式`);
        return;
      }
      
      for (let r = range.s.r; r <= range.e.r; r++) {
        // 跳过空行
        const firstCell = worksheet[XLSX.utils.encode_cell({ r, c: range.s.c })];
        if (!firstCell || !firstCell.v || firstCell.v.trim() === "") {
          continue;
        }
        
        for (let c = range.s.c; c <= range.e.c; c++) {
          const cellAddress = XLSX.utils.encode_cell({ r, c });
          const cell = worksheet[cellAddress];
          
          if (cell && rule.condition(cell.v, r, c)) {
            cell.s = { ...(cell.s || {}), ...rule.style };
          }
        }
      }
    });
  }
  
  // 应用合并单元格
  if (options.merges && Array.isArray(options.merges)) {
    console.log('应用合并单元格设置，共', options.merges.length, '个合并区域');
    worksheet['!merges'] = options.merges;
  }
};