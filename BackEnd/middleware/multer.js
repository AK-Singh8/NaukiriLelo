import multer from "multer";

const storage = multer.memoryStorage();
export const singleUpload=multer({storage}).single("file");
const upload = multer({ storage }).single("profilePhoto"); // Assuming file field name is 'profilePhoto'
