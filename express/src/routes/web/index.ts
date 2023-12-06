import express, { Router } from 'express';
import { upload } from '../../config/multer.config';
import webController from '../../modules/web/web.controller';

const router: Router = express.Router();

/**
 * file upload page
 * @route GET /file-upload
 */
router.get('/file-upload', webController.view);

/**
 * file upload
 * @route POST /file-upload
 */
router.post('/file-upload', upload.single('file'), webController.fileUpload);

export default router;
