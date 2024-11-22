import multer from 'multer';

const UPLOAD_DIR = 'uploads/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const createMulterUpload = (fileFilter?: multer.Options['fileFilter']) =>
  multer({ storage, fileFilter });

export const FileUploadConfig = {
  upload: createMulterUpload(),
  // DesignTemplateUpload: createMulterUpload(Validation.designTemplateFileFilter),
  // CourseAndLearningUpload: createMulterUpload(
  //   Validation.courseAndLearningFileFilter
  // ),
  // IconUpload: createMulterUpload(Validation.iconFileFilter),
  // FeedbackUpload: createMulterUpload(Validation.feedbackFileFilter),
  // StockPhotoUpload: createMulterUpload(Validation.stockPhotoFilter),
  // SoftwareToolsUpload: createMulterUpload(Validation.softwareAndToolsFilter),
  // videoTemplate: createMulterUpload(Validation.videoTemplateFileFilter)
};
