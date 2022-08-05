import React, {useEffect, useRef, useState} from 'react';
import "./questionlist.css"
import QuestionListItem from "../QuestionListItem/QuestionListItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const QuestionList = (props) => {
    const {questions, upgradeScore, downgradeScore, currentDate, requestDate, updateOrder} = props
    const [selectedDate, setSelectedDate] = useState(requestDate)
    const [showSearch, setShowSearch] = useState(false)
    const [openedPostId, setOpenedPostId] = useState(0)
    const questionRef = useRef()
    const questionDblClickRef = useRef()

    const [currentQuestion, setCurrentQuestion] = useState(null)
    const [doubleClickQuestions, setDoubleClickQuestions] = useState([])
    const [selectedQuestion, setSelectedQuestion] = useState([])

    useEffect(() => {
        const outsideClick = (event) => {
            if (event.path[0] !== questionRef.current) {
                setOpenedPostId(0)
                setSelectedQuestion([])
                setDoubleClickQuestions([])
            }
        }
        document.body.addEventListener("click", outsideClick)

        return () => document.body.removeEventListener("click", outsideClick)
    }, [])


    function onChangeShowSearch(date) {
        selectedDate.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)
            ? setShowSearch(false)
            : setShowSearch(true)
        setSelectedDate(date)
    }

    function onChangeDropdown(id) {
        setOpenedPostId(openedPostId === id ? 0 : id)
    }

    function dropHandler(event, question) {
        event.preventDefault()
        updateOrder(questions.map(item => {
            if (item.question_id === question.question_id) {
                return {...item, order: currentQuestion.order}
            }
            if (item.question_id === currentQuestion.question_id) {
                return {...item, order: question.order}
            }
            return item
        }))
    }

    function dragStartHandler(event, question) {
        setCurrentQuestion(question)
    }

    function dragEndHandler(event) {
        if (event.target.className === `questionItem-content` || `questionItem-content active`) {
            event.target.style.boxShadow = "";
        }
    }

    function dragOverHandler(event) {
        event.preventDefault()
        if (event.target.className === `questionItem-content` || `questionItem-content active`) {
            event.target.style.boxShadow = "0 0 4px 4px #fc9749"
        }
        setTimeout(() => {event.target.style.boxShadow = "";}, 1000)
    }

    const dragAndDropCards = (a, b) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }

    function onDoubleClickSorted(e, question) {
        e.stopPropagation()
        setSelectedQuestion([...selectedQuestion, question.question_id])
        doubleClickQuestions.push(question)

        if (doubleClickQuestions.length > 1) {
            updateOrder(questions.map(item => {
                if (item.question_id === doubleClickQuestions[0].question_id) {
                    return {...item, order: question.order}
                }
                if (item.question_id === question.question_id) {
                    return {...item, order: doubleClickQuestions[0].order}
                }
                return item
            }))
            setTimeout(() => {
                setDoubleClickQuestions([])
                setSelectedQuestion([])
            }, 1000)
        }
    }

    return (
        <div className="questionList-container" onClick={() => setOpenedPostId(0)}>
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
                        showSearch ?
                            <button onClick={() => currentDate(selectedDate)}>
                                Search
                            </button>
                            :
                            <div/>
                    }
                </div>
            </div>
            <div className="questionList-content">
                {questions.sort(dragAndDropCards).map((question, index) => {
                    return (
                        <div
                            key={index}
                            draggable={true}
                            onDragStart={(event) => dragStartHandler(event, question)}
                            onDragLeave={(event) => dragEndHandler(event)}
                            onDragEnd={(event) => dragEndHandler(event)}
                            onDragOver={(event) => dragOverHandler(event)}
                            onDrop={(event) => dropHandler(event, question)}>
                            <QuestionListItem
                                key={question.question_id}
                                question={question}
                                upgradeScore={upgradeScore}
                                downgradeScore={downgradeScore}
                                openedPostId={openedPostId}
                                onChangeDropdown={onChangeDropdown}
                                currentQuestion={currentQuestion}
                                setCurrentQuestion={setCurrentQuestion}
                                onDoubleClickSorted={onDoubleClickSorted}
                                questionRef={questionRef}
                                selectedQuestion={selectedQuestion}
                                questionDblClickRef={questionDblClickRef}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default QuestionList;