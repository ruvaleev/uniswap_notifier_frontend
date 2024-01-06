import React from 'react';
import PropTypes from 'prop-types';

import moneyFormat from '__helpers/moneyFormat';
import Scale from '__components/Scale';
import ScaleLabel from './ScaleLabel';

const EarnedWidget = ({ earnedFees, maxIl }) => {
  const relativeValue = (earnedFees >= maxIl) ? earnedFees : (100 * earnedFees / maxIl)
  return (
    <div className="flex flex-col grid-item justify-center">
      <Scale value={relativeValue} scaleClassNames='mb-4 min-width-80' valueClassNames='bg-green'/>
      <ScaleLabel value={moneyFormat(earnedFees)} title='Fees Earned' textStyle='text-green'/>
    </div>
  )
};

export default EarnedWidget;

EarnedWidget.propTypes = {
  earnedFees: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
  maxIl: PropTypes.number.isRequired
}
