import React, {useEffect, useState} from "react";
import "./questionlist.css";
import QuestionListItem from "../QuestionListItem/QuestionListItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const QuestionList = (props) => {
  const {
    questions,
    upgradeScore,
    downgradeScore,
    getCurrentDate,
    date,
    updateOrder,
  } = props;

  const [selectedDate, setSelectedDate] = useState(date);
  const [showSearch, setShowSearch] = useState(false);
  const [openedPostId, setOpenedPostId] = useState(0);

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [doubleClickQuestions, setDoubleClickQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState([]);

  useEffect(() => {
    const outsideClick = (event) => {
        setOpenedPostId(0);
        setSelectedQuestion([]);
        setDoubleClickQuestions([]);
    };
    document.body.addEventListener("click", outsideClick);

    return () => document.body.removeEventListener("click", outsideClick);
  }, []);

  const onChangeShowSearch = (newSelectedDate) => {
    date.setHours(0, 0, 0, 0) === newSelectedDate.setHours(0, 0, 0, 0)
      ? setShowSearch(false)
      : setShowSearch(true);

    setSelectedDate(newSelectedDate);
  }

  const onChangeDropdown = (id) => {
    setOpenedPostId(openedPostId === id ? 0 : id);
  }

  const dropHandler = (event, question) => {
    event.preventDefault();
    updateOrder(
      questions.map((item) => {
        if (item.question_id === question.question_id) {
          return { ...item, order: currentQuestion.order };
        }
        if (item.question_id === currentQuestion.question_id) {
          return { ...item, order: question.order };
        }
        return item;
      })
    );
  }

  const dragStartHandler = (event, question) => {
    setCurrentQuestion(question);
  }

  const dragEndHandler = (event) => {
    if (
      event.target.className === `questionItem-content` ||
      `questionItem-content active`
    ) {
      event.target.style.boxShadow = "";
    }
  }

  const dragOverHandler = (event) => {
    event.preventDefault();
    if (
      event.target.className === `questionItem-content` ||
      `questionItem-content active`
    ) {
      event.target.style.boxShadow = "0 0 4px 4px #fc9749";
    }
    setTimeout(() => {
      event.target.style.boxShadow = "";
    }, 1000);
  }

  const dragAndDropCards = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };

  const onDoubleClickSorted = (e, question) => {
    e.stopPropagation();
    setSelectedQuestion([...selectedQuestion, question.question_id]);
    setDoubleClickQuestions([...doubleClickQuestions, question]);

    if (doubleClickQuestions.length > 0) {
      updateOrder(
        questions.map((item) => {
          if (item.question_id === doubleClickQuestions[0].question_id) {
            return { ...item, order: question.order };
          }
          if (item.question_id === question.question_id) {
            return { ...item, order: doubleClickQuestions[0].order };
          }
          return item;
        })
      );
      setDoubleClickQuestions([]);
      setTimeout(() => {
        setSelectedQuestion([]);
      }, 1000);
    }
  }

  return (
    <div className="questionList-container" onClick={() => setOpenedPostId(0)}>
      <div className="questionList-header">
        5 самых популярных вопросов на Stack Overflow, содержащих "react-redux"
        в наименовании, начиная с
        <div className="questionList-searchPanel">
          <DatePicker
            wrapperClassName="datePicker"
            selected={selectedDate}
            onSelect={(newSelectedDate) => onChangeShowSearch(newSelectedDate)}
            dateFormat="dd/MM/yyyy"
          />
          {showSearch && (
            <button onClick={() => getCurrentDate(selectedDate)}>Search</button>
          )}
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
              onDrop={(event) => dropHandler(event, question)}
            >
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
                selectedQuestion={selectedQuestion}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionList;
