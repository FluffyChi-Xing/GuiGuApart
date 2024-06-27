import * as ExcelJS from "exceljs";


export async function makeExcel(sheetName, column, data) {
    const workBook = new ExcelJS.Workbook();
    const workSheet = workBook.addWorksheet(sheetName);
    workSheet.columns = column;
    workSheet.addRows(data);
    workSheet.eachRow((row, rowIndex) => {
        row.eachCell(cell => {
            if(rowIndex === 1) {
                cell.style = {
                    font: {
                        size: 10,
                        bold: true,
                        color: { argb: 'ffffff' }
                    },
                    alignment: { vertical: 'middle', horizontal: 'center' },
                    fill: {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: '000000' }
                    },
                    border: {
                        top: { style: 'dashed', color: { argb: '0000ff' } },
                        left: { style: 'dashed', color: { argb: '0000ff' } },
                        bottom: { style: 'dashed', color: { argb: '0000ff' } },
                        right: { style: 'dashed', color: { argb: '0000ff' } }
                    }
                }
            } else {
                cell.style = {
                    font: {
                        size: 10,
                        bold: true,
                    },
                    alignment: { vertical: 'middle', horizontal: 'left' },
                    border: {
                        top: { style: 'dashed', color: { argb: '0000ff' } },
                        left: { style: 'dashed', color: { argb: '0000ff' } },
                        bottom: { style: 'dashed', color: { argb: '0000ff' } },
                        right: { style: 'dashed', color: { argb: '0000ff' } }
                    }
                }
            }
        })
    });
    const arraybuffer = new ArrayBuffer(10 * 1024 * 1024);
    return await workBook.xlsx.writeBuffer(arraybuffer);
}