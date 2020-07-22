import React from 'react'
import {Switch} from 'react-router-dom'
import {Route} from 'react-router-dom'
import Landing from '../Landing/Landing'
import SignupPage from '../../Routes/SignupPage/SignupPage'
import LoginPage from '../../Routes/LoginPage/LoginPage'
import Header from '../Header/Header'
import Main from '../Main/Main'
import NotFoundPage from '../../Routes/NotFoundPage/NotFoundPage'
import Explore from '../Explore/Explore'

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
        <Route 
        exact
        path='/main'
        component={Main}
        />
        <Route 
        exact
        path='/explore'
        component={Explore}
        />
        <Route 
        component={NotFoundPage}
        />
      </Switch>
    </div>
  );
}

export default App;
