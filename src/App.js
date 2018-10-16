import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Categories from './dashboard/Categories';
import Posts from './dashboard/Posts';
import Comments from './dashboard/Comments';
import Users from './dashboard/Users';
import MainPage from './MainPage';

// DON NOT EDIT THIS FILE!!
// Only Edit files in dashboard folder, and MainPage.jsx
class App extends Component {
  render() {
    return (
      <Router>
          <div>
            <Route exact path="/" component={MainPage}/> 
            <Route path="/categories" component={Categories}/> 
            <Route path="/posts" component={Posts}/> 
            <Route path="/comments" component={Comments}/> 
            <Route path="/users" component={Users}/> 
          </div>
      </Router>
    );
  }
}

export default App;
