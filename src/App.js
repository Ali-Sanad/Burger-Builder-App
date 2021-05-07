import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import React, { useEffect, useState, Suspense } from "react";
import { connect } from "react-redux";
// import asyncComponent from "./hoc/asyncComponent/asyncComponent";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import Spinner from "./components/UI/Spinner/Spinner";
import * as allActions from "./store/actions/index";
const App = (props) => {
  /**********render********* */
  const [show, setShow] = useState(true); ////this state for display spinner at the beginning of the app.

  const { onTryAutoSignup } = props;

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 1000);

    onTryAutoSignup();
  }, [onTryAutoSignup]);

  //lazy loading
  const Checkout = React.lazy(() => {
    return import("./containers/Checkout/Checkout");
  });

  const Orders = React.lazy(() => {
    return import("./containers/Orders/Orders");
  });

  const Auth = React.lazy(() => {
    return import("./containers/Auth/Auth");
  });

  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/orders" render={(props) => <Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return show ? (
    <Spinner />
  ) : (
    <Layout>
      <Suspense fallback={<Spinner />}> {routes}</Suspense>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(allActions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
