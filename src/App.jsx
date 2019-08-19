import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';

import store from './configureStore';
import Layout from './components/Layout/Layout.component';
import applicationTexts from './helpers/applicationTexts.json';
import { routes } from './helpers/routes';

const history = createBrowserHistory();

const App = () => (
  <Provider store={store}>
    <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      preventDuplicates
      position="bottom-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick
    />
    <Layout className="App" title={applicationTexts.application.title}>
      <Router history={history}>
        <Switch>
          {routes.map((props, index) => (
            <Route key={props.path | index} {...props} />
          ))}
        </Switch>
      </Router>
    </Layout>
  </Provider>
);

App.propTypes = {};
App.defaultProps = {};

export default App;
