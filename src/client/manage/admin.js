import ReactDOM from 'react-dom';
import React from 'react';
import thunk from 'redux-thunk';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';
import InkyReducers from './reducer';
import { createStore, applyMiddleware } from 'redux';

import 'antd/dist/antd.css';
import './css/default.scss';

import List from './component/contentList/list';
import Item from './component/item/item';
import Category from './component/category/category';
import { App } from './component/app/app';
import { About } from './component/about/about';
import NewPost from './component/newPost/newPost';
export const store = applyMiddleware(thunk)(createStore)(InkyReducers);


ReactDOM.render((
    <Provider store = {store}>
        <Router history={browserHistory}>
            <Route path="/admin" component={App}>
                <IndexRedirect to="newpost" />
                <Route path="newpost" component={NewPost}>
                    <Route path=":id" component = {NewPost}/>
                </Route>
                <Route path="category" component={Category}>
                    <Route path=":list" component={List}>
                        <Route path=":id" component={Item}/>
                    </Route>
                </Route>
                <Route path="about" component={About}/>
            </Route>
        </Router>
    </Provider>
), document.getElementById('admin'));

