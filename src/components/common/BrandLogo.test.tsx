import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrandLogo } from './BrandLogo';

describe('BrandLogo Component', () => {
  it('renders brand name and Amharic localized text', () => {
    render(<BrandLogo />);
    
    expect(screen.getByText('GreenMerkato')).toBeInTheDocument();
    expect(screen.getByText('ግሪን መርካቶ')).toBeInTheDocument();
    expect(screen.getByText('አዲስ አበባ')).toBeInTheDocument();
  });

  it('renders subtitle by default', () => {
    render(<BrandLogo showSubtitle={true} />);
    
    expect(screen.getByText('የመርካቶ ኦርጋኒክ ማዳበሪያ')).toBeInTheDocument();
    expect(screen.getByText('Merkato Circular Operations')).toBeInTheDocument();
  });

  it('hides subtitle when showSubtitle is false', () => {
    render(<BrandLogo showSubtitle={false} />);
    
    expect(screen.queryByText('Merkato Circular Operations')).not.toBeInTheDocument();
  });
});
