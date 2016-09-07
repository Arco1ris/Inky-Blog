import {
    postArticle,
    allArticles,
    updateArticle,
    allArticleCategory,
    allArticleTitle,
    oneArticle,
    deleteArticle,
    postCategory,
    moveToTrash,
    deleteCategory,
} from '../api';
import {
    POST_ARTICLE,
    GET_ARTICLES,
    PUT_ARTICLE,
    GET_ARTICLES_CATEGORY,
    GET_ARTICLES_TITLE,
    GET_ONE_ARTICLE,
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

// POST new article
export function postOne(newArticle) {
    return dispatch => {
        dispatch({
            type: POSTING_ARTICLE,
        });
        postArticle(newArticle).then((result) => {
            dispatch({
                type: POST_ARTICLE,
                result,
            });
        });
    };
}

// POST new CATEGORY
export function postNewCategory(newCategory) {
    return dispatch => {
        dispatch({
            type: POSTING_CATEGORY,
        });
        postCategory(newCategory).then((result) => {
            dispatch({
                type: POST_CATEGORY,
                result,
            });
        });
    };
}

// GET all articles
export function article() {
    return dispatch => {
        dispatch({
            type: GETING_ARTICLES,
        });
        allArticles().then((result) => {
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
        }).catch((json, err) => {
            console.log(json, err);
            dispatch({
                type: GET_ARTICLES_CATEGORY,
                // result: {},
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

// PUT update one article
export function updateOne(updateOldArticle) {
    return dispatch => {
        dispatch({
            type: PUTING_ARTICLE,
        });
        updateArticle(updateOldArticle).then((result) => {
            dispatch({
                type: PUT_ARTICLE,
                result,
            });
        });
    };
}

// DELETE delete one article
export function deleteOne(deleteOldArticle, categoryId) {
    return dispatch => {
        dispatch({
            type: DELETING_ARTICLE,
        });
        deleteArticle(deleteOldArticle, categoryId).then((result) => {
            dispatch({
                type: DELETE_ARTICLE,
                result,
            });
        });
    };
}

// MOVE TO TRASH  
export function toTrash(articleId, categoryId) {
    return dispatch => {
        dispatch({
            type: MOVING_TO_TRASH,
        });
        moveToTrash(articleId, categoryId).then((result) => {
            dispatch({
                type: MOVE_TO_TRASH,
                result,
            });
        });
    };
}

// DELETE CATEGORY
export function deleteOneCategory(categoryId) {
    return dispatch => {
        dispatch({
            type: DELETING_CATEGORY,
        });
        deleteCategory(categoryId).then((result) => {
            dispatch({
                type: DELETE_CATEGORY,
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