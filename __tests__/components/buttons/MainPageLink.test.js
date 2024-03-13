import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import MainPageLink from '__components/buttons/MainPageLink';
import { rootPath } from '__helpers/routes';

const renderWithRouter = () => {
  render(
    <MemoryRouter>
      <MainPageLink />
    </MemoryRouter>
  );
};

describe('MainPageLink', () => {
  it('renders proper link to home page', () => {
    renderWithRouter()
    const linkElement = screen.getByRole('link', { name: 'Main Page' });
    expect(linkElement).toHaveAttribute('href', rootPath());
  })
});
