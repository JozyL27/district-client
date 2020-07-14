import React from 'react';
import {Switch} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Landing from '../Landing/Landing';
import Login from '../Login/Login';
// import SignUp from '../SignUp/SignUp';
import SignupPage from '../../Routes/SignupPage/SignupPage'

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
        component={SignupPage}
        />
      </Switch>
    </div>
  );
}

export default App;
