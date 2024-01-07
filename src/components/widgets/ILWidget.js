import React from 'react';
import PropTypes from 'prop-types';

import { PERCENT_PRECISION } from '__constants';
import moneyFormat from '__helpers/moneyFormat';
import Scale from '__components/Scale';
import ScaleLabel from './ScaleLabel';
import getPositionIL from '__services/getPositionIL';

const ILWidget = ({ position, maxIl }) => {
  const { percent, usd } = getPositionIL(position)
  const amountToDisplay = `${percent.toFixed(PERCENT_PRECISION)}% (${moneyFormat(usd)})`
  const relativeValue = (usd > 0) ? Math.round(100 * usd / maxIl) : 0

  return (
    <div className="flex flex-col grid-item justify-center">
      <ScaleLabel value={amountToDisplay} title='Impremanent Loss' textStyle='text-red'/>
      <Scale value={relativeValue} scaleClassNames='min-width-80' valueClassNames='bg-red'/>
    </div>
  )
};

export default ILWidget;

ILWidget.propTypes = {
  position: PropTypes.object.isRequired,
  maxIl: PropTypes.number.isRequired
}
