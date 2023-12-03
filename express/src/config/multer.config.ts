import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './storage/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExt = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExt);
  }
});

const upload = multer({ storage: storage });

export { upload };

// app.get('/upload', (req, res) => {
//   res.render('upload-file', { title: 'Upload File' });
// });

// app.post('/upload', upload.single('file'), function (req, res, next) {
//   res.send(req.file);
// });
