import * as XLSX from 'xlsx-js-style';

/**
 * 导出JSON数据到Excel文件
 * @param {Array} jsonData - 要导出的JSON数据
 * @param {String} fileName - 导出的文件名
 * @param {Object} [headerMap={}] - 表头映射关系，如 {id: '编号', name: '姓名'}
 * @param {Object} [styleOptions={}] - 样式配置
 * @param {Object} [styleOptions.headerStyle] - 表头样式
 * @param {Object} [styleOptions.cellStyles] - 单元格样式规则
 * @param {Array}  [styleOptions.columnWidths] - 列宽设置
 * @param {Array}  [styleOptions.merges] - 合并单元格设置
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
    
    // 应用样式
    applyStyles(worksheet, {
      headerStyle: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { 
          patternType: "solid", 
          fgColor: { rgb: "7D2222" },
          bgColor: { indexed: 64 } // 必须设置bgColor，否则某些Excel版本不显示填充
        },
        alignment: { horizontal: "center" }
      },
      columnWidths: Array(XLSX.utils.decode_range(worksheet['!ref']).e.c + 1).fill({ wch: 15 }),
      ...styleOptions
    });

    // 将工作表添加到工作簿
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // 写入文件（明确指定bookType和type）
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
  
  // 设置表头样式
  if (options.headerStyle) {
    console.log('应用表头样式:', options.headerStyle);
    for (let c = range.s.c; c <= range.e.c; c++) {
      const cellAddress = XLSX.utils.encode_cell({ r: range.s.r, c });
      if (worksheet[cellAddress]) {
        // 确保样式对象结构正确
        worksheet[cellAddress].s = {
          font: options.headerStyle.font || {},
          fill: {
            patternType: options.headerStyle.fill?.patternType || "none",
            fgColor: options.headerStyle.fill?.fgColor || { rgb: "FFFFFF" },
            bgColor: options.headerStyle.fill?.bgColor || { indexed: 64 }
          },
          alignment: options.headerStyle.alignment || {}
        };
        console.log(`设置表头单元格 ${cellAddress} 样式`);
      }
    }
  }
  
  // 设置列宽
  if (options.columnWidths) {
    console.log('应用列宽设置:', options.columnWidths);
    worksheet['!cols'] = options.columnWidths;
  }
  
  // 设置单元格样式规则
  if (options.cellStyles && Array.isArray(options.cellStyles)) {
    console.log('应用单元格样式规则，共', options.cellStyles.length, '条规则');
    options.cellStyles.forEach((rule, index) => {
      if (!rule.condition || !rule.style) {
        console.log(`忽略第 ${index+1} 条样式规则：缺少条件或样式`);
        return;
      }
      
      for (let r = range.s.r; r <= range.e.r; r++) {
        for (let c = range.s.c; c <= range.e.c; c++) {
          const cellAddress = XLSX.utils.encode_cell({ r, c });
          const cell = worksheet[cellAddress];
          
          // 跳过表头行
          if (r === range.s.r) continue;
          
          if (cell && rule.condition(cell.v, r, c)) {
            cell.s = { ...cell.s, ...rule.style };
          }
        }
      }
    });
  }
  
  // 设置合并单元格
  if (options.merges && Array.isArray(options.merges)) {
    console.log('应用合并单元格设置，共', options.merges.length, '个合并区域');
    worksheet['!merges'] = options.merges;
  }
}    