import axios from "axios";
import {setQuestions, setIsLoading} from "../reducers/questionReducer";

export const getQuestions = () => {
    return async (dispatch) => {
        dispatch(setIsLoading(true));
        const response = await axios.get(
            "https://api.stackexchange.com/2.3/questions?pagesize=5&fromdate=1514764800&order=desc&min=1514764800&sort=activity&tagged=react-redux&site=stackoverflow"
        );
        dispatch(setQuestions(response.data.items));
    };
};
