import { useBadgeDeoverlap } from '../hooks/useBadgeDeoverlap';
import { colorForIndex } from '../utils/objectColors';

function AnnotatedImage({ src, objects, selectedIndex, onSelect }) {
  const boxed = objects
    .map((obj, index) => ({ obj, index }))
    .filter(({ obj }) => obj.boundingBox)
    // Les plus grands cadres d'abord (dessinés en dessous), les plus petits
    // en dernier (dessinés au-dessus) pour rester cliquables quand ils sont imbriqués.
    .sort((a, b) => (b.obj.boundingBox.width * b.obj.boundingBox.height) - (a.obj.boundingBox.width * a.obj.boundingBox.height));

  const { badgeRefs, offsets } = useBadgeDeoverlap(boxed.length, [src, objects.length]);

  if (!src) return null;

  return (
    <div className="annotated-image">
      <img src={src} alt="Aperçu analysé" />
      {boxed.map(({ obj, index }, boxedIndex) => {
        const { x, y, width, height } = obj.boundingBox;
        const color = colorForIndex(index);
        const active = selectedIndex === index;
        const offset = offsets[boxedIndex] || { dx: 0, dy: 0 };

        return (
          <div
            key={index}
            className={`detection-box${active ? ' detection-box--active' : ''}`}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: `${width}%`,
              height: `${height}%`,
              borderColor: color,
              '--box-fill': `${color}33`,
            }}
            onClick={() => onSelect(index)}
          >
            <span
              ref={(el) => (badgeRefs[boxedIndex] = el)}
              className="detection-badge"
              style={{
                backgroundColor: color,
                transform: `translate(${offset.dx}px, ${offset.dy}px)`,
              }}
            >
              {index + 1}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default AnnotatedImage;
