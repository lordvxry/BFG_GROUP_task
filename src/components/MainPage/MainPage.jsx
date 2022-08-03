import React, {useEffect} from 'react';
import {connect} from "react-redux";
import "./mainPage.css"
import {getQuestions} from "../../redux/actions/questionAction";
import QuestionList from "../QuestionList/QuestionList";
import CustomLoader from "../UI/CustomLoader/CustomLoader";
import {downgradeScore, upgradeScore} from "../../redux/reducers/questionReducer";

const MainPage = (props) => {
    const {questions, loading, getQuestions, upgradeScore, downgradeScore} = props

    useEffect(() => {
        getQuestions()
    }, [])

    return (
        <div className="mainPage-container">
            {loading ?
                <CustomLoader/>
                :
                <QuestionList
                    questions={questions}
                    upgradeScore={upgradeScore}
                    downgradeScore={downgradeScore}
                />
            }
        </div>
    );
};

const mapStateToProps = (state) => ({
    questions: state.questionsReducer.questions,
    loading: state.questionsReducer.loading,
})

export default connect(mapStateToProps, {
    getQuestions,
    upgradeScore,
    downgradeScore
})(MainPage);