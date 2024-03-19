import React from 'react';
import PropTypes from 'prop-types';

import Telegram from '__assets/icons/Telegram';

const BlueTgButton = ({ text, href, addClassName }) => (
  <a
    className={
      `flex items-center border-blue btn cursor-pointer primary px-4 py-2
        rounded-xl text-base text-blue text-center ${addClassName}`
    }
    target='_blank'
    href={href} rel="noreferrer"
  >
    <span className='mr-2'>
      <Telegram/>
    </span>
    {text}
  </a>
)

export default BlueTgButton;

BlueTgButton.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  addClassName: PropTypes.string,
};
