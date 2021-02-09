const { Record, Performance } = require("../models");
const readExcel = require("read-excel-file/node");

class RecordController {
  static async addPerformance(records) {
    let performances = [];
    records.forEach((record) => {
      let performance = {
        periode: record.periode,
        NPL: (
          (record.kreditKol3 + record.kreditKol4 + record.kreditKol5) /
          (record.kreditKol1 +
            record.kreditKol2 +
            record.kreditKol3 +
            record.kreditKol4 +
            record.kreditKol5)
        ).toPrecision(3),
        ROE: (record.laba / record.modal).toPrecision(3),
        ROA: (record.laba / record.totalAset).toPrecision(3),
        CAR: (record.modal / record.atmr).toPrecision(3),
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
        console.log(row, "<<<  periode");
        periode =
          periode.substring(0, 4) + "-" + periode.substring(4, periode.length);
        let record = {
          periode: periode,
          sandiBank: row[1],
          kreditKol1: Number(row[2].replace(/,/g, "")),
          kreditKol2: Number(row[3].replace(/,/g, "")),
          kreditKol3: Number(row[4].replace(/,/g, "")),
          kreditKol4: Number(row[5].replace(/,/g, "")),
          kreditKol5: Number(row[6].replace(/,/g, "")),
          laba: Number(row[7].replace(/,/g, "")),
          modal: Number(row[8].replace(/,/g, "")),
          totalAset: Number(row[9].replace(/,/g, "")),
          atmr: Number(row[10].replace(/,/g, "")),
          bo: Number(row[11].replace(/,/g, "")),
          po: Number(row[12].replace(/,/g, "")),
          dpk: Number(row[13].replace(/,/g, "")),
        };
        records.push(record);
      });
      const response = await Record.bulkCreate(records);
      const response2 = await RecordController.addPerformance(records);
      res.status(201).json({ message: "Data Succesfully Added" });
    } catch (error) {
      console.log(error, "<<<error");
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
