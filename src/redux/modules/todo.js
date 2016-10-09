const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
const SHOW_ALL = 'SHOW_ALL';

const todo = (state = {}, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case TOGGLE_TODO:
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

const initialState = {
  todos: [],
  filter: SHOW_ALL
};

export default function reducer(state = initialState, action) {
  let todos;
  switch (action.type) {
    case ADD_TODO:
      todos = [todo(undefined, action), ...state.todos];
      return {
        ...state,
        filter: SHOW_ALL,
        todos
      };
    case TOGGLE_TODO:
      todos = state.todos.map(td =>
        todo(td, action)
      );
      return {
        ...state,
        todos
      };
    case SET_VISIBILITY_FILTER:
      return {
        ...state,
        filter: action.filter,
        todos: [...state.todos]
      };
    default:
      return state;
  }
}

export function addTodo(id, text) {
  return {
    type: ADD_TODO,
    id,
    text
  };
}

export function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    id
  };
}

export function setVisibilityFilter(filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  };
}
