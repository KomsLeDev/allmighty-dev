function ImagePreview({ src }) {
  if (!src) return null;
  return <img src={src} alt="Aperçu" className="image-preview" />;
}

export default ImagePreview;