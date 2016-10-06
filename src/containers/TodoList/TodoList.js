import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as todoActions from 'redux/modules/todo';

@connect(undefined, todoActions)
export default class TodoList extends Component {
  static propTypes = {
    addTodo: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const todoText = this.refs.todoText;
    if (!todoText.value.trim()) {
      return;
    }
    this.props.addTodo((new Date()).getTime(), todoText.value);
    todoText.value = '';
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>Login Success</h1>
          <form onSubmit={this.handleSubmit}>
            <input aria-describedby="todo-text-addon" type="text" ref="todoText" id="login-username" placeholder="Todo" className="form-control"/>
            <button type="submit">
              Add Todo
            </button>
          </form>
        </div>
      </div>
    );
  }
}
