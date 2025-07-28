// File for setting up resume uploads to AWS Bucket.

const express = require('express');
const multer = require('multer');
const s3 = require('../services/s3');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileName = `${Date.now()}-${file.originalname}`;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `resumes/${fileName}`,-
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'private'
    };

    const uploadFinal = await s3.upload(params).promise();

    return res.status(200).json({
      message: 'File uploaded successfully',
      fileUrl: uploadFinal.Location,
      fileName,
      uploadDate: new Date().toISOString()
    });
  } catch (error) {
    console.error('S3 Upload Error', error);
    return res.status(500).json({ error: 'Failed to Upload the Resume' });
  }
});

module.exports = router;
