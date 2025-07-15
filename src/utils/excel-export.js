// excel-export.js
import * as XLSX from 'xlsx';

export const exportJsonToExcel = (jsonData, fileName, headerMap = {}, styleOptions = {}) => {
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
  XLSX.utils.book_append_sheet(workbook, worksheet, 'sheet1');

  // 应用样式
  applyStyles(worksheet, {
    headerStyle: {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { patternType: "solid", fgColor: { rgb: "7D2222" } },
      alignment: { horizontal: "center" }
    },
    columnWidths: Array(XLSX.utils.decode_range(worksheet['!ref']).e.c + 1).fill({ wch: 15 }),
    ...styleOptions
  });

  // 写入文件（添加类型选项）
  XLSX.writeFile(workbook, `${fileName}.xlsx`, { bookType: 'xlsx', type: 'array' });
};

// 应用样式
function applyStyles(worksheet, options) {
  const range = XLSX.utils.decode_range(worksheet['!ref']);
  
  // 设置表头样式
  for (let c = range.s.c; c <= range.e.c; c++) {
    const cellAddress = XLSX.utils.encode_cell({ r: range.s.r, c });
    if (worksheet[cellAddress]) {
      worksheet[cellAddress].s = {
        font: options.headerStyle.font,
        fill: options.headerStyle.fill,
        alignment: options.headerStyle.alignment
      };
    }
  }
  
  // 设置列宽
  worksheet['!cols'] = options.columnWidths;
  
  // 可选：设置单元格样式
  if (options.cellStyles) {
    for (let r = range.s.r + 1; r <= range.e.r; r++) {
      for (let c = range.s.c; c <= range.e.c; c++) {
        const cellAddress = XLSX.utils.encode_cell({ r, c });
        if (worksheet[cellAddress]) {
          worksheet[cellAddress].s = options.cellStyles;
        }
      }
    }
  }
}    