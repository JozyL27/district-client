import React from 'react';
import {Switch} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Landing from '../Landing/Lnding';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route 
        exact
        path='/'
        component={Landing}
        />
      </Switch>
    </div>
  );
}

export default App;
