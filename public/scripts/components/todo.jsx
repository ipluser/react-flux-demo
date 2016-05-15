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
