import React from 'react';
import PropTypes from 'prop-types';

import { DOCUMENT_TYPES } from '../helpers/constants';
import Card from '../../../components/Card/Card.component';

import './DocumentLayoutForm.scss';
import {
  createAdvanceTemplate,
  createCustomTemplate,
  createSimpleTemplate,
} from '../helpers/documentHelper';

const DocumentLayoutForm = props => (
  <div className="document-layout-form">
    <Card className="document-layout-form__card">{getTemplate(props)}</Card>
  </div>
);

const getTemplate = props => {
  const { type } = props;

  switch (type) {
    case DOCUMENT_TYPES.CUSTOM:
      return createCustomTemplate(props);
    case DOCUMENT_TYPES.ADVANCED:
      return createAdvanceTemplate(props);
    default:
      return createSimpleTemplate(props);
  }
};

DocumentLayoutForm.propTypes = {
  type: PropTypes.string.isRequired,
  footer: PropTypes.func,
  header: PropTypes.func,
  setForm: PropTypes.func.isRequired,
};
DocumentLayoutForm.defaultProps = {
  footer: () => {},
  header: () => {},
};

export default DocumentLayoutForm;
