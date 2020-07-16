import React from 'react'
import {Switch} from 'react-router-dom'
import {Route} from 'react-router-dom'
import Landing from '../Landing/Landing'
import SignupPage from '../../Routes/SignupPage/SignupPage'
import LoginPage from '../../Routes/LoginPage/LoginPage'
import Header from '../Header/Header'

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route 
        exact
        path='/'
        component={Landing}
        />
        <Route 
        exact
        path='/login'
        component={LoginPage}
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
