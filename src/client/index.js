import ReactDOM from 'react-dom';
import React from 'react';
import thunk from 'redux-thunk';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';
import InkyReducers from './reducer';
import { createStore, applyMiddleware } from 'redux';
import AllArticles from './component/Articles/Articles';
import FullText from './component/fulltext/fulltext';
import { App } from './component/app/app';
import { About } from './component/about/about';
import { Archives } from './component/archive/archive';
import 'antd/dist/antd.css';
import './css/default.scss';

export const store = applyMiddleware(thunk)(createStore)(InkyReducers);

ReactDOM.render((
    <Provider store = {store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRedirect to="/essays" />
                <Route path="essays" component={AllArticles}/>
                <Route path="essays/:articleId" component={FullText}/>
                <Route path="about" component={About}/>
                <Route path="archives" component={Archives}/>
            </Route>
        </Router>
    </Provider>
), document.getElementById('root'));
