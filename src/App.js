import React, { Component } from 'react';
import './App.css';
import ProjectForm from './Components/Page/ProjectForm';
import { BrowserRouter as Router , Route, Link,Switch } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <div>
        <Router>
           <Switch>
             <Route exact path="/" component={ ProjectForm } />
           </Switch>
        </Router>

      </div>
    );
  }
}

export default App;
