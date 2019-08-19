import React from 'react';
import PropTypes from 'prop-types';

import './Button.component.scss';

const Button = ({ label, className, ...restProps }) => (
  <button className={`button-component ${className}`} {...restProps}>
    {label}
  </button>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
};
Button.defaultProps = {};

export default Button;
