import AppDispatcher from '../dispatcher.js';
import TodoConstant from '../constants/todoConstant.js';

class TodoAction {
  addItem(text) {
    AppDispatcher.dispatch({
      actionType: TodoConstant.ADD_ITEM,
      text
    });
  }
}

export default new TodoAction();
