const anthropic = require('../config/anthropic.config');

async function analyzeDamage(base64Image, mediaType) {
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: [
        { type: 'image', source: { type: 'base64', media_type: mediaType, data: base64Image } },
        {
          type: 'text',
          text: 'Analyse cette photo pour une déclaration de sinistre assurance. Liste les objets visibles et évalue les dommages apparents (léger, modéré, sévère) pour chacun. Réponds en JSON strict avec ce format : {"objects": [{"name": "...", "damage": "...", "description": "..."}]}',
        },
      ],
    }],
  });

  const cleanedText = message.content[0].text
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();

  return JSON.parse(cleanedText);
}

module.exports = { analyzeDamage };