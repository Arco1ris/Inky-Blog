import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as InkyActions from './../../action';
import { ArticlePanel } from './../articlePanel/articlePanel';
import { PageBreak } from './../pagination/pageBreak';
import { BackTop } from 'antd';
import QueueAnim from 'rc-queue-anim';

import './articles.scss';

function mapStateToProps(state) {
    const { articleReducer: { articles } } = state;
    return { articles };
}

function mapDispatchToProps(dispatch) {
    const {
        getOneArticle,
        article,
    } = bindActionCreators(InkyActions, dispatch);
    return {
        getOneArticle,
        article,
    };
}

class AllArticles extends React.Component {
    componentWillMount() {
        if (!this.props.articles) {
            this.props.article(1);
        }
    }
    render() {
        if (!this.props.articles) {
            return null;
        }
        let listNodes = [];
        if (this.props.articles) {
            const ab = ['a', 'b', 'c', 'd', 'e'];
            const articles = this.props.articles.data.docs;
            listNodes = articles.map((item, key) => {
                return (
                    <div key = { ab[key] } >
                        <ArticlePanel showFull = {this.props.getOneArticle}
                                      item = {item} key = {key}/>
                    </div>
                );
            });
        }
        return (
            <div className = "articles">
                <QueueAnim animConfig={[
                        { opacity: [1, 0], translateY: [0, 50] },
                        { opacity: [1, 0], translateY: [0, -50] }]}
                >
                    {listNodes}
                </QueueAnim>
                <PageBreak data = {this.props.articles} action = {this.props.article}/>
                <BackTop />
            </div>
        );
    }
}

AllArticles.propTypes = {
    articles: React.PropTypes.object,
    article: React.PropTypes.func,
    getOneArticle: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllArticles);
