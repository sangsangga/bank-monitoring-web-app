const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/file/");
  },

  filename: function (req, file, cb) {
    console.log(file, "<<< file");
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
