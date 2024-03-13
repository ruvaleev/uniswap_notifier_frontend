import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import SettingsLink from '__components/buttons/SettingsLink';
import { settingsPath } from '__helpers/routes';

const renderWithRouter = () => {
  render(
    <MemoryRouter>
      <SettingsLink />
    </MemoryRouter>
  );
};

describe('SettingsLink', () => {
  it('renders proper link to /settings page', () => {
    renderWithRouter()
    const linkElement = screen.getByRole('link', { name: /settings/i });
    expect(linkElement).toHaveAttribute('href', settingsPath());
  })
});
