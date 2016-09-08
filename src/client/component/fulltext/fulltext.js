import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as InkyBackActions from './../../action';

import { Row, Col, Button } from 'antd';
import { Subhead } from './../subhead/subhead';
import { ArticleTitle } from './../articleTitle/articleTitle';
import { Text } from './../text/text';
import { Link } from 'react-router';
import QueueAnim from 'rc-queue-anim';

import './fulltext.scss';


function mapStateToProps(state) {
    const { articleReducer: { oneArticle, articles } } = state;
    return { oneArticle, articles };
}

function mapDispatchToProps(dispatch) {
    const {
        article,
    } = bindActionCreators(InkyBackActions, dispatch);
    return {
        article,
    };
}


class FullText extends React.Component {
    render() {
        if (Object.keys(this.props.oneArticle).length === 0) {
            return null;
        }
        const oneArticle = this.props.oneArticle.data;
        const url = '/essays';
        return (
            <div className="fulltext">
                <Row>
                    <Col span={20} offset={2}>
                        <QueueAnim delay={500} >
                            <div key="a">
                                <ArticleTitle title={oneArticle.title}/>
                            </div>
                            <div key="b">
                                <Subhead time={oneArticle.createdTime} category="javascript"/>
                            </div>
                            <div key="c">
                                <Text text={oneArticle.content}/>
                            </div>
                            <div key="d">
                                <Button><Link to={url}>BACK</Link></Button>
                            </div>
                        </QueueAnim>
                    </Col>
                </Row>
            </div>
        );
    }
}
FullText.propTypes = {
    articles: React.PropTypes.object,
    title: React.PropTypes.string,
    createdTime: React.PropTypes.string,
    content: React.PropTypes.string,
    article: React.PropTypes.func,
    oneArticle: React.PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(FullText);
