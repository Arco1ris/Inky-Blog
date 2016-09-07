import React from 'react';
import { Row, Col } from 'antd';
import './articlePanel.scss';

import { MaskPanel } from '../maskPanel/maskPanel';

import { Subhead } from './../subhead/subhead';
import { ArticleTitle } from './../articleTitle/articleTitle';
import { Abstract } from './../abstract/abstract';

export class ArticlePanel extends React.Component {
    showFull(articleId) {
        this.props.showFull(articleId);
    }
    render() {
        const oneArticle = this.props.item;
        const url = `/essays/${oneArticle._id}`;
        const text = '查看全文';
        return (
            <div className="panel">
                <Row>
                    <Col span={20} offset={2}>
                        <ArticleTitle title={oneArticle.title}/>
                        <Subhead time={oneArticle.createdTime} category="javascript"/>
                        <div className = "abs">
                            <Abstract text={oneArticle.content}/>
                            <MaskPanel onShowFull = {this.props.showFull}
                                       id = {oneArticle._id}
                                       url = { url }
                                       text = {text}
                            />
                        </div>
                        <div className = "breakLine"></div>
                    </Col>
                </Row>
            </div>
        );
    }
}

ArticlePanel.propTypes = {
    showFull: React.PropTypes.func,
    item: React.PropTypes.object,
    oneArticle: React.PropTypes.object,
    _id: React.PropTypes.object,
    title: React.PropTypes.string,
    createdTime: React.PropTypes.string,
    content: React.PropTypes.string,
};

