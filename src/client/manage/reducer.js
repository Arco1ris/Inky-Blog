import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
    POST_ARTICLE,
    GET_ARTICLES,
    PUT_ARTICLE,
    GET_ARTICLES_TITLE,
    GET_ONE_ARTICLE,
    GET_ARTICLES_CATEGORY,
    DELETE_ARTICLE,
    POST_CATEGORY,
    MOVE_TO_TRASH,
    DELETE_CATEGORY,

    POSTING_ARTICLE,
    GETING_ARTICLES,
    PUTING_ARTICLE,
    GETING_ARTICLES_CATEGORY,
    GETING_ARTICLES_TITLE,
    GETING_ONE_ARTICLE,
    DELETING_ARTICLE,
    POSTING_CATEGORY,
    MOVING_TO_TRASH,
    DELETING_CATEGORY,

    BE_FALSE,
    BE_TRUE,
} from '../constants';

const initialState = {
    result: '',
    articles: {},
    category: {},
    titles: {},
    oneArticle: {},
};

export function articleReducer(state = initialState, action) {
    switch (action.type) {
        case POSTING_ARTICLE:
            return {
                ...state,
            };
        case POST_ARTICLE:
            return {
                ...state,
                result: action.result,
            };
        case GETING_ARTICLES:
            return {
                ...state,
            };
        case GET_ARTICLES:
            return {
                ...state,
                articles: action.result,
            };
        case GETING_ARTICLES_CATEGORY:
            return {
                ...state,
            };
        case GET_ARTICLES_CATEGORY:
            return {
                ...state,
                category: action.result,
            };
        case GETING_ARTICLES_TITLE:
            return {
                ...state,
            };
        case GET_ARTICLES_TITLE:
            return {
                ...state,
                titles: action.result,
            };
        case GETING_ONE_ARTICLE:
            return {
                ...state,
            };
        case GET_ONE_ARTICLE:
            return {
                ...state,
                oneArticle: action.result,
            };
        case PUTING_ARTICLE:
            return {
                ...state,
            };
        case PUT_ARTICLE:
            return {
                ...state,
                result: action.result,
            };
        case DELETING_ARTICLE:
            return {
                ...state,
            };
        case DELETE_ARTICLE:
            return {
                ...state,
                result: action.result,
            };
        case POSTING_CATEGORY:
            return {
                ...state,
            };
        case POST_CATEGORY:
            return {
                ...state,
                result: action.result,
            };
        case MOVING_TO_TRASH:
            return {
                ...state,
            };
        case MOVE_TO_TRASH:
            return {
                ...state,
                result: action.result,
            };
        case DELETING_CATEGORY:
            return {
                ...state,
            };
        case DELETE_CATEGORY:
            return {
                ...state,
                result: action.result,
            };
        default:
            return state;
    }
}

function isNew(state = { addNew: true }, action) {
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
