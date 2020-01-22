import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Voting from './components/voting.component';
import Leaderboard from './components/leaderboard.component';
import MenuBar from './components/menubar'

function App() {
  return (
      <>
        <MenuBar />
        <div className="container">
            <Switch>
                <Route exact path='/' component={ Voting } />
                <Route path='/leaderboard' render={(props) => <Leaderboard {...props} top="20" />} />
            </Switch>
        </div>
      </>
  );
}

//=====================

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
