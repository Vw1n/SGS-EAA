// excel-export.js
import * as XLSX from 'xlsx'  // 修改导入方式

export const exportJsonToExcel = (jsonData, fileName, headerMap = {}) => {
  const data = jsonData.map(item => {
    const newItem = {}
    Object.keys(item).forEach(key => {
      newItem[headerMap[key] || key] = item[key]
    })
    return newItem
  })

  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'sheet1')
  XLSX.writeFile(workbook, `${fileName}.xlsx`)
}