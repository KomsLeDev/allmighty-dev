const express = require('express');
const multer = require('multer');
const { handleAnalyzeDamage } = require('../controllers/damage.controller');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/analyze-damage', upload.single('image'), handleAnalyzeDamage);

module.exports = router;