import 'isomorphic-fetch';

function handleResponse(promise, resolve, reject) {
    return promise.then((response) => {
        if (response.status > 300) {
            return false;
        }
        return response.json().then(json => ({ json, response }));
    }).then(({ json }) => {
        if (!json) {
            reject(json);
            return;
        }
        if (json && json.code !== 0) {
            reject(json, json.msg);
        } else {
            resolve(json);
        }
    });
}

export function get(url) {
    return new Promise((resolve, reject) => {
        const promise = fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        });
        return handleResponse(promise, resolve, reject);
    });
}

function update(method, url, data) {
    console.log(data);
    return new Promise((resolve, reject) => {
        const promise = fetch(url, {
            method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: data,
            credentials: 'include',
        });
        return handleResponse(promise, resolve, reject);
    });
}

function deleteData(url, data) {
    return new Promise((resolve, reject) => {
        const promise = fetch(url, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: data,
            credentials: 'include',
        });
        return handleResponse(promise, resolve, reject);
    });
}

export function deleteArticle(articleId, categoryId) {
    const deleteDate = { articleId, categoryId }
    return deleteData('/api/articles', JSON.stringify(deleteDate));
}

export function allArticles(currentPage) {
    return get(`/api/articles/${currentPage}`);
}

export function allArticleCategory() {
    return get('/api/category');
}

export function allArticleTitle(actionId, categoryId, currentPage) {
    if (categoryId) {
        return get(`/api/article/title/${categoryId}/${actionId}/${currentPage}`);
    }
    return false;
}

export function oneArticle(id) {
    return get(`/api/article/content/${id}`);
}

function post(url, postData) {
    return update('POST', url, postData);
}

function put(url, putData) {
    return update('PUT', url, putData);
}

export function updateArticle(updateOldArticle) {
    return put('/api/articles', JSON.stringify(updateOldArticle));
}

export function postArticle(newArticle) {
    return post('/api/articles', JSON.stringify(newArticle));
}
export function postCategory(newCategory) {
    const Category = { newCategory };
    return post('/api/category', JSON.stringify(Category));
}

export function moveToTrash(articleId, categoryId) {
    const delData = { articleId, categoryId }
    return put('/api/category/article', JSON.stringify(delData));
}

export function deleteCategory(categoryId) {
    return deleteData('/api/category', JSON.stringify(categoryId));
}

// 用户登陆
export function postUser(userName, password) {
    const User = { userName, password }
    return post('/api/user', JSON.stringify(User));
};
