import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import checkTelegram from '__services/backend/checkTelegram';
import getAuthentication from '__services/backend/getAuthentication';
import getTelegramLink from '__services/backend/getTelegramLink';
import TelegramButton from '__components/buttons/TelegramButton';
import UnauthenticatedError from '__src/errors/UnauthenticatedError';
import connectedFixture from '__mocks/fixtures/backend/checkTelegram/connected.json';
import disconnectedFixture from '__mocks/fixtures/backend/checkTelegram/disconnected.json';
import telegramLinkFixture from '__mocks/fixtures/backend/getTelegramLink/success.json';

jest.mock('__services/backend/checkTelegram', () => jest.fn());
jest.mock('__services/backend/getAuthentication', () => jest.fn().mockResolvedValue(true));

jest.mock('__services/backend/getTelegramLink', () => {
  const telegramLinkFixture = require('__mocks/fixtures/backend/getTelegramLink/success.json');

  return jest.fn().mockResolvedValue(telegramLinkFixture)
});

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
          expect(link).toHaveAttribute('href', telegramLinkFixture.link);
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
          expect(
            document.querySelector(`a[href="${connectedFixture.link}"]`)
          ).toBeInTheDocument();
        });
      })
    })
  })
});
