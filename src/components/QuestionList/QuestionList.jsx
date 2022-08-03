import React, {useState} from 'react';
import "./questionlist.css"
import QuestionListItem from "../QuestionListItem/QuestionListItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {initialDate} from "../../global/constants";

const QuestionList = (props) => {
    const {questions, upgradeScore, downgradeScore} = props
    const [selectedDate, setSelectedDate] = useState(initialDate)
    const [showSearch, setShowSearch] = useState(false)

    function onChangeShowSearch(date) {
        selectedDate.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)
            ? setShowSearch(false)
            : setShowSearch(true)
        setSelectedDate(date)
    }

    return (
        <div className="questionList-container">
            <div className="questionList-header">5 самых популярных вопросов на Stack Overflow, содержащих "react-redux"
                в наименовании, начиная с
                <div className="questionList-searchPanel">
                <DatePicker
                    wrapperClassName="datePicker"
                    selected={selectedDate}
                    onSelect={(date) => onChangeShowSearch(date)}
                    dateFormat="dd/MM/yyyy"
                />
                {
                    showSearch ? <button>Search</button> : <div/>
                }
            </div>
            </div>
            <div className="questionList-content">
                {questions.map((question) => {
                    return (
                        <QuestionListItem
                            key={question.question_id}
                            question={question}
                            upgradeScore={upgradeScore}
                            downgradeScore={downgradeScore}
                        />
                    )
                })}
            </div>
        </div>
    );
};

export default QuestionList;