import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import buildPosition from '__services/buildPosition';
import fulfilledPosition from '__mocks/fixtures/positions/fulfilledPosition'
import unfilledPosition from '__mocks/fixtures/positions/unfilledPosition.json'
import { STATUSES } from '__services/buildPosition/constants';
import Position from '__components/Position';

jest.mock('__services/buildPosition', () => {
  const { buildPositionMock } = require('__mocks/services/buildPositionMock')

  return buildPositionMock();
});

const prices = {'ARB': 0.920302, 'WETH': 1699.14}
const position = unfilledPosition
const completionCallback = jest.fn()

const renderComponent = ({
  status = STATUSES.gettingEvents,
  position = unfilledPosition,
  completionCallback = completionCallback
} = {}) => (
  render(
    <Position
      position={position}
      prices={prices}
      initialStatus={status}
      completionCallback={completionCallback}
    />
  )
)

describe('Position', () => {
  afterEach(() => {
    buildPosition.mockClear()
    completionCallback.mockClear()
  });

  it("shows initial status and calls buildPosition service with provided position", async () => {
    render(<Position position={position} prices={prices}/>)

    await waitFor(() => {
      expect(screen.getByText('Getting Info About Fees...')).toBeInTheDocument();
      expect(buildPosition).toHaveBeenCalledTimes(1)
      expect(buildPosition).toHaveBeenCalledWith(position, STATUSES.gettingFeesInfo, prices)
    });
  });

  it("renders proper status if it is not default anymore (gettingEvents)", async () => {
    renderComponent({status: STATUSES.gettingEvents})

    await waitFor(() => {
      expect(screen.getByText('Getting Historical Events...')).toBeInTheDocument();
      expect(buildPosition).toHaveBeenCalledTimes(1)
      expect(buildPosition).toHaveBeenCalledWith(position, STATUSES.gettingEvents, prices)
    });
  });

  it("renders proper status if it is not default anymore (analyzeHistory)", async () => {
    renderComponent({status: STATUSES.analyzeHistory})

    await waitFor(() => {
      expect(screen.getByText('Analyze Position History...')).toBeInTheDocument();
      expect(buildPosition).toHaveBeenCalledTimes(1)
      expect(buildPosition).toHaveBeenCalledWith(position, STATUSES.analyzeHistory, prices)
    });
  });

  describe('when processing has failed with some error', () => {
    const errorMessage = 'some error message'

    beforeAll(() => {
      position.errorMessage = errorMessage
      renderComponent({status: STATUSES.failed})
    })

    afterAll(() => {
      position.errorMessage = null
    })

    it("renders proper status and error message if position status is failed", async () => {
      await waitFor(() => {
        expect(screen.getByText('Failed')).toBeInTheDocument();
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
        expect(buildPosition).not.toHaveBeenCalled()
      });
    });
  })

  describe('when processing has successfully completed', () => {
    beforeEach(() => {
      renderComponent({status: STATUSES.completed, position: fulfilledPosition})
    })

    it("renders proper status message and doesn't call buildPosition service", async () => {
      await waitFor(() => {
        expect(screen.getByText('Completed')).toBeInTheDocument();
        expect(buildPosition).not.toHaveBeenCalled()
      });
    });

    it('renders position data', () => {
      // Total USD value (No Fees):
      expect(screen.getByText('$20500.27')).toBeInTheDocument();
        // Position has WETH
      expect(screen.getByText('6.252150962732637')).toBeInTheDocument();
      expect(screen.getByText('($11823.19) - 57.67%')).toBeInTheDocument();
      // Position has ARB
      expect(screen.getByText('7917.044869547772')).toBeInTheDocument();
      expect(screen.getByText('($8677.08) - 42.33%')).toBeInTheDocument();

      // With hold strategy current USD amounts would be ->
      expect(screen.getByText('$26.85')).toBeInTheDocument(); // WETH
      expect(screen.getByText('$21396.62')).toBeInTheDocument(); // ARB
      expect(screen.getByText('$21423.47')).toBeInTheDocument(); // Total

      // Final result
      expect(screen.getByText('$-515.20')).toBeInTheDocument(); // Total Profit considering IL
      expect(screen.getByText('-2.4048%')).toBeInTheDocument(); // Total Profit %
    })
  })

  describe('with completion callback', () => {
    const completionCallback = jest.fn();

    describe("when processing iteration finishes with 'Completed' status", () => {
      it('fires provided callback', async () => {
        renderComponent({status: STATUSES.analyzeHistory, completionCallback })
        await waitFor(() => {
          expect(screen.getByText('Completed')).toBeInTheDocument();
          expect(completionCallback).toHaveBeenCalledTimes(1)
          expect(completionCallback).toHaveBeenCalledWith(position)
        });
      })
    });

    describe("when processing iteration finishes with not 'Completed' status", () => {
      beforeEach(() => {
        buildPosition.mockImplementation(async (position, status) => (
          Promise.resolve({ position, status })
        ))
        completionCallback.mockClear()
      })

      it("doesn't fire provided callback", async () => {
        renderComponent({status: STATUSES.analyzeHistory, completionCallback })
        await waitFor(() => {
          expect(completionCallback).not.toHaveBeenCalled()
        });
      })
    });
  })
});
