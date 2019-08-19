import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card.component';

import './List.component.scss';

const List = ({ items, children }) => (
  <div className="list-component">
    {items.map(item => (
      <Card className="list-component__row" key={item.id}>
        {children(item)}
      </Card>
    ))}
  </div>
);

List.propTypes = {
  items: PropTypes.array,
  children: PropTypes.func,
};
List.defaultProps = {
  items: [],
  children: () => {},
};

export default List;
