import express from 'express';
import { uploadAvatar, uploadCertificate } from '../config/cloudinary.js';
import { deleteFile, upload_avatar, upload_file } from '../controllers/upload.js';
import {protect} from '../middleware/auth.js';
const router = express.Router();


router.post('/avatar',protect, uploadAvatar.single('image'), upload_avatar);
router.post('/file',protect, uploadCertificate.single('file'), upload_file);
router.delete('/:id',protect, deleteFile);

export default router;