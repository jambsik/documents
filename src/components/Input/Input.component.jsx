import React from 'react';
import PropTypes from 'prop-types';

import './Input.component.scss';

const Input = ({ label, ...restProps }) => (
  <div className="input-component">
    <span>{label}</span>
    <input className="input-component__field" {...restProps} />
  </div>
);

Input.propTypes = {
  label: PropTypes.string,
};
Input.defaultProps = {
  label: '',
};

export default Input;
