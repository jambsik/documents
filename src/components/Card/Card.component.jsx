import React from 'react';

import './Card.component.scss';

const Card = ({ children, className, onClick }) => (
  <div className={`card-component ${className}`} onClick={onClick}>
    <div className="card-component__content">{children}</div>
  </div>
);

Card.propTypes = {};
Card.defaultProps = {
  className: '',
};

export default Card;
