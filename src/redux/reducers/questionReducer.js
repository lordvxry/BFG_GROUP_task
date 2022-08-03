const SET_QUESTIONS = "SET_CATALOG";
const SET_IS_LOADING = "SET_IS_LOADING";
const UPGRADE_SCORE = "UPGRADE_SCORE";
const DOWNGRADE_SCORE = "DOWNGRADE_SCORE";

const initialState = {
    questions: [],
    loading: true,
    score: 0,
};

export default function questionReducer(state = initialState, action) {
    switch (action.type) {
        case SET_QUESTIONS:
            return {
                ...state,
                questions: action.payload,
                loading: false,
            };
        case SET_IS_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case UPGRADE_SCORE:
            return {
                ...state,
                questions: state.questions.map(question => {
                    if (question.question_id === action.questionId) {
                        question.score += 1
                        return {...question}
                    }
                    return question
                })
            };
        case DOWNGRADE_SCORE:
            return {
                ...state,
                questions: state.questions.map(question => {
                    if (question.question_id === action.questionId) {
                        question.score -= 1
                        return {...question}
                    }
                    return question
                })
            };
        default:
            return state;
    }
}

export const setQuestions = (payload) => ({
    type: SET_QUESTIONS,
    payload,
});

export const setIsLoading = (payload) => ({
    type: SET_IS_LOADING,
    payload,
});

export const upgradeScore = (questionId) => {
    return {
        type: UPGRADE_SCORE, questionId
    };
};

export const downgradeScore = (questionId) => {
    return {
        type: DOWNGRADE_SCORE, questionId
    };
};