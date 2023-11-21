import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import fulfilledPosition from '__mocks/fixtures/positions/fulfilledPosition';
import ProjectedILInfo from '__components/ProjectedILInfo';

const renderComponent = (position) => {
  render(
    <ProjectedILInfo position={position} />
  );
};

describe('ProjectedILInfo', () => {
  beforeEach(() => {
    renderComponent(fulfilledPosition)
  })

  it('shows current tick by default', () => {
    expect(screen.getByText(`1724.7327067343867`)).toBeInTheDocument();
    expect(screen.getByText(`4.3508%`)).toBeInTheDocument();
  });

  it('shows correct data after changes', () => {
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '74500' } });

    expect(screen.getByText(`1719.2226583497525`)).toBeInTheDocument();
    expect(screen.getByText(`4.5290%`)).toBeInTheDocument();
  });

  it('shows correct data in lowest value', () => {
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '73430' } });

    expect(screen.getByText(`1544.7739600815653`)).toBeInTheDocument();
    expect(screen.getByText(`12.2776%`)).toBeInTheDocument();
  });

  it('shows correct data in highest value', () => {
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '76050' } });

    expect(screen.getByText(`2007.4484671855757`)).toBeInTheDocument();
    expect(screen.getByText(`0.0400%`)).toBeInTheDocument();
  });
})
