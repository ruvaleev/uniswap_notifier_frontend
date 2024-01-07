import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Arrow from '__assets/icons/Arrow';

const ExpandButton = ({ buttonTitle, relRef, color = '#737db2', iconClassNames = '' }) => {
  const [isShown, setIsShown] = useState(false);

  const toggleIsShown = () => setIsShown(!isShown)

  useEffect(() => {
    const content = relRef.current
    if(content) {
      content.classList.add('expandable-container')
    }
  }, [])

  useEffect(() => {
    const content = relRef.current
    if (!content) { return }

    isShown
      ? content.classList.add('expanded')
      : content.classList.remove('expanded')
  }, [isShown])


  return (
    <>
      <a onClick={toggleIsShown} className='cursor-pointer flex items-center w-full'>
        {buttonTitle}
        <div className={iconClassNames}>
          <Arrow rotateAngle={isShown ? 90 : 0} color={color}/>
        </div>
      </a>
    </>
  )
}

export default ExpandButton;

ExpandButton.propTypes = {
  buttonTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  relRef: PropTypes.object.isRequired,
  color: PropTypes.string,
  iconClassNames: PropTypes.string,
}
