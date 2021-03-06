import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import RegisterPage from './containers/register/Register.page';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          {/*<Route exact path="/admin/signin" component={LoginPage}/>*/}
          <Route path="/admin/events/register/" component={RegisterPage} />
          <Redirect from="**" to="/admin/events/register/" />
        </Switch>
      </div>
    );
  }
}

export default App;
