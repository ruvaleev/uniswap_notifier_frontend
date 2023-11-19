import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ title, value, addition }) => (
  <div className="grid-item">
    <span className="secondary text-base mr-1">{title}</span>
    <span className="primary text-base mr-1">{value}</span>
    <span className="secondary text-base">{addition}</span>
  </div>
)

export default Row;

Row.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  addition: PropTypes.string,
}
