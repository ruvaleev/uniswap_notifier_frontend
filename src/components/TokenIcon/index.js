import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const WhiteSquare = ({ classNames, children }) => (
  <div className={`bg-white flex rounded-xl items-center h-16 justify-center text-black w-16 ${classNames}`}>
    {children}
  </div>
)

const TokenIcon = ({ name, classNames = '' }) => {
  const [iconSrc, setIconSrc] = useState();

  useEffect(() => {
    import(`__assets/icons/coins/${name.toLowerCase()}.png`)
      .then(image => {
        setIconSrc(image.default);
      })
      .catch(() => null)
  }, [name]);

  return <WhiteSquare classNames={classNames}>
    {
      iconSrc
      ? <img src={iconSrc} alt={name} data-testid={name}/>
      : <span data-testid={name}>{name}</span>
    }
  </WhiteSquare>
};


export default TokenIcon;

WhiteSquare.propTypes = {
  classNames: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string])
};

TokenIcon.propTypes = {
  name: PropTypes.string.isRequired,
  classNames: PropTypes.string
};
