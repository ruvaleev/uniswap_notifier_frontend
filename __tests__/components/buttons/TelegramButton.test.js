import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import checkTelegram from '__services/backend/checkTelegram';
import getAuthentication from '__services/backend/getAuthentication';
import getTelegramLink from '__services/backend/getTelegramLink';
import TelegramButton from '__components/buttons/TelegramButton';
import UnauthenticatedError from '__src/errors/UnauthenticatedError';
import connectedFixture from '__mocks/fixtures/backend/checkTelegram/connected.json';
import disconnectedFixture from '__mocks/fixtures/backend/checkTelegram/disconnected.json';

jest.mock('__services/backend/checkTelegram', () => jest.fn());
jest.mock('__services/backend/getAuthentication', () => jest.fn().mockResolvedValue(true));

const tgLink = 'https://some.tg.link'
jest.mock('__services/backend/getTelegramLink', () => jest.fn().mockResolvedValue(tgLink));

describe('TelegramButton', () => {
  describe('when user unauthenticated', () => {
    beforeEach(() => {
      checkTelegram.mockResolvedValue(() => {
        throw new UnauthenticatedError();
      });
    })

    it("renders 'Authenticate' button", async () => {
      render(<TelegramButton/>)

      await waitFor(() => {

        const button = screen.getByText('Authenticate');

        fireEvent.click(button);
        expect(getAuthentication).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('when user authenticated', () => {
    describe('when Telegram is not connected yet', () => {
      beforeEach(() => {
        checkTelegram.mockResolvedValue(disconnectedFixture);
      })

      it("renders 'Get Telegram Link' button", async () => {
        render(<TelegramButton/>)

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

    describe('when Telegram is connected already', () => {
      beforeEach(() => {
        checkTelegram.mockResolvedValue(connectedFixture);
      })

      it("renders 'Go to Telegram' button", async () => {
        render(<TelegramButton/>)

        await waitFor(async () => {
          const link = screen.getByText('Go to Telegram');
          expect(link).toHaveAttribute('href', connectedFixture.link);
        });
      })
    })
  })
});
