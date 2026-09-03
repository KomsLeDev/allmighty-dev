const anthropic = require('../config/anthropic.config');

async function analyzeDamage(base64Image, mediaType) {
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 1500,
    messages: [{
      role: 'user',
      content: [
        { type: 'image', source: { type: 'base64', media_type: mediaType, data: base64Image } },
        {
          type: 'text',
          text: `Analyse cette photo pour une déclaration de sinistre assurance (dégât des eaux, vol, catastrophe naturelle...).
Pour chaque objet visible :
- identifie l'objet
- évalue le dommage apparent (aucun, léger, modéré, sévère)
- estime sa valeur de remplacement à neuf en euros (prix de marché réaliste pour ce type d'objet, en te basant sur ce que tu observes : qualité apparente, marque probable, taille)

Réponds en JSON strict avec ce format exact, sans texte autour :
{
  "objects": [
    {"name": "...", "damage": "...", "description": "...", "estimatedValue": 000}
  ]
}
L'estimatedValue est un nombre entier en euros, sans symbole ni texte.`,
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