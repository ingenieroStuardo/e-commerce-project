import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withAlert } from 'react-alert';

import { GlobalStyle } from './global-styles';

import Header from './components/header/header-component';
import Spinner from './components/spinner/spinner-component';
import ErrorBoundary from './components/error-boundary/error-boundary-component';

import { selectCurrentUser } from './redux/user/user-selector';
import { checkUserSession } from './redux/user/user-actions';

const HomePage = lazy(() => import('./pages/homepage/home-component'));
const ShopPage = lazy(() => import('./pages/shop/shop-component'));
const SignInAndOutPage = lazy(() =>
  import('./pages/sign-in-and-up/sign-in-and-up-component')
);
const CheckoutPage = lazy(() => import('./pages/checkout/checkout-component'));

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route
              exact
              path='/signin'
              render={() =>
                currentUser ? <Redirect to='/' /> : <SignInAndOutPage />
              }
            />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default withAlert()(connect(mapStateToProps, mapDispatchToProps)(App));
