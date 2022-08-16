import axios from "axios";
import { setQuestions, setIsLoading } from "../reducers/questionReducer";

export const getQuestions = (date) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    const items = [];

      const params = {
        intitle: "react-redux",
        fromdate: date,
        pageSize: 100,
        order: "desc",
        sort: "votes",
        site: "stackoverflow",
      };
      const response = await axios.get(
        "https://api.stackexchange.com/2.3/search",
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

    dispatch(
      setQuestions(
        items.map((elem, index) => {
          return { ...elem, order: index + 1 };
        })
      )
    );
  };
};
