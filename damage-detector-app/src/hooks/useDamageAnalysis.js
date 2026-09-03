import { useState } from 'react';
import { analyzeDamage } from '../services/damageAnalysis.service';

export function useDamageAnalysis() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runAnalysis = async (imageFile) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeDamage(imageFile);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setError('Erreur lors de l\'analyse. Vérifiez que le serveur API tourne bien.');
    } finally {
      setLoading(false);
    }
  };

  return { analysis, loading, error, runAnalysis };
}