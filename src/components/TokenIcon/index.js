import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const WhiteSquare = ({ children }) => (
  <div className='bg-white flex rounded-xl items-center h-16 justify-center text-black w-16'>
    {children}
  </div>
)

const TokenIcon = ({ name }) => {
  const [iconSrc, setIconSrc] = useState();

  useEffect(() => {
    import(`__assets/icons/coins/${name.toLowerCase()}.png`)
      .then(image => {
        setIconSrc(image.default);
      })
      .catch(() => null)
  }, [name]);

  return <WhiteSquare>
    {
      iconSrc
      ? <img src={iconSrc} alt={name} data-testid={name}/>
      : <span data-testid={name}>{name}</span>
    }
  </WhiteSquare>
};


export default TokenIcon;

WhiteSquare.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string])
};

TokenIcon.propTypes = {
  name: PropTypes.string.isRequired
};
