let exceljs = require('exceljs')
let fs = require('fs')

export class ExcelExporter {
  public dataArray
  public headersArray
  public wordHeader
  public titleReport
  constructor(headersArray: any, dataArray: any, titleReport: any) {
    this.dataArray = dataArray
    this.headersArray = headersArray
    this.wordHeader = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
      'AA',
      'BA',
      'CA',
      'DA',
      'EA',
      'FA',
      'GA',
      'HA',
      'IA',
      'JA',
      'KA',
      'LA',
      'MA',
      'NA',
      'OA',
      'PA',
      'QA',
      'RA',
      'SA',
      'TA',
      'UA',
      'VA',
      'WA',
      'XA',
      'YA',
      'ZA',
    ]
    this.titleReport = titleReport
  }

  BuildReport1() {
    return new Promise<{ statusCode: any; result: any }>((resolve, reject) => {
      const workbook = new exceljs.Workbook()

      workbook.creator = 'Me'
      workbook.lastModifiedBy = 'Her'
      workbook.created = new Date(1985, 8, 30)
      workbook.modified = new Date()
      workbook.lastPrinted = new Date(2016, 9, 27)
      const imageId1 = workbook.addImage({
        filename: 'src/utils/logo.png',
        extension: 'png',
      })
      const sheet = workbook.addWorksheet('Reporte')
      sheet.addImage(imageId1, {
        tl: { col: 0, row: 0 },
        ext: { width: 80, height: 80 },
      })
      sheet.mergeCells(`A1:A4`)
      sheet.getCell('A1').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '31869B' },
      }
      sheet.getCell('B1').value = this.titleReport
      sheet.getCell('B1').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '31869B' },
      }
      sheet.getCell('B1').style.font = {
        name: 'Calibri',
        family: 4,
        size: 16,
        bold: true,
        color: { argb: 'FFFFFFFF' },
      }
      sheet.getCell('B1').alignment = { vertical: 'middle', horizontal: 'left', wrapText: true }

      sheet.mergeCells(`B1:${this.wordHeader[this.headersArray.length - 1]}4`)
      // sheet.getCell('B2').value = this.titleReport
      //   var columna = sheet.getColumn(5)
      let headers = []
      for (let i = 0; i < this.headersArray.length; i++) {
        let dobCol = sheet.getColumn(i + 1)

        if (i == 0) {
          dobCol.width = 12
        } else if (i == 4) {
          dobCol.width = 40
        } else {
          dobCol.width = 20
        }

        let a = {
          name: this.headersArray[i],
          filterButton: false,
          width: 45,
        }
        headers.push(a)
      }
      let rows = []
      for (let index = 0; index < this.dataArray.length; index++) {
        rows.push(Object.values(this.dataArray[index]))
      }
      // crear tabla
      sheet.addTable({
        name: 'ReportTable',
        ref: 'A5',
        headerRow: true,
        totalsRow: false,
        style: {
          theme: 'TableStyleMedium6',
          showRowStripes: true,
        },
        columns: headers,
        rows: rows,
      })

      let name = __dirname + '/Reporte' + new Date().getTime()
      workbook.xlsx.writeFile(name).then(() => {
        fs.readFile(name, (err: any, data: any) => {
          if (!err) {
            fs.unlink(name, () => {})
            resolve({ statusCode: 200, result: data })
          }
        })
      })
    })
  }

}