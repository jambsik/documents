import React from 'react';

import applicationTexts from '../../helpers/applicationTexts.json';

import { PATH_OF_ROUTES } from '../../helpers/routes';
import Navigable from '../../Containers/Navigable/Navigable.container';

import './Home.scss';

const Home = () => (
  <div className="home">
    <Navigable
      title={applicationTexts.application.company}
      subTitle={applicationTexts.home.subTitle}
      routePath={PATH_OF_ROUTES.DOCUMENTS}
      buttonTitle={applicationTexts.home.accessToYourDocuments}
    />
  </div>
);

Home.propTypes = {};
Home.defaultProps = {};

export default Home;
