import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Arrow from '__assets/icons/Arrow';

const ExpandButton = ({ buttonTitle, relRef }) => {
  const [isShown, setIsShown] = useState(false);

  const toggleIsShown = () => setIsShown(!isShown)

  useEffect(() => {
    const content = relRef.current
    if(content) {
      content.className = `expandable-container ${isShown && 'expanded'}`
    }
  }, [isShown])


  return (
    <>
      <a onClick={toggleIsShown} className='flex items-center'>
        {buttonTitle}
        <Arrow rotateAngle={isShown ? 90 : 0}/>
      </a>
    </>
  )
}

export default ExpandButton;

ExpandButton.propTypes = {
  buttonTitle: PropTypes.string,
  relRef: PropTypes.object.isRequired
}
