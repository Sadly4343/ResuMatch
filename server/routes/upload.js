//File for setting up resume uploads to AWS Bucket.


const express = require('express');
const router = express.Router();
const multer = required('multer');
const s3 = require('../services/s3');
const { getDatabase } = require('../data/database');

const upload = multer({storage: multer.memoryStorage() });

router.post('')