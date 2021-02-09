const { Record, Performance } = require("../models");
const readExcel = require("read-excel-file/node");
const { ROE, Context, ROA, CAR, NPL, BOPO } = require("../helpers/strategy");

class RecordController {
  static async addPerformance(records) {
    const roe = new Context(new ROE());
    const roa = new Context(new ROA());
    const car = new Context(new CAR());
    const npl = new Context(new NPL());
    const performances = [];
    records.forEach((record) => {
      let kreditKols = [
        record.kreditKol1,
        record.kreditKol2,
        record.kreditKol3,
        record.kreditKol4,
        record.kreditKol5,
      ];
      let performance = {
        periode: record.periode,
        NPL: npl.calculate(kreditKols),
        ROE: roe.calculate([record.laba, record.modal]),
        ROA: roa.calculate([record.laba, record.totalAset]),
        CAR: car.calculate([record.modal, record.atmr]),
        BOPO: (record.bo / record.po).toPrecision(3),
        LDR: (
          (record.kreditKol1 +
            record.kreditKol2 +
            record.kreditKol3 +
            record.kreditKol4 +
            record.kreditKol5) /
          record.dpk
        ).toPrecision(3),
      };

      performance.Kr = performance.NPL > 5 ? "merah" : "hijau";
      performance.Pr =
        performance.ROE <= 5 || performance.ROA < 1 ? "merah" : "hijau";
      performance.Re = performance.CAR < 20 ? "merah" : "hijau";
      performance.Ef = performance.BOPO > 80 ? "merah" : "hijau";
      performance.Lk =
        performance.LDR > 94 || performance.LDR < 82 ? "merah" : "hijau";
      let colors = [
        performance.Kr,
        performance.Pr,
        performance.Re,
        performance.Ef,
        performance.Lk,
      ];
      let results = {
        merah: 0,
        hijau: 0,
      };
      colors.forEach((color) => {
        results[color] += 1;
      });

      if (results.merah > 2) {
        performance.Komposit = "merah";
      } else if (results.merah === 2) {
        performance.Komposit = "kuning";
      } else {
        performance.Komposit = "hijau";
      }

      performances.push(performance);
    });

    return await Performance.bulkCreate(performances);
  }

  static validateRecord(data) {
    if (data === null)
      throw {
        status: 400,
        message: "Some fields are empty",
      };
    data = data.replace(/,/g, "");
    if (isNaN(Number(data))) {
      throw {
        status: 400,
        message: "Some fields are not number",
      };
    } else {
      return Number(data);
    }
  }

  static async addRecord(req, res, next) {
    try {
      if (req.fileValidationError) {
        throw {
          status: 400,
          message: req.fileValidationError,
        };
      }
      const rows = await readExcel("./" + req.file.path);
      const records = [];
      rows.shift();
      rows.forEach((row) => {
        let periode = String(row[0]);
        periode =
          periode.substring(0, 4) + "-" + periode.substring(4, periode.length);
        let record = {
          periode: periode,
          sandiBank: row[1],
          kreditKol1: RecordController.validateRecord(row[2]),
          kreditKol2: RecordController.validateRecord(row[3]),
          kreditKol3: RecordController.validateRecord(row[4]),
          kreditKol4: RecordController.validateRecord(row[5]),
          kreditKol5: RecordController.validateRecord(row[6]),
          laba: RecordController.validateRecord(row[7]),
          modal: RecordController.validateRecord(row[8]),
          totalAset: RecordController.validateRecord(row[9]),
          atmr: RecordController.validateRecord(row[10]),
          bo: RecordController.validateRecord(row[11]),
          po: RecordController.validateRecord(row[12]),
          dpk: RecordController.validateRecord(row[13]),
        };
        records.push(record);
      });
      const response = await Record.bulkCreate(records);
      const response2 = await RecordController.addPerformance(records);
      res.status(201).json({ message: "Data Succesfully Added" });
    } catch (error) {
      if (error.message) {
        res.status(error.status).json({ message: error.message });
      }
    }
  }

  static async findAllPerformance(req, res, next) {
    try {
      const performances = await Performance.findAll();
      res.status(200).json(performances);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = RecordController;
