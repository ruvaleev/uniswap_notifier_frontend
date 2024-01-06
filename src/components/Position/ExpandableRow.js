import React, { createRef } from 'react';
import PropTypes from 'prop-types';

import ExpandButton from '__components/buttons/ExpandButton';
import Row from './Row';

const ExpandableRow = ({ title, value, children, isExpandable = true }) => {
  const ref = createRef();

  return (
    isExpandable
    ?
      <div className='mb-3'>
        <ExpandButton
          relRef={ref}
          buttonTitle={<Row title={title} value={value}/>}
          color='#a1fa4e'
          iconClassNames='mr-minus-4'
        />
        <div ref={ref}>
          {children}
        </div>
      </div>
    : <Row title={title} value={value} classNames='mb-3'/>
  )
}

export default ExpandableRow;

ExpandableRow.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
  isExpandable: PropTypes.bool,
}

