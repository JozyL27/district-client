import React from 'react';
import {Switch} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Landing from '../Landing/Lnding';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route 
        exact
        path='/'
        component={Landing}
        />
        <Route 
        exact
        path='/login'
        component={Login}
        />
        <Route 
        exact
        path='/signup'
        component={SignUp}
        />
      </Switch>
    </div>
  );
}

export default App;
