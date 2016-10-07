import React, {Component, PropTypes} from 'react';
import Todo from './Todo';

export default class TodoList extends Component {
  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onTodoClick: PropTypes.func.isRequired
  };

  render() {
    const {todos, onTodoClick} = this.props;
    return (
      <ul>
        {todos.map(todo =>
          <Todo
            {...todo}
            key={todo.id}
            onClick={() => onTodoClick(todo.id) }
            />
        ) }
      </ul>
    );
  }
}
