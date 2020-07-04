import React from 'react';
import {Switch} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Landing from '../Landing/Lnding';
import Login from '../Login/Login';

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
      </Switch>
    </div>
  );
}

export default App;
