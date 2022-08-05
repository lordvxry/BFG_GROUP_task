import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./mainPage.css";
import { getQuestions } from "../../redux/actions/questionAction";
import QuestionList from "../QuestionList/QuestionList";
import CustomLoader from "../UI/CustomLoader/CustomLoader";
import {
  downgradeScore,
  updateOrder,
  upgradeScore,
} from "../../redux/reducers/questionReducer";
import { initialDate } from "../../global/constants";

const MainPage = (props) => {
  const {
    questions,
    loading,
    getQuestions,
    upgradeScore,
    downgradeScore,
    updateOrder,
  } = props;
  const [requestDate, setRequestDate] = useState(initialDate);

  useEffect(() => {
    getQuestions(+new Date(requestDate) / 1000);
  }, []);

  const currentDate = (date) => {
    getQuestions(+new Date(date) / 1000);
    setRequestDate(date);
  };

  return (
    <div className="mainPage-container">
      {loading ? (
        <CustomLoader />
      ) : (
        <QuestionList
          questions={questions}
          upgradeScore={upgradeScore}
          downgradeScore={downgradeScore}
          currentDate={currentDate}
          requestDate={requestDate}
          updateOrder={updateOrder}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
  loading: state.questionsReducer.loading,
});

export default connect(mapStateToProps, {
  getQuestions,
  upgradeScore,
  downgradeScore,
  updateOrder,
})(MainPage);
