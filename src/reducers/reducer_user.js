import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST, FETCH_BLOG, FETCH_COMMENTS } from '../actions';

const initialState = {
    items: [],
    item: {},
    allBlog: []
};
//Created only reducer case to maintain the fetch blog data 
export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_BLOG:
            return {
                ...state,
                allBlog: action.payload
            };
        default:
            return state;
    }
}
