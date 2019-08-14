import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './index.css';
// import { createSecureContext } from 'tls';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import "bootstrap/dist/css/bootstrap.min.css";

import Voting from './components/voting.component';
import Leaderboard from './components/leaderboard.component';

var data = require('./videoList.json');


function MenuBar(props) {
  return (
    <Navbar collapseOnSelect expand="sm" bg="primary" variant="dark" fixed="top">
    <Navbar.Brand href="/">Jake & Amir Ranked</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">

    <Nav className="mr-auto">
      <Link to={'/'} className="nav-link">Vote</Link>
      <Link to={'/leaderboard'} className="nav-link">Leaderboard</Link>
    </Nav>

    </Navbar.Collapse>
  </Navbar>
  );
}


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {videos: data.videos};
  }

  render () {
  return (
    <Router>
      <MenuBar />
      <div className="container">

          <Switch>
              <Route exact path='/' component={ Voting } />
              <Route path='/leaderboard' render={(props) => <Leaderboard {...props} top="20" />} />
          </Switch>

      </div>
    </Router>
  );
  }
}

//=====================

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
