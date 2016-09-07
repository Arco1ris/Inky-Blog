import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
    GET_ARTICLES,
    GET_ARTICLES_TITLE,
    GET_ONE_ARTICLE,
    GET_ARTICLES_CATEGORY,

    GETING_ARTICLES,
    GETING_ARTICLES_CATEGORY,
    GETING_ARTICLES_TITLE,
    GETING_ONE_ARTICLE,

    BE_FALSE,
    BE_TRUE,
} from './constants';

const initialState = {
    // articles: null,
};

export function articleReducer(state = initialState, action) {
    switch (action.type) {
        case GETING_ARTICLES:
        case GET_ARTICLES:
            return {
                ...state,
                articles: action.result,
            };
        case GETING_ARTICLES_CATEGORY:
        case GET_ARTICLES_CATEGORY:
            return {
                ...state,
                category: action.result,
            };
        case GETING_ARTICLES_TITLE:
        case GET_ARTICLES_TITLE:
            return {
                ...state,
                titles: action.result,
            };
        case GETING_ONE_ARTICLE:
        case GET_ONE_ARTICLE:
            return {
                ...state,
                oneArticle: action.result,
            };
        default:
            return state;
    }
}

function isNew(state = { addNew: false }, action) {
    switch (action.type) {
        case BE_TRUE:
            return {
                ...state,
                addNew: action.addNew,
            };
        case BE_FALSE:
            return {
                ...state,
                addNew: action.addNew,
            };
        default:
            return state;
    }
}
const InkyReducers = combineReducers({
    articleReducer,
    isNew,
    form: formReducer,
});

export default InkyReducers;
