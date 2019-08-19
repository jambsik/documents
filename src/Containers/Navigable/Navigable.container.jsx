import React from 'react';
import PropTypes from 'prop-types';

import './Navigable.container.scss';
import NavigableButton from '../../components/NavigableButton/NavigableButton.component';

const Navigable = ({ title, subTitle, routePath, buttonTitle }) => (
  <div className="navigable-container">
    <span className="navigable-container__logo">{title}</span>
    <h2>{subTitle}</h2>
    <div className="navigable-container__actions">
      <NavigableButton routePath={routePath} label={buttonTitle} />
    </div>
  </div>
);

Navigable.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  routePath: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
};
Navigable.defaultProps = {
  subTitle: '',
};

export default Navigable;
