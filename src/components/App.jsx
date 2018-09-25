import React from 'react';
import { hot } from 'react-hot-loader';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Router from '@/components/Router';

import store from '@/store';
import history from '@/store/history';

import '@/styles/main.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <>
            <Header />
            <main className="main">
              <Router />
            </main>
            <Footer />
          </>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default hot(module)(App);
