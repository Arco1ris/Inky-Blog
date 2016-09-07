import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import React from 'react';
import * as InkyBackActions from './../../action';
import moment from 'moment';
import './list.scss';
import { Icon } from 'antd';

function mapStateToProps(state) {
    const { articleReducer: { titles, category }, isNew: { addNew } } = state;
    return { titles, category, addNew };
}

function mapDispatchToProps(dispatch) {
    const {
        articleTitle,
        getOneArticle,
        toTrash,
        beFalse,
    } = bindActionCreators(InkyBackActions, dispatch);
    return {
        articleTitle,
        getOneArticle,
        toTrash,
        beFalse,
    };
}
const active = {
    borderLeft: '#5ba4e5 2px solid',
}

class List extends React.Component {
    onClick(id) {
        this.props.getOneArticle(id);
        this.props.beFalse();
    }
    moveToTrash(id, categoryId) {
        this.props.toTrash(id, categoryId);
    }
    pageBreak(actionId, categoryId) {
        const titles = this.props.titles;
        if (titles.code === 0) {
            const limit = parseInt(titles.data.limit, 10);
            const total = parseInt(titles.data.total, 10);
            let currentPage = parseInt(titles.data.page, 10);
            const endPage = Math.ceil(total / limit);
            if (actionId === 1 && currentPage >= 2) {
                currentPage -= 1;
            } else if(actionId === 2 && currentPage < endPage) {
                currentPage += 1;
            }
            this.props.articleTitle(actionId, categoryId, currentPage);
        }
    }
    render() {
        const listId = this.props.params.list;
        if (!this.props.titles) {
            return null;
        }
        let ListNodes = [];
        const headUrl = `/admin/category/${listId}/`;
        const titles = this.props.titles;
        const docs = titles.data.docs;
        if (titles.code === 0 && docs.length > 0) {
            ListNodes = docs.map((item, key) => {
                let url = headUrl + item.id;
                const myTime = moment(item.createdTime * 1000);
                const formattedDate = myTime.format('YYYY-MM-DD hh:mm:ss a');
                return (
                    <div key = {key} className = 'content-box'>
                        <Link to={ url } activeStyle={active} onClick={this.onClick.bind(this, item.id)}>
                            {item.title}
                            <p>{formattedDate}</p>
                        </Link>
                    </div>
                    );
            });
        }
        return (
            <section className = 'list'>
                <section className = "article-list">
                    { ListNodes }
                    <div className = "page-buttons">
                        <Icon className = "page-button" type="left" onClick={this.pageBreak.bind(this, 1, listId)}/>
                        <Icon className = "page-button" type="right" onClick={this.pageBreak.bind(this, 2, listId)}/>
                    </div>
                </section>
                { this.props.children }
            </section>
        );
    }
}

List.propTypes = {
    currentPage: React.PropTypes.string,
    id: React.PropTypes.number,
    params: React.PropTypes.object,
    titles: React.PropTypes.object,
    articleTitle: React.PropTypes.func,
    toTrash: React.PropTypes.func,
    getOneArticle: React.PropTypes.func,
    beFalse: React.PropTypes.func,
    category: React.PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
