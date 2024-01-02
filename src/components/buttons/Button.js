import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ callback, children, classNames = '' }) => (
  <button
    className={`btn cursor-pointer primary px-4 py-2 rounded-xl text-base text-center ${classNames}`}
    onClick={callback}
  >
    {children}
  </button>
);

export default Button;

Button.propTypes = {
  callback: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
  classNames: PropTypes.string
};
