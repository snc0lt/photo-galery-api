import { Router } from 'express';
import { creaePhoto, getPhotos, getPhoto, deletePhoto, editPhoto } from '../controllers/photo';
import multer from '../helpers/multer';

const router = Router();

router.route('/photos')
  .get(getPhotos)
  .post(multer.single('image'),creaePhoto)

router.route('/photos/:id')
  .get(getPhoto)
  .put(editPhoto)
  .delete(deletePhoto)

export default router;