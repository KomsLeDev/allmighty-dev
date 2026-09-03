const { analyzeDamage } = require('../services/anthropic.service.js');

async function handleAnalyzeDamage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucune image reçue' });
    }

    const base64Image = req.file.buffer.toString('base64');
    const analysisData = await analyzeDamage(base64Image, req.file.mimetype);

    res.json({ analysis: analysisData });
  } catch (error) {
    console.error('Erreur lors de l\'analyse:', error);
    res.status(500).json({ error: 'Erreur lors de l\'analyse de l\'image' });
  }
}

module.exports = { handleAnalyzeDamage };