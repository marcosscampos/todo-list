import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
// import * from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import TodosList from './components/todos-list.component'
import EditTodo from './components/edit-todo.component'
import CreateTodo from './components/create-todo.component'

import logo from './logo.svg'
class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a href="https://web.facebook.com/marcos.hanibal/" target="_blank" rel="noopener noreferrer" className="navbar-brand">
              <img src={logo} width="30" height="30" alt="Criador do aplicativo de To-do" />
            </a>
            <Link to="/" className="navbar-brand">Aplicativo para To-Dos</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Criar Todo</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Route path="/" exact component={TodosList} />
          <Route path="/edit/:id" exact component={EditTodo} />
          <Route path="/create" exact component={CreateTodo} />
        </div>
      </Router>
    )
  }
}
export default App;
