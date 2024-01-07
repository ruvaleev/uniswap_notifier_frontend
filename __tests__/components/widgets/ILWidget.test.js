import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import fulfilledPosition from '__mocks/fixtures/positions/fulfilledPosition'
import ILWidget from '__components/widgets/ILWidget';

describe('ILWidget', () => {
  it("renders IL info and appropriate scale", async () => {
    const { container } = render(<ILWidget position={fulfilledPosition} maxIl={9232}/>)

    await waitFor(() => {
      expect(screen.getByText('4.3093% ($923.20)')).toBeInTheDocument();
      const scaleValue = container.querySelector('.scale-value.bg-red');
      expect(scaleValue).toHaveStyle('width: 10%');
    });
  });
});
