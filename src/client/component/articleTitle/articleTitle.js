import React from 'react';
import './articleTitle.scss';

export class ArticleTitle extends React.Component {
    render() {
        return (
            <div>
                <h1 className = "articleTitle">{this.props.title}</h1>
            </div>
        );
    }
}

ArticleTitle.propTypes = {
    title: React.PropTypes.string,
};
