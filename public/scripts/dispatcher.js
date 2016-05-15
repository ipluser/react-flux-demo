import { Dispatcher } from 'flux';

import TodoStore from './stores/todoStore';
import TodoConstant from './constants/todoConstant';

const AppDispatcher = new Dispatcher();

TodoStore.dispatchToken = AppDispatcher.register(payload => {
  switch (payload.actionType) {
    case TodoConstant.ADD_ITEM:
      TodoStore.addItem(payload.text);
      break;
    default:
  }
});

export default AppDispatcher;
