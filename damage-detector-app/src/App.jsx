import { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import ImagePreview from './components/ImagePreview';
import AnalysisResults from './components/AnalysisResults';
import { useDamageAnalysis } from './hooks/useDamageAnalysis';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const { analysis, loading, error, runAnalysis } = useDamageAnalysis();

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="app">
      <header className="app-header">
        <p className="app-label">Projet IA</p>
        <h1>Détecteur de dégâts assurance</h1>
        <p className="app-description">
          Cet outil analyse une photo pour identifier les objets présents et évaluer
          leurs dommages apparents — sinistres, vol, catastrophe naturelle. L'objectif
          est de simplifier la déclaration pour l'usager et d'accélérer le traitement
          côté assurance, en donnant une première estimation des pertes et des coûts
          avant l'intervention d'un expert.
        </p>
      </header>

      <div className="card upload-zone">
        <ImageUploader onFileSelect={handleFileSelect} />
        <ImagePreview src={preview} />

        {selectedFile && (
          <button
            className="analyze-button"
            onClick={() => runAnalysis(selectedFile)}
            disabled={loading}
          >
            {loading ? 'Analyse en cours...' : 'Analyser la photo'}
          </button>
        )}

        {error && <p className="error-message">{error}</p>}
      </div>

      <AnalysisResults analysis={analysis} />
    </div>
  );
}

export default App;