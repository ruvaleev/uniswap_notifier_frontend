import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { WalletProvider } from '__contexts/WalletContext';
import { rootPath, settingsPath } from '__helpers/routes';
import ControlPanel from '__components/ControlPanel';

const renderComponent = (initialPath) => (
  render(
    <WalletProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path={rootPath()} element={<ControlPanel />} />
          <Route path={settingsPath()} element={<ControlPanel />} />
        </Routes>
      </MemoryRouter>
    </WalletProvider>
  )
)

describe('ControlPanel', () => {
  describe('when user is on Main Page', () => {
    beforeEach(() => {
      renderComponent(
        rootPath()
      )
    });

    it('renders link to Settings and do not render link to Main Page', () => {
      expect(screen.queryByText('Main Page')).not.toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    })
  });

  describe('when user is on Settings Page', () => {
    beforeEach(() => {
      renderComponent(
        settingsPath()
      )
    });

    it('renders link to Main Page and do not render link to Settings Page', () => {
      expect(screen.queryByText('Settings')).not.toBeInTheDocument();
      expect(screen.getByText('Main Page')).toBeInTheDocument();
    })
  });
});
