import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AnalysisResults from './AnalysisResults';

describe('AnalysisResults', () => {
  it('renders nothing when there is no analysis', () => {
    const { container } = render(
      <AnalysisResults analysis={null} selectedIndex={null} onSelect={vi.fn()} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('lists each detected object with its price and total', () => {
    const analysis = {
      objects: [
        { name: 'Chaise', damage: 'léger', description: 'Chaise en bois', estimatedValue: 50 },
        { name: 'Table', damage: 'sévère', description: 'Table cassée', estimatedValue: 200 },
      ],
    };

    render(<AnalysisResults analysis={analysis} selectedIndex={null} onSelect={vi.fn()} />);

    expect(screen.getByText('Chaise')).toBeInTheDocument();
    expect(screen.getByText('Table')).toBeInTheDocument();
    expect(screen.getByText(/250/)).toBeInTheDocument();
  });
});
