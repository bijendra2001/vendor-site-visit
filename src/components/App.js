
import VendorView from '../vendor/VendorView';
import { Route,Switch } from 'react-router-dom';
import RenderForAuthenticated from '../authenticate/RenderForAuthenticate';
import React from 'react';

function App() {

  const Error=()=>{
    return<h1>Opps page not found !!</h1>;
  };

  return (  
        <Switch>
          <Route exact path='/vendor' component={VendorView}/>  
          <Route path="/analyst" component={RenderForAuthenticated}/>
          <Route component={Error}/>
        </Switch>
  );
}

export default App;
