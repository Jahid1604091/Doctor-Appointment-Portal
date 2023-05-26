import express from 'express';
import { approveAsDoctor, get_all_doctors, get_all_users } from '../../controllers/admin/users.js';
import { protect, protectByAdmin } from '../../middleware/auth.js';

const router = express.Router();

router.get('/users', protect, protectByAdmin, get_all_users);
router.get('/doctors', protect, protectByAdmin, get_all_doctors);
router.put('/approve-as-doctor/:id', protect, protectByAdmin, approveAsDoctor);

export default router;