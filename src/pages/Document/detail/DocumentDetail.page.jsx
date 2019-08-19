import React, { Fragment, PureComponent } from 'react';

import { getDocumentDetail } from '../../../API';
import { HttpStatusCode } from '../../../helpers/httpStatusCode';
import { toastr } from 'react-redux-toastr';
import applicationTexts from '../../../helpers/applicationTexts';
import DocumentReader from '../components/DocumentReader';
import EmptyContainer from '../../../components/EmptyContainer/EmptyContainer.component';
import SubHeader from '../../../components/SubHeader/SubHeader.component';
import Card from '../../../components/Card/Card.component';

import './DocumentDetail.page.scss';
import { PATH_OF_ROUTES } from '../../../helpers/routes';

class DocumentDetailPage extends PureComponent {
  breadCrumbs = [
    {
      title: applicationTexts.pages.documents,
      routePath: PATH_OF_ROUTES.DOCUMENTS,
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      document: null,
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await getDocumentDetail({ id });

    if (response.status === HttpStatusCode.OK) {
      this.setState({ document: response.data });
      return;
    }

    toastr.error(applicationTexts.errors.errorContentNotBeLoaded);
  }

  render() {
    const { breadCrumbs } = this;
    const { document } = this.state;

    return (
      <Fragment>
        <SubHeader
          breadCrumbs={breadCrumbs}
          title={`${applicationTexts.documents.detail.title}`}
        />
        {!document ? (
          <EmptyContainer label={applicationTexts.common.loading} />
        ) : (
          <div className="document-detail">
            <Card className="document-detail__card-content">
              <DocumentReader
                className="document-detail__card-content--document-align"
                document={document}
                showImage={true}
              />
            </Card>
          </div>
        )}
      </Fragment>
    );
  }
}

DocumentDetailPage.propTypes = {};
DocumentDetailPage.defaultProps = {};

export default DocumentDetailPage;
