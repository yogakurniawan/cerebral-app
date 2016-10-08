import React, {Component, PropTypes} from 'react';

export default class Todo extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }

  render() {
    const {onClick, completed, text} = this.props;
    return (
      <li
        className="list-group-item"
        onClick={onClick}
        style={{ textDecoration: completed ? 'line-through' : 'none' }}
        >
        {text}
      </li>
    );
  }
}
