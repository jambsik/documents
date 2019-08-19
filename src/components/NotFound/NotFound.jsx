import React from 'react';

import applicationTexts from '../../helpers/applicationTexts';
import Navigable from '../../Containers/Navigable/Navigable.container';
import { PATH_OF_ROUTES } from '../../helpers/routes';

const NotFound = () => (
  <Navigable
    title={applicationTexts.application.company}
    subTitle={applicationTexts.notFound.title}
    routePath={PATH_OF_ROUTES.BASE_URL}
    buttonTitle={applicationTexts.notFound.goToHome}
  />
);

NotFound.propTypes = {};
NotFound.defaultProps = {};

export default NotFound;
