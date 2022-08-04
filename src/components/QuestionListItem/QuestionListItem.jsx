import React, {useState} from 'react';
import "./questionListItem.css"
import DropdownItem from "../DropdownItem/DropdownItem";
import {act} from "react-dom/test-utils";

const QuestionListItem = (props) => {
    const {
        question: {
            title,
            score,
            is_answered,
            question_id,
            owner,
            view_count
        },
        upgradeScore,
        downgradeScore,
        onChangeDropdown,
        openedPostId
    } = props

    const down = "\u2B07"
    const up = "\u2B06"

    return (
        <div className="questionItem-container" onClick={() => onChangeDropdown(question_id)}>
            <div className={`questionItem-content${is_answered ? " answered" : ""}`}>
                <div className={"questionItem-title"}>
                    {title}
                </div>
                <div className="questionItem-score-container">
                    {score}
                    <div
                        className="questionItem-score-buttons"
                        onClick={(e) => e.stopPropagation()}
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