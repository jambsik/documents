import React from 'react';
import PropTypes from 'prop-types';

import './EmptyContainer.component.scss';

const EmptyContainer = ({ label }) => (
  <div className="empty-container-component">
    <i className="fas fa-signature" />
    <span>{label}</span>
  </div>
);

EmptyContainer.propTypes = {
  label: PropTypes.string,
};
EmptyContainer.defaultProps = {
  label: '',
};

export default EmptyContainer;
