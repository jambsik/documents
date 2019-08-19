import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SubHeader from '../../components/SubHeader/SubHeader.component';
import applicationTexts from '../../helpers/applicationTexts.json';
import NavigableButton from '../../components/NavigableButton/NavigableButton.component';

import {
  documentGetData,
  documentSetListData,
  documentSetListPage,
  documentSetListType,
  onDeleteDocument,
} from './store/Document.actions';
import {
  getDocumentListPage,
  getDocumentsData,
  getDocumentTypeFilter,
  isDeleted,
  isDisabledBackward,
  isDisabledForward,
  isEmptyData,
} from './store/Document.reducer';

import { PATH_OF_ROUTES } from '../../helpers/routes';
import { DOCUMENT_TYPES_LIST, PAGINATION } from './helpers/constants';

import List from '../../components/List/List.component';
import EmptyContainer from '../../components/EmptyContainer/EmptyContainer.component';
import DocumentReader from './components/DocumentReader';

import './DocumentList.page.scss';

class DocumentListPage extends PureComponent {
  breadCrumbs = [
    {
      title: applicationTexts.pages.home,
      routePath: PATH_OF_ROUTES.BASE_URL,
    },
  ];

  static getTemplate({
    isDeleted,
    isEmptyData,
    documentsList,
    onDeleteDocument,
  }) {
    let template = isEmptyData ? (
      <EmptyContainer label={applicationTexts.common.noMoreData} />
    ) : (
      <List items={documentsList}>
        {document => (
          <DocumentReader document={document}>
            <section>
              <i
                className="fas fa-trash-alt"
                onClick={onDeleteDocument.bind(this, document)}
              />

              <Link to={`${PATH_OF_ROUTES.DOCUMENTS}/${document.id}`}>
                <i className="fas fa-eye" />
              </Link>
            </section>
          </DocumentReader>
        )}
      </List>
    );

    if (!isDeleted) {
      template = (
        <EmptyContainer label={applicationTexts.common.deletingElements} />
      );
    }

    return template;
  }
  constructor(props) {
    super(props);

    this.getData = this.getData.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.updatePagePage = this.updatePagePage.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }

  componentDidMount() {
    const { getData } = this;
    const { documentsTypeFilter, pageList } = this.props;

    getData({
      type: documentsTypeFilter,
      page: pageList,
    });
  }

  getData({ type, page }) {
    const { documentGetData, documentsTypeFilter, pageList } = this.props;

    documentGetData({
      type: type || documentsTypeFilter,
      page: page || pageList,
      limit: PAGINATION.LIMIT,
    });
  }

  onChangeType(ev) {
    const { documentSetListType } = this.props;
    const { updatePagePage } = this;

    const type = ev.target.value;

    documentSetListType(type);
    updatePagePage(PAGINATION.DEFAULT_PAGE, type);
  }

  updatePagePage(page, type) {
    const { documentSetListPage } = this.props;
    const { getData } = this;

    documentSetListPage(page);
    getData({
      page,
      type,
    });
  }

  increase() {
    const { isDisabledForward } = this.props;

    if (!isDisabledForward) {
      const { pageList } = this.props;
      const { updatePagePage } = this;

      updatePagePage(pageList + 1);
    }
  }

  decrease() {
    const { isDisabledBackward } = this.props;

    if (!isDisabledBackward) {
      const { pageList } = this.props;
      const { updatePagePage } = this;

      updatePagePage(pageList - 1);
    }
  }

  render() {
    const { breadCrumbs, onChangeType, increase, decrease } = this;
    const {
      documentsList,
      documentsTypeFilter,
      isEmptyData,
      isDeleted,
      isDisabledBackward,
      isDisabledForward,
      onDeleteDocument,
      pageList,
    } = this.props;

    return (
      <Fragment>
        <SubHeader
          breadCrumbs={breadCrumbs}
          title={applicationTexts.documents.list.title}
        />
        <div className="documents-list">
          <div className="documents-list__filters">
            <select value={documentsTypeFilter} onChange={onChangeType}>
              {DOCUMENT_TYPES_LIST.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <NavigableButton
              routePath={PATH_OF_ROUTES.CREATE_DOCUMENT}
              label={applicationTexts.documents.list.addNewDocument}
            />
          </div>
          <div className="documents-list__content">
            <div className="documents-list__content--magnitude">
              {DocumentListPage.getTemplate({
                isDeleted,
                isEmptyData,
                documentsList,
                onDeleteDocument,
              })}
            </div>
            <div className="documents-list__footer">
              <span>
                {applicationTexts.common.page}: {pageList}
              </span>
              <i
                onClick={decrease}
                className={`documents-list__actions ${
                  isDisabledBackward
                    ? 'documents-list--icon-disabled'
                    : 'documents-list--icon-enabled'
                } fas fa-backward`}
              />
              <i
                onClick={increase}
                className={`documents-list__actions ${
                  isDisabledForward
                    ? 'documents-list--icon-disabled'
                    : 'documents-list--icon-enabled'
                } fas fa-forward`}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

DocumentListPage.propTypes = {};
DocumentListPage.defaultProps = {};

const mapStateToProps = state => ({
  documentsTypeFilter: getDocumentTypeFilter(state),
  documentsList: getDocumentsData(state),
  isEmptyData: isEmptyData(state),
  isDeleted: isDeleted(state),
  isDisabledBackward: isDisabledBackward(state),
  isDisabledForward: isDisabledForward(state),
  pageList: getDocumentListPage(state),
});

export default connect(
  mapStateToProps,
  {
    documentSetListPage,
    documentSetListType,
    documentSetListData,
    documentGetData,
    onDeleteDocument,
  }
)(DocumentListPage);
