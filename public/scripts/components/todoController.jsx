import React from 'react';

import TodoAction from '../actions/todoAction.js';
import TodoStore from '../stores/todoStore.js';
import Todo from './todo.jsx';

export default class TodoController extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: TodoStore.getAll() };
    this.onListChange = this.onListChange.bind(this);
  }

  componentDidMount() {
    TodoStore.addListener('change', this.onListChange);
  }

  componentWillUnmount() {
    TodoStore.removeListener('change', this.onListChange);
  }

  onListChange() {
    this.setState({
      items: TodoStore.getAll()
    });
  }

  newItem() {
    TodoAction.addItem('new item');
  }

  render() {
    return <Todo items={this.state.items} newItem={this.newItem} />;
  }
}
