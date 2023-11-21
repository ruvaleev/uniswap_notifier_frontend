import React from 'react';
import { render, screen } from '@testing-library/react';

import ErrorsList from '__components/ErrorsList';

describe('ErrorsList', () => {
  const errors = ['error 1', 'error 2']

  beforeEach(() => {
    render(<ErrorsList errors={errors}/>)
  });

  it('renders all of provided errors', () => {
    errors.forEach((error) => {
      expect(screen.getByText(error)).toBeInTheDocument();
    })
  })
});
