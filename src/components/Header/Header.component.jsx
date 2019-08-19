import React from 'react';
import PropTypes from 'prop-types';

import './Header.component.scss';

const Header = ({ title }) => (
  <div className={`header-component`}>
    <span>{title}</span>
  </div>
);

Header.propTypes = {
  title: PropTypes.string,
};
Header.defaultProps = {
  title: '',
};

export default Header;
