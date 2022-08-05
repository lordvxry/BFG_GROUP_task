import axios from "axios";
import { setQuestions, setIsLoading } from "../reducers/questionReducer";

export const getQuestions = (date) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    const items = [];
    for (let i = 1; i < 26; i++) {
      const params = {
        tagged: "react-redux",
        fromdate: date,
        page: i,
        pageSize: 100,
        order: "desc",
        sort: "votes",
        site: "stackoverflow",
      };
      const response = await axios.get(
        "https://api.stackexchange.com/2.3/questions",
        { params }
      );
      response.data.items.forEach((item) => {
        if (
          items.length < 5 &&
          item.title.toLowerCase().includes("react-redux")
        ) {
          items.push(item);
        }
      });
      if (items.length === 5) break;
    }

    dispatch(
      setQuestions(
        items.map((elem, index) => {
          return { ...elem, order: index + 1 };
        })
      )
    );
  };
};
