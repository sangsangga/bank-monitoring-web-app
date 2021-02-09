const multer = require("multer");

const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    req.fileValidationError = "Please Upload Only Excel";
    return cb(null, false, req.fileValidationError);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/file/");
  },

  filename: function (req, file, cb) {
    console.log(file, "<<< file");
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage, fileFilter: excelFilter });
module.exports = upload;
