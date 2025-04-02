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
    cb(null, true);
  } else {
    cb(new Error("Only JPEG and PNG file are allowed!"));
  }
};

export const upload = multer({ storage, fileFilter });
