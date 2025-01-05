import express from 'express';
import { addJobController } from '../controller/jobAdController.js';
import { validateToken } from '../helpers/token.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';


export const jobAdRoutes = express.Router();



//only file path without extension
// const upload = multer({ dest: 'img/jobAds' });

//file storing with extension
// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'img/jobAds');
//     },
//     filename: (req, file, cb) => {
//         const ext = file.mimetype.split('/')[1];
//         cb(null, `jobAd-${Date.now()}.${ext}`);
//     }
// });

// const multerFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image')) cb(null, true);
//     else cb(new Error('Not an image! Please upload only images.'), false);
// };

// const upload = multer({
//     fileFilter: multerFilter,
//     storage: multerStorage
// })

// only creating buffer with memory storage
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

// jobAdRoutes.post('/', validateToken, addJobController);
// jobAdRoutes.post('/', upload.single('photo'), addJobController);
jobAdRoutes.post('/', upload.single('photo'), addJobController);
// jobAdRoutes.get('/', getJobAdsController);
// jobAdRoutes.get('/:id', getJobAdController);
// jobAdRoutes.put('/:id', updateJobAdController);