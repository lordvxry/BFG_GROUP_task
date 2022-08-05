import React from "react";
import "./questionListItem.css";
import DropdownItem from "../DropdownItem/DropdownItem";

const QuestionListItem = (props) => {
  const {
    question,
    question: { title, score, is_answered, question_id, owner, view_count },
    upgradeScore,
    downgradeScore,
    onChangeDropdown,
    openedPostId,
    onDoubleClickSorted,
    questionRef,
    selectedQuestion,
    questionDblClickRef,
  } = props;

  const down = "\u2B07";
  const up = "\u2B06";
  let timer;

  return (
    <div
      className="questionItem-container"
      ref={questionRef}
      onClick={(e) => {
        clearTimeout(timer);
        e.stopPropagation();
        timer = setTimeout(() => onChangeDropdown(question_id), 250);
      }}
      onDoubleClick={(e) => {
        clearTimeout(timer);
        onDoubleClickSorted(e, question);
      }}
    >
      <div
        ref={questionDblClickRef}
        className={`questionItem-content${
          selectedQuestion.includes(question_id)
            ? " selected"
            : is_answered
            ? " answered"
            : ""
        }`}
      >
        <div className={"questionItem-title"}>{title}</div>
        <div className="questionItem-score-container">
          {score}
          <div
            className="questionItem-score-buttons"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
            }}
          >
            <button onClick={() => upgradeScore(question_id)}>{up}</button>
            <button onClick={() => downgradeScore(question_id)}>{down}</button>
          </div>
        </div>
      </div>
      <DropdownItem
        view={view_count}
        owner={owner}
        active={openedPostId === question_id}
      />
    </div>
  );
};
export default QuestionListItem;
