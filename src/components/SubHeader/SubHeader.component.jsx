import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './SubHeader.component.scss';

const SubHeader = ({ title, breadCrumbs }) => (
  <div className="subHeader-component">
    {breadCrumbs.map(breadCrumb => (
      <Link key={breadCrumb.routePath} to={breadCrumb.routePath}>
        <label>{breadCrumb.title}</label>
      </Link>
    ))}
    <label> · {title}</label>
  </div>
);

SubHeader.propTypes = {
  title: PropTypes.string.isRequired,
  breadCrumbs: PropTypes.array,
};
SubHeader.defaultProps = {
  breadCrumbs: [],
};

export default SubHeader;
