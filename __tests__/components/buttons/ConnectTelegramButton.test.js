import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import checkAuth from '__services/backend/checkAuth';
import getAuthentication from '__services/backend/getAuthentication';
import getTelegramLink from '__services/backend/getTelegramLink';
import ConnectTelegramButton from '__components/buttons/ConnectTelegramButton';

jest.mock('__services/backend/checkAuth', () => jest.fn().mockResolvedValue(true));
jest.mock('__services/backend/getAuthentication', () => jest.fn().mockResolvedValue(true));

const tgLink = 'https://some.tg.link'
jest.mock('__services/backend/getTelegramLink', () => jest.fn().mockResolvedValue(tgLink));

describe('ConnectTelegramButton', () => {
  describe('when user unauthenticated', () => {
    beforeEach(() => {
      checkAuth.mockResolvedValue(false);
    })

    it("renders 'Authenticate' button", async () => {
      render(<ConnectTelegramButton/>)

      await waitFor(() => {

        const button = screen.getByText('Authenticate');

        fireEvent.click(button);
        expect(getAuthentication).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('when user authenticated', () => {
    beforeEach(() => {
      checkAuth.mockResolvedValue(true);
    })

    it("renders 'Get Telegram Link' button", async () => {
      render(<ConnectTelegramButton/>)

      await waitFor(async () => {
        const button = screen.getByText('Get Telegram Link');

        await fireEvent.click(button);
      });

      await waitFor(() => {
        expect(getTelegramLink).toHaveBeenCalledTimes(1)

        const link = screen.getByText('Connect Telegram');
        expect(link).toHaveAttribute('href', tgLink);
      })
    })
  })
});
