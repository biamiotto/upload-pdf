import express from 'express';
import multer from 'multer';
import * as controller from '../controllers/fotoController.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

router.post('/:id/foto', upload.single('foto'), controller.uploadFoto);

export default router;
