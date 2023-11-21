import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { fireEvent, render, screen } from '@testing-library/react';

import ExpandButton from '__components/buttons/ExpandButton';

const RelatedComponent = ({ refProp }) => (
  <div ref={refProp} data-testid='relatedComponent'>Child is here</div>
)

RelatedComponent.propTypes = {
  refProp: PropTypes.object.isRequired,
}

describe('ExpandButton', () => {
  const buttonTitle = 'Click me'
  const refProp = createRef();

  beforeEach(() => {
    render(
      <>
        <ExpandButton buttonTitle={buttonTitle} relRef={refProp}/>
        <RelatedComponent refProp={refProp}/>
      </>
    )
  })

  it('renders button with correct title and expand/collapses related content by click on it', () => {
    const button = screen.getByText(buttonTitle)
    const relatedComponent = screen.getByTestId('relatedComponent')

    expect(relatedComponent).toHaveClass('expandable-container')
    expect(relatedComponent).not.toHaveClass('expanded')

    fireEvent.click(button);

    expect(relatedComponent).toHaveClass('expanded')

    fireEvent.click(button);

    expect(relatedComponent).not.toHaveClass('expanded')
  })
});
