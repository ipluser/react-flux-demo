# react-flux-demo
关于`Flux`应用的学习例子。

## 快速入门
```bash
$ git clone https://github.com/ipluser/react-flux-demo.git
$ cd react-flux-demo
$ npm start
```

浏览器将会自动打开一个新的网页标签，如果没有打开，请直接访问 `http://127.0.0.1:8080`：

![Demo](public/img/flux__demo.png)

## 核心概念
`Flux`应用主要分为四个主要的部分：`Views`，`Actions`，`Dispatcher`，`Stores`。

| 名称 | 描述 |
|------|-------------|
| Views | 视图层。 |
| Actions | 行为动作层，视图层触发的动作，例如`click event`。 |
| Dispatcher | 分发中心，注册/接受动作，管理数据流向。 |
| Stores | 数据层，管理应用状态，广播通知`Views`状态发生改变。 |

![Flux Data Flow](public/img/flux__data-flow.png)

单向数据流是`Flux`应用的核心。`Dispatcher`，`Stores`，`Views`是独立的输入和输出节点，而Action是一个包含数据和动作类型的简单对象。

## 解析实例
### 视图层
打开项目入口文件***main.jsx***：

```js
// public/scripts/main.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import TodoController from './components/todoController.jsx';

ReactDOM.render(<TodoController />, document.body);
```

此处代码中采用了[ReactJS Controller View](http://blog.andrewray.me/the-reactjs-controller-view-pattern/)模式，一个`Controller View`是应用中最顶层的组件，它管理着所有应用状态，并以属性方式传递给子组件。接下来我们看看***todoController.jsx***：

```js
// public/scripts/components/todoController.jsx
import React from 'react';

import TodoAction from '../actions/todoAction.js';
import TodoStore from '../stores/todoStore.js';
import Todo from './todo.jsx';

export default class TodoController extends React.Component {
  constructor(props) {
    super(props);
  }

  newItem() {
    TodoAction.addItem('new item');
  }

  render() {
    return <Todo newItem={this.newItem} />;
  }
}
```

正如你所看到的，**TodoController**仅仅只给**Todo**指定了动作。**Todo**组件接收属性和渲染：

```js
// public/scripts/components/todo.jsx
import React from 'react';

import '../../styles/components/todo.scss';

export default function Todo(props) {
  let list = props.items.map((item, index) => {
    return <li className="color--red" key={index}>{item}</li>;
  });

  return (
    <div className="todo">
      <ul>{list}</ul>
      <button className="todo__click-btn" onClick={props.newItem}>Todo</button>
    </div>
  );
}
```

一旦点击**todo**按钮，**TodoController**将会触发**addItem**动作。

## 行为动作层
**TodoAction**将数据和动作类型传递给**Dispatcher**去分发数据流：

```js
// public/scripts/actions/todoAction.js
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
```

**todoConstant.js**是一个包含所有动作类型的常量对象:

```js
// public/scripts/constants/todoConstant.js
export default {
  ADD_ITEM: 'TODO_ADD_ITEM'
};
```

## 数据分发中心
**Dispatcher**是一个分发中心，它管理着应用的所有数据流向。每一个**Store**在这里注册，同时提供一个回调函数：

```js
// public/scripts/dispatcher.js
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
```

上面代码中可以看到，当**TodoAction**告诉`Dispatcher`发生了一个动作时，**TodoStore**将会通过注册时的回调函数接受动作的行为。

## 数据层
**TodoStore**包含状态和业务逻辑。它的职责有点类似MVC中的*model*：

```js
// public/scripts/stores/todoStore.js
import EventEmitter from 'events';

class TodoStore extends EventEmitter {
  constructor() {
    super();
    this.items = [];
  }

  getAll() {
    return this.items;
  }

  addItem(text) {
    this.items.push(text);
    this.change();
  }

  change() {
    this.emit('change');
  }

  addListener(name, callback) {
    this.on(name, callback);
  }

  removeListener(name, callback) {
    this.removeListener(name, callback);
  }
}

export default new TodoStore();
```

当状态发生改变时，**TodoStore**将会通过事件形式通知**Views**。

## 再看视图层
再回到**TodoController**中，我们初始化应用的状态，同时监听`Store`的状态改变事件：

```js
// public/scripts/components/todoController.jsx
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
```

一旦**TodoController**接受到应用状态改变，将会触发`Todo`重新渲染。

## References
- [Facebook Flux](https://facebook.github.io/flux/docs/overview.html)
- [ReactJS Controller View Pattern](http://blog.andrewray.me/the-reactjs-controller-view-pattern/)
- [ruanyf - Flux Guide](http://www.ruanyifeng.com/blog/2016/01/flux.html)

## LICENSE
[MIT](LICENSE)
