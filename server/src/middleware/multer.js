import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'audio') {
      cb(null, path.join(__dirname, '../uploads/audio'))
    }
    else if (file.fieldname === 'image') {
      cb(null, path.join(__dirname, '../uploads/images'))
    }
    else {
      cb(new Error("Invalid file field"), false);
    }
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
})

const fileFilter = (req, file, cb) => {
    if (file.fieldname === "audio") {
      if (!file.mimetype.startsWith("audio/")) {
        return cb(new Error("Only audio files allowed"), false);
      }
    }

    if (file.fieldname === "image") {
      if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image files allowed"), false);
      }
    }

    cb(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

export default upload