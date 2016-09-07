import React from 'react';
import { Icon } from 'antd';
import './pagination.scss';

export class PageBreak extends React.Component {
    pageBreak(actionId, articles, action) {
        if (articles.code === 0) {
            const limit = parseInt(articles.data.limit, 10);
            const total = parseInt(articles.data.total, 10);
            let currentPage = parseInt(articles.data.page, 10);
            const endPage = Math.ceil(total / limit);
            if (actionId === 1 && currentPage >= 2) {
                currentPage -= 1;
            } else if (actionId === 2 && currentPage < endPage) {
                currentPage += 1;
            }
            action(currentPage);
        }
    }
    render() {
        const articles = this.props.data;
        const action = this.props.action;
        return (
            <p>
                <span className = "pageIcon">
                    <Icon type="left" onClick = {this.pageBreak.bind(this, 1, articles, action)} />
                </span>
                <span> {articles.data.page} / {articles.data.pages} </span>
                <span className = "pageIcon">
                    <Icon type="right" onClick = {this.pageBreak.bind(this, 2, articles, action)}/>
                </span>
            </p>
        );
    }
}

PageBreak.propTypes = {
    data: React.PropTypes.object,
    action: React.PropTypes.func,
};
