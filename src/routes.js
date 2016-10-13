import React from 'react';
import {IndexRedirect, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Registration,
    Widgets,
    Login,
    Home,
    TodoList,
    LoginSuccess,
    Survey,
    NotFound,
  } from 'containers';

export default (store, token) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState()) && token) {
      store.dispatch(loadAuth())
        .then(checkAuth)
        .catch(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRedirect to="login"/>

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="register" component={Registration}/>
        <Route path="todo" component={TodoList}/>
        <Route path="home" component={Home}/>
        <Route path="loginSuccess" component={LoginSuccess}/>
      </Route>

      { /* Routes */ }
      <Route path="login" component={Login}/>
      <Route path="survey" component={Survey}/>
      <Route path="widgets" component={Widgets}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
