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
- délimite sa position dans l'image avec un rectangle englobant (bounding box), en pourcentage de la largeur/hauteur totale de l'image (0 à 100), où x/y désignent le coin supérieur gauche du rectangle

Réponds en JSON strict avec ce format exact, sans texte autour :
{
  "objects": [
    {"name": "...", "damage": "...", "description": "...", "estimatedValue": 000, "boundingBox": {"x": 0, "y": 0, "width": 0, "height": 0}}
  ]
}
L'estimatedValue est un nombre entier en euros, sans symbole ni texte. Les 4 valeurs de boundingBox sont des nombres (pas des chaînes) entre 0 et 100.`,
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