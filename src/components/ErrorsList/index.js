import React from 'react';
import PropTypes from 'prop-types';

const ErrorsList = ({ errors }) => (
  errors.map((error, index) => <Error key={index} error={error} />)
)

const Error = ({ error }) => <div>{error}</div>

export default ErrorsList;

ErrorsList.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Error.propTypes = {
  error: PropTypes.string.isRequired,
};
