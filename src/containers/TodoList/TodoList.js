import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as todoActions from 'redux/modules/todo';
import TodoList from 'components/TodoList/TodoList';

@connect(state => ({
  todos: state.todo.todos
}), todoActions)
export default class TodoListApp extends Component {
  static propTypes = {
    addTodo: PropTypes.func,
    todos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired).isRequired
  }

  onTodoClick = () => {
    console.log('hello');
    return;
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
    const buttonStyle = {
      margin: '10px auto'
    };
    const formStyle = {
      maxWidth: '50%',
      margin: '0 auto'
    };
    const inputStyle = {
      margin: '0 auto',
      width: '50%'
    };
    const {todos} = this.props;
    return (
      <div className="container">
        <div className="row text-center">
          <h1>ToDo List Example from Dan Abramov</h1>
          <form style={formStyle} onSubmit={this.handleSubmit}>
            <input style={inputStyle} aria-describedby="todo-text-addon" type="text" ref="todoText" id="login-username" placeholder="Todo" className="form-control"/>
            <button type="submit" style={buttonStyle} className="btn btn-primary">
              Add Todo
            </button>
          </form>
        </div>
        <div className="row">
          <div style={formStyle}>
            <TodoList todos={todos} onTodoClick={this.onTodoClick}/>
          </div>
        </div>
      </div>
    );
  }
}
