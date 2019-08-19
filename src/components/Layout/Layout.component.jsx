import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header/Header.component';

import './Layout.component.scss';

const Layout = ({ children, title }) => (
  <div className={`layout-component`}>
    <Header title={title} />
    <div className="layout-component__content">{children}</div>
  </div>
);

Layout.propTypes = {
  title: PropTypes.string.isRequired,
};
Layout.defaultProps = {};

export default Layout;
