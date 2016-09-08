import {
    allArticles,
    allArticleCategory,
    allArticleTitle,
    oneArticle,
} from './api';
import {
    GET_ARTICLES,
    GET_ARTICLES_CATEGORY,
    GET_ARTICLES_TITLE,
    GET_ONE_ARTICLE,

    GETING_ARTICLES,
    GETING_ARTICLES_CATEGORY,
    GETING_ARTICLES_TITLE,
    GETING_ONE_ARTICLE,

    BE_FALSE,
    BE_TRUE,
} from './constants';

// GET all articles
export function article(currentPage) {
    return dispatch => {
        dispatch({
            type: GETING_ARTICLES,
        });
        allArticles(currentPage).then((result) => {
            dispatch({
                type: GET_ARTICLES,
                result,
            });
        });
    };
}

// GET all category
export function articleCategory() {
    return dispatch => {
        dispatch({
            type: GETING_ARTICLES_CATEGORY,
        });
        allArticleCategory().then((result) => {
            dispatch({
                type: GET_ARTICLES_CATEGORY,
                result,
            });
        }).catch(() => {
            dispatch({
                type: GET_ARTICLES_CATEGORY,
            });
        });
    };
}

// GET article title
export function articleTitle(actionId, categoryId, currentPage) {
    return dispatch => {
        dispatch({
            type: GETING_ARTICLES_TITLE,
        });
        allArticleTitle(actionId, categoryId, currentPage).then((result) => {
            dispatch({
                type: GET_ARTICLES_TITLE,
                result,
            });
        });
    };
}

// GET one article
export function getOneArticle(id) {
    return dispatch => {
        dispatch({
            type: GETING_ONE_ARTICLE,
        });
        oneArticle(id).then((result) => {
            dispatch({
                type: GET_ONE_ARTICLE,
                result,
            });
        });
    };
}

export function beTrue() {
    return dispatch => {
        dispatch({
            type: BE_TRUE,
            addNew: true,
        });
    };
}

export function beFalse() {
    return dispatch => {
        dispatch({
            type: BE_FALSE,
            addNew: false,
        });
    };
}

