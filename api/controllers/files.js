var crypto = require("crypto");
const fs = require("fs");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads");
  },
  filename: function (req, file, callback) {
    const parts = file.originalname.split(".");
    const filename =
      crypto.randomBytes(20).toString("hex") + "." + parts[parts.length - 1];
    callback(null, filename);
  },
});

const upload = multer({ storage: storage });

const uploadFile = (req, res) => {
  res.json({ file: req.file.filename });
};

const donwloadFile = (req, res) => {
  console.log(req.params);
  const { fname } = req.params;
  const path = `uploads/${fname}`;
  if (!fs.existsSync(path))
    return res.status(404).json({
      message: "File not found",
    });

  const file = fs.createReadStream(path);
  const filename = new Date().toISOString();
  res.setHeader(
    "Content-Disposition",
    'attachment: filename="' + filename + '"'
  );
  file.pipe(res);
};

module.exports = function (server) {
  server.post("/files/upload", upload.single("file"), uploadFile);
  server.get("/files/download/:fname", donwloadFile);
};
