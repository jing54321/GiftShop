import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import { protect, admin } from '../../middleWare/authMiddleWare.js'; 
import path from 'path';
const router = express.Router();

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "ap-northeast-2"
  });
//* AWS S3 multer 
const upload = multer({
    
    storage: multerS3({
       s3: s3,
       bucket: 'testgiftshop',
       acl: "public-read",
       contentType: multerS3.AUTO_CONTENT_TYPE,
       key(req, file, cb) {
          cb(null, `${Date.now()}_${path.basename(file.originalname)}`) 
       },
    }),
   
 });

router.post('/', protect, admin, upload.single('image'), async (req, res) => {
    const imagePath = req.file.location
    if(imagePath) {
        res.status(200).send(imagePath)
    } else {
        res.status(400)
        throw new Error('No images')
    }
})

export default router
