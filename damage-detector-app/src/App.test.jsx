import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the page title', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /détecteur de dégâts assurance/i })).toBeInTheDocument();
  });

  it('does not show the analyze button before a photo is selected', () => {
    render(<App />);
    expect(screen.queryByRole('button', { name: /analyser la photo/i })).not.toBeInTheDocument();
  });
});
