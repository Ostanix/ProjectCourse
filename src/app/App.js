import React from 'react';
import NavBar from './components/navBar';
import { Route, Switch, Redirect } from 'react-router-dom';

import Main from '../app/layouts/main.jsx';
import Login from '../app/layouts/login.jsx';
import AllUsersList from './layouts/allUsersList';

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        {' '}
        <Route path='/users/:userID?' component={AllUsersList} />
        <Route path='/login' component={Login} />
        <Route path='/' exact component={Main} />
        <Redirect to='/' />
      </Switch>
    </div>
  );
}

export default App;
