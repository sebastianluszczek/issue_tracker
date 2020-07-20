import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import IssueList from './components/IssueList';
import Issue from './components/Issue';
import AddIssue from './components/AddIssue';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <a href="/issues" className="navbar-logo">
            IssueTracker
        </a>
          <div className="navbar-nav">
            <Link to={"/issues"} className="nav-link">
              Issues
            </Link>
            <Link to={"/add"} className="nav-link">
              Add Issue
            </Link>
          </div>
        </nav>

        <div className="container">
          <Switch>
            <Route exact path={["/", "/issues"]} component={IssueList} />
            <Route exact path="/add" component={AddIssue} />
            <Route path="/issues/:id" component={Issue} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
