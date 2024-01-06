import React from 'react';
import { render } from '@testing-library/react';
import Scale from '__components/Scale';

describe('Scale', () => {
  describe('when value is 100', () => {
    it('renders scale with rounded corners', () => {
      const { container } = render(<Scale value={100} />);
      const scaleValue = container.querySelector('.scale-value');
      expect(scaleValue.style.borderRadius).toBe('0.5rem');
    });
  });

  describe('when value is more than 100', () => {
    it('renders scale with rounded corners', () => {
      const { container } = render(<Scale value={101} />);
      const scaleValue = container.querySelector('.scale-value');
      expect(scaleValue.style.borderRadius).toBe('0.5rem');
    });
  });

  describe('when value is less than 100', () => {
    it('renders scale with rounded corners only from left side', () => {
      const { container } = render(<Scale value={50} />);
      const scaleValue = container.querySelector('.scale-value');
      expect(scaleValue.style.borderRadius).toBe('0.5rem 0 0 0.5rem');
    });
  });
});
