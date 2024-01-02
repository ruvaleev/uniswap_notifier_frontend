import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import TokenIcon from '__components/TokenIcon';

describe('TokenIcon', () => {
  const name = 'WETH'

  describe('when icon exists', () => {
    it('renders found icon', async () => {
      const { getByTestId } = render(<TokenIcon name={name}/>);

      let image;
      await waitFor(() => {
        image = getByTestId(name);
        expect(image).toHaveAttribute('src', 'test-file-stub');
      });
    });
  })

  describe("when icon doesn't exist", () => {
    beforeEach(() => {
      jest.mock('__assets/icons/coins/weth.png', () => {
        throw new Error('Failed to load')
      });
    })

    it('renders default icon with provided token name', async () => {
      render(<TokenIcon name={name}/>);

      let component;
      await waitFor(() => {
        component = screen.getByText(name)
        expect(component).toBeInTheDocument();
      });
    })
  })
});
