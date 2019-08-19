import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import Button from '../Button/Button.component';

const NavigableButton = ({ label, routePath, ...restProps }) => (
  <Link to={routePath}>
    <Button label={label} {...restProps} />
  </Link>
);

NavigableButton.propTypes = {
  label: PropTypes.string.isRequired,
  routePath: PropTypes.string.isRequired,
};
NavigableButton.defaultProps = {};

export default NavigableButton;
