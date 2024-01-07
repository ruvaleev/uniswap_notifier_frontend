import React from 'react';
import { render, screen } from '@testing-library/react';

import EarnedFeesWidget from '__components/widgets/EarnedFeesWidget';

describe('EarnedFeesWidget', () => {
  describe('when maxIl is greater then earned fees', () => {
    it("renders Earned Fees info and appropriate scale with max IL as a maximum", () => {
      const { container } = render(<EarnedFeesWidget earnedFees={10} maxIl={100}/>)

      expect(screen.getByText('$10.00')).toBeInTheDocument();
      const scaleValue = container.querySelector('.scale-value.bg-green');
      expect(scaleValue).toHaveStyle('width: 10%');
    });
  })

  describe('when maxIl is less or eaqual then earned fees', () => {
    it("renders Earned Fees info and appropriate scale with full scale", () => {
      const { container } = render(<EarnedFeesWidget earnedFees={101} maxIl={100}/>)

      expect(screen.getByText('$101.00')).toBeInTheDocument();
      const scaleValue = container.querySelector('.scale-value.bg-green');
      expect(scaleValue).toHaveStyle('width: 100%');
    });
  })
});
