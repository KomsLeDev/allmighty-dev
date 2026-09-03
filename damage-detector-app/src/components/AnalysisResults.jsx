function getDamageClass(damage) {
  const normalized = damage.toLowerCase();
  if (normalized.includes('aucun')) return 'aucun';
  if (normalized.includes('léger') || normalized.includes('leger')) return 'leger';
  if (normalized.includes('modéré') || normalized.includes('modere')) return 'modere';
  if (normalized.includes('sévère') || normalized.includes('severe')) return 'severe';
  return 'aucun';
}

function formatPrice(value) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
}

function AnalysisResults({ analysis }) {
  if (!analysis) return null;

  const total = analysis.objects.reduce((sum, obj) => sum + (obj.estimatedValue || 0), 0);

  return (
    <div className="card results-card">
      <h2>Résultats de l'analyse</h2>
      <div className="results-grid">
        {analysis.objects.map((obj, index) => (
          <div key={index} className="result-item">
            <div className="result-info">
              <strong>{obj.name}</strong>
              <p className="result-description">{obj.description}</p>
            </div>
            <div className="result-meta">
              <span className={`damage-badge ${getDamageClass(obj.damage)}`}>
                {obj.damage}
              </span>
              <span className="result-price">{formatPrice(obj.estimatedValue)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="total-row">
        <span>Estimation totale</span>
        <strong>{formatPrice(total)}</strong>
      </div>

      <p className="disclaimer">
      Estimation indicative générée par IA, ne remplace pas une expertise professionnelle.
    </p>
    </div>
  );
}

export default AnalysisResults;