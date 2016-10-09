import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as todoActions from 'redux/modules/todo';
import TodoList from 'components/TodoList/TodoList';
const SHOW_ALL = 'SHOW_ALL';
const SHOW_COMPLETED = 'SHOW_COMPLETED';
const SHOW_ACTIVE = 'SHOW_ACTIVE';

const getVisibleTodoList = (state) => {
  switch (state.filter) {
    case SHOW_ALL:
      return state.todos;
    case SHOW_COMPLETED:
      return state.todos.filter((todo) => (todo.completed === true));
    case SHOW_ACTIVE:
      return state.todos.filter((todo) => (todo.completed === false));
    default:
      return state.todos;
  }
};

const getFilter = (filter) => {
  switch (filter) {
    case SHOW_ALL:
      return 'All';
    case SHOW_COMPLETED:
      return 'Completed';
    case SHOW_ACTIVE:
      return 'Active';
    default:
      return 'All';
  }
};

@connect(state => ({
  todos: getVisibleTodoList(state.todo),
  filter: getFilter(state.todo.filter)
}), todoActions)
export default class TodoListApp extends Component {
  static propTypes = {
    setVisibilityFilter: PropTypes.func,
    toggleTodo: PropTypes.func,
    addTodo: PropTypes.func,
    filter: PropTypes.string,
    todos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired).isRequired
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
    const filterButtonStyle = {
      marginRight: '5px'
    };
    const {todos, filter, toggleTodo, setVisibilityFilter} = this.props;
    return (
      <div className="container">
        <div className="row text-center">
          <h1>To Do List</h1>
          <form style={formStyle} onSubmit={this.handleSubmit}>
            <input style={inputStyle} aria-describedby="todo-text-addon" type="text" ref="todoText" id="login-username" placeholder="Todo" className="form-control"/>
            <button type="submit" style={buttonStyle} className="btn btn-primary">
              Add Todo
            </button>
          </form>
        </div>
        <div className="row text-center">
          <div style={formStyle}>
            <h4>{filter} Todos</h4>
          </div>
        </div>
        <div className="row">
          <div style={formStyle}>
            <TodoList todos={todos} onTodoClick={toggleTodo}/>
          </div>
        </div>
        <div className="row text-center">
          <div style={formStyle}>
            <button onClick={setVisibilityFilter.bind(null, SHOW_ACTIVE) } style={filterButtonStyle} type="button" className="btn btn-primary">Show Active</button>
            <button onClick={setVisibilityFilter.bind(null, SHOW_COMPLETED) } style={filterButtonStyle} type="button" className="btn btn-info">Show Completed</button>
            <button onClick={setVisibilityFilter.bind(null, SHOW_ALL) } type="button" className="btn btn-success">Show All</button>
          </div>
        </div>
      </div>
    );
  }
}
