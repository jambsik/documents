import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './DocumentReader.scss';

const DocumentReader = ({ className, document, children, showImage }) => (
  <div className={`${className} document-reader`}>
    {document && (
      <Fragment>
        {showImage && <i className="document-reader__image fas fa-signature" />}
        <label title={document.title}>{document.title}</label>
        <label title={document.type}>{document.type}</label>
        <label title={document.created_at}>{document.created_at}</label>
        <label title={document.text}>{document.text}</label>
        {children}
      </Fragment>
    )}
  </div>
);

DocumentReader.propTypes = {
  className: PropTypes.string,
  document: PropTypes.object,
  children: PropTypes.node,
  showImage: PropTypes.bool,
};
DocumentReader.defaultProps = {
  showImage: false,
  className: '',
};

export default DocumentReader;
