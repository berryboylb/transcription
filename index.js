const express = require("express");
const multer = require("multer");
const fs = require("fs");
const dotenv = require("dotenv");
const app = express();
const { transcribe } = require("./transcription");
const { v4: uuid } = require("uuid");
const path = require("path");
const errorHandler = require("./errorHandler");
const notFound = require("./notFound");

app.use(express.json({ extended: false }));
app.timeout = 300000;
dotenv.config();

// Set the maximum file size to 25MB
const maxFileSize = 30 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: "./uploads/videos",
  filename: (_, file, callback) => {
    const filename =
      path.parse(file.originalname).name.replace(/\s/g, "") + uuid();
    const extension = path.parse(file.originalname).ext;
    callback(null, `${filename}${extension}`);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: maxFileSize,
  },
});

const increaseTimeout = (req, res, next) => {
  req.setTimeout(300000);
  next();
};

app.get("/", async (_, res) => {
  res.status(200).json({
    statusCode: 200,
    message: "Sucessfully Tested App",
    data: "Hello from server",
  });
});

app.post(
  "/upload-video",
  increaseTimeout,
  upload.single("video"),
  async (req, res) => {
    try {
      // Check if a file was uploaded
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
      }

      // Check if the uploaded file is a video (you can add more validation)
      if (!req.file.mimetype.startsWith("video/")) {
        return res
          .status(400)
          .json({ error: "Please upload a valid video file." });
      }

      const file = await load(req.file.path);

      res.status(200).json({
        statusCode: 200,
        message: "Sucessfully Uploaded Video",
        data: {
          local_name: req.file.filename,
          online_url: file.secure_url,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

app.post("/transcribe", async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.body.url) {
      return res
        .status(400)
        .json({ error: "Add a  valid url to the body parameter" });
    }

    const response = await transcribe(req.body.url);

    res.status(200).json({
      statusCode: 200,
      message: "Sucessfully Transcribed Video",
      data: response.results,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const videoFolder = path.join(__dirname, "uploads/videos/");
app.get("/videos/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(videoFolder, fileName);

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).send("Video not found");
    } else {
      const fileStream = fs.createReadStream(filePath);
      res.setHeader("Content-Type", "video/mp4");
      fileStream.pipe(res);
    }
  });
});

app.use(errorHandler);
app.use(notFound);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
