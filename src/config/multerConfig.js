import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "D:/PW/NodeJs/ImageGram/src/public");
  },
  filename: (req, file, cb) => {
    const uniqueName = file.fieldname + Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    console.log("inside multer 1");
    cb(null, true);
  } else {
    req.uploadingError = "Only JPEG and PNG file are allowed!";
  }

  cb(null, true);
};

export const upload = multer({ storage, fileFilter });
