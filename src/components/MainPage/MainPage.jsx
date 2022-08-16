import React, {useEffect} from "react";
import {connect} from "react-redux";
import "./mainPage.css";
import {getQuestions} from "../../redux/actions/questionAction";
import QuestionList from "../QuestionList/QuestionList";
import CustomLoader from "../UI/CustomLoader/CustomLoader";
import {downgradeScore, getCurrentDate, updateOrder, upgradeScore,} from "../../redux/reducers/questionReducer";

const MainPage = (props) => {
  const {
    questions,
    loading,
    getQuestions,
    upgradeScore,
    downgradeScore,
    updateOrder,
    date,
    getCurrentDate,
  } = props;

  useEffect(() => {
    getQuestions(+new Date(date) / 1000);
  }, []);

  return (
    <div className="mainPage-container">
      {loading ? (
        <CustomLoader />
      ) : (
        <QuestionList
          questions={questions}
          upgradeScore={upgradeScore}
          downgradeScore={downgradeScore}
          getCurrentDate={getCurrentDate}
          date={date}
          updateOrder={updateOrder}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
  loading: state.questionsReducer.loading,
  date: state.questionsReducer.date,
});

export default connect(mapStateToProps, {
  getQuestions,
  upgradeScore,
  downgradeScore,
  updateOrder,
  getCurrentDate,
})(MainPage);
