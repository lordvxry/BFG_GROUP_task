import axios from "axios";
import {setQuestions, setIsLoading} from "../reducers/questionReducer";

export const getQuestions = () => {
    return async (dispatch) => {
        dispatch(setIsLoading(true));
        const items = []

        for (let i = 1; i < 26; i++) {
            const params = {
                tagged: 'react-redux',
                fromdate: 1514764800,
                page: i,
                pageSize: 100,
                order: 'desc',
                sort: 'votes',
                site: 'stackoverflow'
            }
            const response = await axios.get(
                "https://api.stackexchange.com/2.3/questions", {params}
            );
            response.data.items.forEach((item) => {
                if (items.length < 5 && item.title.toLowerCase().includes('react-redux')) {
                    items.push(item)
                }
            })

            if (items.length === 5) break;
        }
        
        console.log(items);

        dispatch(setQuestions(items));
    };
};
