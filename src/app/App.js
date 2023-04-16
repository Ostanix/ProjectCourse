import React from 'react';
import NavBar from '../app/layouts/navBar';
import { Route } from 'react-router-dom';
import Main from '../app/layouts/main.jsx';
import Login from '../app/layouts/login.jsx';
import { Switch } from 'react-router-dom';
import AllUsersList from './layouts/allUsersList';

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        {' '}
        <Route path='/' exact component={Main} />
        <Route path='/login' component={Login} />
        <Route path='/users/:userID?' component={AllUsersList} />
      </Switch>
    </div>
  );
}

export default App;
