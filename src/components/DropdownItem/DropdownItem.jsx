import React from "react";
import "./dropdownItem.css";

const DropdownItem = (props) => {
  const {
    view,
    owner: { display_name, reputation },
    active,
  } = props;

  return (
    <div className={`dropdownItem-container ${active ? "opened" : ""}`}>
      {active && (
        <div className="dropdownItem-content">
          <div><span>Имя автора вопроса:</span> {display_name}</div>
          <div><span>Рейтинг автора вопроса:</span> {reputation}</div>
          <div><span>Количество просмотров:</span> {view}</div>
        </div>
      )}
    </div>
  );
};

export default DropdownItem;
