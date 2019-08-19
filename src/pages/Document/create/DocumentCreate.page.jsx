import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SubHeader from '../../../components/SubHeader/SubHeader.component';
import applicationTexts from '../../../helpers/applicationTexts';
import Card from '../../../components/Card/Card.component';
import { DOCUMENT_TYPES_LIST_FOR_CREATE } from '../helpers/constants';
import {
  getDocumentFormValues,
  getDocumentTypeForCreate,
} from '../store/Document.reducer';
import {
  documentCreateClearAll,
  documentCreateSetForm,
  documentCreateSetType,
  documentSaveForm,
} from '../store/Document.actions';
import DocumentLayoutForm from '../components/DocumentLayoutForm';
import Button from '../../../components/Button/Button.component';

import './DocumentCreate.page.scss';
import { onSaveForm } from '../helpers/documentHelper';
import { PATH_OF_ROUTES } from '../../../helpers/routes';

class DocumentCreatePage extends PureComponent {
  breadcrumbs = [
    {
      title: applicationTexts.pages.documents,
      routePath: PATH_OF_ROUTES.DOCUMENTS,
    },
  ];

  static footerActions({ documentCreateClearAll, ...props }) {
    return (
      <div className="document-create__actions">
        <Button
          label={applicationTexts.documents.create.form.cancel}
          onClick={documentCreateClearAll}
        />
        <Button
          className="document-create__actions--margin"
          onClick={onSaveForm.bind(null, props)}
          label={applicationTexts.documents.create.form.save}
        />
      </div>
    );
  }

  componentWillUnmount() {
    const { documentCreateClearAll } = this.props;
    documentCreateClearAll();
  }

  render() {
    const { breadcrumbs } = this;
    const {
      documentFormValues,
      documentTypeToCreate,
      documentCreateSetType,
      documentCreateClearAll,
      documentCreateSetForm,
      documentSaveForm,
    } = this.props;
    return (
      <div className="document-create">
        {documentTypeToCreate ? (
          <Fragment>
            <SubHeader
              title={`${applicationTexts.documents.create.title}: ${documentTypeToCreate}`}
            />
            <DocumentLayoutForm
              type={documentTypeToCreate}
              footer={DocumentCreatePage.footerActions.bind(null, {
                documentSaveForm,
                documentFormValues,
                documentTypeToCreate,
                documentCreateClearAll,
              })}
              setForm={documentCreateSetForm}
            />
          </Fragment>
        ) : (
          <Fragment>
            <SubHeader
              breadCrumbs={breadcrumbs}
              title={`${applicationTexts.documents.create.title}`}
            />
            <div className="document-create__content">
              <div className="document-create__grid">
                {DOCUMENT_TYPES_LIST_FOR_CREATE.map(documentType => (
                  <Card
                    key={documentType}
                    className={'document-create__grid--item'}
                    onClick={documentCreateSetType.bind(null, documentType)}
                  >
                    {documentType}
                  </Card>
                ))}
              </div>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

DocumentCreatePage.propTypes = {
  documentCreateClearAll: PropTypes.func.isRequired,
  documentCreateSetType: PropTypes.func.isRequired,
  documentCreateSetForm: PropTypes.func.isRequired,
  documentSaveForm: PropTypes.func.isRequired,
};
DocumentCreatePage.defaultProps = {};

const mapStateToProps = state => ({
  documentTypeToCreate: getDocumentTypeForCreate(state),
  documentFormValues: getDocumentFormValues(state),
});

export default connect(
  mapStateToProps,
  {
    documentCreateSetType,
    documentCreateClearAll,
    documentCreateSetForm,
    documentSaveForm,
  }
)(DocumentCreatePage);
