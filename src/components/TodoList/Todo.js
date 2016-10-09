import React, {Component, PropTypes} from 'react';

export default class Todo extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }

  render() {
    const {onClick, completed, text} = this.props;
    const styles = require('./Todo.scss');
    return (
      <li
        className={styles.todoItem + ' list-group-item'}
        onClick={onClick}
        style={{ textDecoration: completed ? 'line-through' : 'none' }}
        >
        {text}
        <div className="pull-right">
          <span className="glyphicon glyphicon-edit" style={{marginRight: '5px'}}></span>
          <span className="glyphicon glyphicon-remove"></span>
        </div>
      </li>
    );
  }
}
